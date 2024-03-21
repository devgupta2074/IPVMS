//register, login
//register ->Email valid,password valid,first Name,last Name,
//updated By ->id or null  later->imp in rbac who is updating

import { emailValidation } from "../../utils/emailValidation";
import { passwordValidation } from "../../utils/passwordValidation";

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

export const registerMiddleware = async (req, res) => {
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
