import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/user/auth.controller.js";
import {
  loginMiddleware,
  registerMiddleware,
} from "../middleware/authMiddleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/registerUser", registerMiddleware, registerUser);
userRouter.post("/loginUser", loginMiddleware, loginUser);
userRouter.get("/getAllUsers", getAllUsers);

export default userRouter;
