import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/user/auth.controller.js";
const userRouter = express.Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.get("/getAllUsers", getAllUsers);

export default userRouter;
