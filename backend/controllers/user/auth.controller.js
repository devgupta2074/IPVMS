import { pool } from "../../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const registerUser = async (req, res) => {
  try {
    // middleware apply user
    const { firstName, lastName, email, password, updatedBy } = req.body;
    console.log(firstName, lastName, email, password);
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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
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
      .json({ error: err, success: false, message: "Internal Server Error" });
  }
};
