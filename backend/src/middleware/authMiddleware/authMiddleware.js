//register, login
//register ->Email valid,password valid,first Name,last Name,
//updated By ->id or null  later->imp in rbac who is updating

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import {
  emailValidation,
  passwordValidation,
} from "../../utils/InputValidation.js";
const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  } else if (!password) {
    return res
      .status(400)
      .json({ message: "Password is required", success: false });
  } else if (!emailValidation(email).success) {
    return res.status(400).json(emailValidation(email));
  } else if (!passwordValidation(password).success) {
    return res.status(400).json(passwordValidation(password));
  }
  next();
};

//401->unauthorized wrong pass
//400->Bad request

export const registerMiddleware = async (req, res, next) => {
  const { firstName, lastName, email, password, updatedBy } = req.body;

  if (!firstName) {
    return res
      .status(400)
      .json({ message: "First Name is required", success: false });
  } else if (!lastName) {
    return res
      .status(400)
      .json({ message: "Last Name is required", success: false });
  } else if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  } else if (!password) {
    return res
      .status(400)
      .json({ message: "Password is required", success: false });
  } else if (!emailValidation(email).success) {
    return res.status(400).json(emailValidation(email));
  } else if (!passwordValidation(password).success) {
    return res.status(400).json(passwordValidation(password));
  }
  next();
};

export const authorizationMiddeleware = async (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid authorization header" });
  }
  const token = authorizationHeader.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const resetPasswordMiddleware = async (req, res, next) => {
  const { password, confirmPassword } = req.body;

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

  next();
};
export const tokenMiddleware = async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return res.status(499).json({ success: false, message: "Invalid Token" });
  }
  try {
    try {
      const verification = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verification;
    } catch (error) {
      return res
        .status(498)
        .json({ success: false, message: "Token either expired or invalid" });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
