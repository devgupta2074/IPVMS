import express from "express";

import {
  authorizationMiddeleware,
  loginMiddleware,
  registerMiddleware,
} from "../middleware/authMiddleware/authMiddleware.js";
import {
  UploadFile,
  getFile,
} from "../controllers/fIle/uploadFile.controller.js";
const fileRouter = express.Router();

fileRouter.post("/uploadFile", UploadFile);
fileRouter.get("/getFile", getFile);

export default fileRouter;
