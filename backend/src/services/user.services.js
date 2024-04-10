import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../core/database/db.js";
import { sendEmail } from "../core/Email/sendEmail.js";
export const registerUserService = async (
  firstName,
  lastName,
  email,
  password,
  updatedBy,
  res
) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await pool.query("SELECT * FROM puser WHERE email=$1", [email]);
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
};

export const loginUserService = async (email, password, res) => {
  const user = await pool.query("SELECT * FROM puser WHERE email=$1", [email]);
  if (user.rows.length === 0) {
    return res.status(404).json({ success: false, message: "user not found" });
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
};
export const getAllUserService = async (res) => {
  const data = await pool.query(
    "SELECT first_name,last_name,created_at,updated_at,email,id FROM puser"
  );

  if (data.rows.length === 0) {
    return res.status(404).json({ success: false, message: "no user found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "all user are", data: data.rows });
};

export const forgotPasswordService = async (email, res) => {
  const user = await pool.query("SELECT * FROM puser WHERE email=$1", [email]);
  if (user.rows.length === 0) {
    return res.status(404).json({ success: false, message: "user not found" });
  }
  //send email with token
  const secretToken = jwt.sign(
    { id: user.rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return secretToken;
};
export const sendEmailService = async (email, secretToken, res) => {
  await sendEmail(email, secretToken);
  return res.status(200).json({
    success: true,
    message: "Email sent",
    secretToken: secretToken,
  });
};

export const resetPasswordService = async (password, userId, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updatedUser = await pool.query(
    "UPDATE puser SET password=$1 WHERE id=$2 RETURNING *",
    [hashedPassword, userId]
  );
  const users = updatedUser.rows[0];
  const token2 = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
  delete users["password"];
  return res.status(200).json({
    success: true,
    message: "Password Reset Success",
    token: token2,
    user: users,
  });
};

export const resetPasswordAuth = async (password, res, userId) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updatedUser = await pool.query(
    "UPDATE puser SET password=$1 WHERE id=$2 RETURNING *",
    [hashedPassword, userId]
  );
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
  const user = updatedUser.rows[0];
  delete user["password"];
  return res.status(200).json({
    success: true,
    message: "Password Reset Success",
    token: token,
    user: user,
  });
};
