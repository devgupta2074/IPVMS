import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  forgotPassword,
  resetPassword,
  resetPasswordAuth,
} from "../controllers/user/auth.controller.js";
import {
  authorizationMiddeleware,
  loginMiddleware,
  registerMiddleware,
} from "../middleware/authMiddleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/registerUser", registerMiddleware, registerUser);
userRouter.post("/loginUser", loginMiddleware, loginUser);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword/:token", resetPassword);
userRouter.post("/resetPassword", authorizationMiddeleware, resetPasswordAuth);

export default userRouter;
