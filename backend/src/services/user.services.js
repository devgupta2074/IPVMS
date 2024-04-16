import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../core/database/db.js";
import { sendEmail } from "../core/Email/sendEmail.js";
import {
  createUser,
  getAllUser,
  getUser,
  updatePassword,
} from "../query/user.js";
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
  try {
    const user = await getUser({ email });
    if (user.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "user email already exist" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
  try {
    console.log(firstName, lastName, email, password);
    const isActive = true;
    const createdUserResult = await createUser({
      firstName,
      lastName,
      email,
      hashedPassword,
      isActive,
    });
    const createdUser = createdUserResult.rows[0];

    delete createdUser["password"];
    return res.status(201).json({
      success: true,
      message: "User Registered",
      data: createdUser,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const loginUserService = async (email, password, res) => {
  try {
    const user = await getUser({ email });
    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
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
    return res.status(400).json({ message: error.message, success: false });
  }
};
export const getAllUserService = async (res) => {
  try {
    const data = await getAllUser();
    if (data.rows.length === 0) {
      return res.status(404).json({ success: false, message: "no user found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "all user are", data: data.rows });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const forgotPasswordService = async (email, res) => {
  try {
    const user = await getUser({ email });
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
    return secretToken;
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
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
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await updatePassword({ hashedPassword, userId });

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
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const resetPasswordAuth = async (password, res, userId) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await updatePassword({ hashedPassword, userId });
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
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
