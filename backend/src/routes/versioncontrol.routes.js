import express from "express";
import {
  createDocumentVersion,
  getDocumentVersionById,
  getDocumentVersionsDatewise,
} from "../controllers/document/document.controller.js";
import {
  createTemplateVersion,
  getTemplateVersionById,
  getTemplateVersionsDatewise
} from "../controllers/template/template.controller.js";
import {
  checkDocIdMiddleware,
  checkIdMiddleware,
  createVersionMiddleware
} from "../middleware/fileHandlingMiddleware.js";

const versionControlRouter = express.Router();

versionControlRouter.post("/createDocumentVersion", createVersionMiddleware, createDocumentVersion);
versionControlRouter.get("/getDocumentVersionsDatewise", checkDocIdMiddleware, getDocumentVersionsDatewise);
versionControlRouter.get("/getDocumentVersionById", checkIdMiddleware, getDocumentVersionById);


versionControlRouter.post("/createTemplateVersion", createVersionMiddleware, createTemplateVersion);
versionControlRouter.get("/getTemplateVersionsDatewise", checkDocIdMiddleware, getTemplateVersionsDatewise);
versionControlRouter.get("/getTemplateVersionById", checkIdMiddleware, getTemplateVersionById);


export default versionControlRouter;
