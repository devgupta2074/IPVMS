import express from "express";
import {
  createDocumentVersion,
  getVersions,
} from "../controllers/versioncontrol/document.controller.js";

const versionControlRouter = express.Router();

versionControlRouter.post("/createDocumentVersion", createDocumentVersion);
versionControlRouter.get("/getVersions", getVersions);
export default versionControlRouter;
