import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../core/Email/sendEmail.js";
import {
  BadGatewayError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../Error/customError.js";
import {
  createUser,
  getAllUser,
  getUser,
  updatePassword,
} from "../query/user.js";

export const registerUserService = async (body) => {
  const { firstName, lastName, email, password, updatedBy } = body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await getUser({ email });
    if (user.rows.length > 0) {
      throw new ConflictError("User email already Exist");
    }
  } catch (error) {
    throw error;
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
    return createdUser;
  } catch (error) {
    throw error;
  }
};

export const loginUserService = async (body) => {
  const { email, password } = body;
  try {
    const user = await getUser({ email });
    if (user.rows.length === 0) {
      throw new NotFoundError("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      throw new ValidationError("invalid credentials");
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    const users = user.rows[0];
    delete users["password"];
    return { users, token };
  } catch (error) {
    throw error;
  }
};
export const getAllUserService = async () => {
  try {
    const data = await getAllUser();
    if (data.rows.length === 0) {
      throw new NotFoundError("User not found");
    }
    return data.rows;
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordService = async (email) => {
  try {
    const user = await getUser({ email });
    if (user.rows.length === 0) {
      throw new NotFoundError("User not found");
    }
    //send email with token
    const secretToken = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return secretToken;
  } catch (error) {
    throw new ValidationError("Cant generate token , some error with jwt key");
  }
};

export const sendEmailService = async (email, secretToken) => {
  try {
    await sendEmail(email, secretToken);
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (password, userId) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await updatePassword({ hashedPassword, userId });
    const users = updatedUser.rows[0];
    const token2 = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    delete users["password"];
    console.log(users, token2);
    return { users, token2 };
  } catch (error) {
    throw error;
  }
};

export const resetPasswordAuth = async (password, userId) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await updatePassword({ hashedPassword, userId });
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    const user = updatedUser.rows[0];
    delete user["password"];
    return { user, token };
  } catch (error) {
    throw new ValidationError("error in reseting password");
  }
};
