import { pool } from "../../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { sendEmail } from "../../utils/Email/sendEmail.js";
import { passwordValidation } from "../../utils/passwordValidation.js";
const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const registerUser = async (req, res) => {
  try {
    // middleware apply user
    const { firstName, lastName, email, password, updatedBy } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await pool.query("SELECT * FROM puser WHERE email=$1", [
      email,
    ]);
    if (user.rows.length > 0) {
      //409->conflict
      //400->Bad request
      return res
        .status(409)
        .json({ success: false, message: "user email already exist" });
    }

    const query = {
      text: "INSERT INTO puser(first_name,last_name,email,password,is_active) VALUES($1,$2,$3,$4,$5) RETURNING *",
      values: [firstName, lastName, email, hashedPassword, true],
    };
    pool.query(query, (error, result) => {
      if (error) {
        return res.status(403).json({
          error: error,
          success: false,
        });
      }
      const user = result?.rows[0];
      delete user["password"];
      res.status(201).json({
        success: true,
        message: "User Registered",
        data: user,
      });
    });
    // return res.json(result.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: err, success: false, message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM puser WHERE email=$1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    const users = user.rows[0];
    delete users["password"];

    return res.status(200).json({
      success: true,
      message: "Login Success",
      token: token,
      user: users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: err, success: false, message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT first_name,last_name,created_at,updated_at,email,id FROM puser"
    );
    return res
      .status(200)
      .json({ success: true, message: "all user are", data: data.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, success: false, message: "Internal Server Error" });
  }
};
export const forgotPassword = async (req, res) => {
  //email validation above
  const { email } = req.body;
  try {
    const user = await pool.query("SELECT * FROM puser WHERE email=$1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    //send email with token
    const secretToken = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    try {
      await sendEmail(user.rows[0].email, secretToken);
      return res.status(200).json({
        success: true,
        message: "Email sent",
        secretToken: secretToken,
      });
    } catch (error) {
      return res.status(502).json({
        success: false,
        message: "Bad Gateway error in sending email",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token) {
    //401 unauthorized
    //400 bad req ->invalid syntax
    //402 payment required
    //403 forbidden
    //499 empty token
    //498 token expired or invalid
    return res.status(499).json({ success: false, message: "Invalid Token" });
  }

  try {
    let verification;
    try {
      verification = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res
        .status(498)
        .json({ success: false, message: "Token either expired or invalid" });
    }

    if (!verification) {
      return res
        .status(498)
        .json({ success: false, message: "Token either expired or invalid" });
    }
    const userId = verification.id;
    const user = await pool.query("SELECT * FROM puser WHERE id=$1", [userId]);
    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }

    if (!passwordValidation(password).success) {
      return res.status(400).json(passwordValidation(password));
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password does not match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await pool.query(
      "UPDATE puser SET password=$1 WHERE id=$2 RETURNING *",
      [hashedPassword, userId]
    );
    const users = updatedUser.rows[0];
    const token2 = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    delete users["password"];
    return res.status(200).json({
      success: true,
      message: "Password Reset Success",
      token: token2,
      user: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const resetPasswordAuth = async (req, res) => {
  const userId = req.user.id;
  const { password, confirmPassword } = req.body;
  try {
    const user = await pool.query("SELECT * FROM puser WHERE id=$1", [userId]);
    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }

    if (!passwordValidation(password).success) {
      return res.status(400).json(passwordValidation(password));
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password does not match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await pool.query(
      "UPDATE puser SET password=$1 WHERE id=$2 RETURNING *",
      [hashedPassword, userId]
    );
    const users = updatedUser.rows[0];
    const token2 = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    delete users["password"];
    return res.status(200).json({
      success: true,
      message: "Password Reset Success",
      token: token2,
      user: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await pool.query("SELECT * FROM puser WHERE id=$1", [userId]);
    const users = user.rows[0];
    delete users["password"];

    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: users,
      message: "User Info",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
