import { pool } from "../../core/database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { sendEmail } from "../../core/Email/sendEmail.js";
import { passwordValidation } from "../../utils/inputValidation.js";
import * as userService from "../../services/user.Services.js";

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const registerUser = async (req, res) => {
  try {
    // middleware apply user
    const { firstName, lastName, email, password, updatedBy } = req.body;
    await userService.registerUserService(
      firstName,
      lastName,
      email,
      password,
      updatedBy,
      res
    );
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, success: false, message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.loginUserService(email, password, res);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, success: false, message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    await userService.getAllUserService(res);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, success: false, message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  //email validation above
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  try {
    const secretToken = await userService.forgotPasswordService(email, res);
    try {
      await userService.sendEmailService(email, secretToken, res);
    } catch (error) {
      return res.status(502).json({
        success: false,
        message: "Bad Gateway error in sending email",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  // const { token }=req.params;
  const { password, confirmPassword } = req.body;
  const userId = req.user.id;

  const user = await pool.query("SELECT * FROM puser WHERE id=$1", [userId]);
  if (user.rows.length === 0) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    await userService.resetPasswordService(password, userId, res);
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
    userService.resetPasswordAuth(password, res, userId);
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
