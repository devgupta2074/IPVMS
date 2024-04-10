import express from "express";
import { createDocumentVersion } from "../controllers/versioncontrol/document.controller.js";

const versionControlRouter = express.Router();

versionControlRouter.post("/createDocumentVersion", createDocumentVersion);
export default versionControlRouter;
