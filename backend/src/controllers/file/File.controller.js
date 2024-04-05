import { pool } from "../../core/database/db.js";
import * as fileService from "../../services/file.services.js";
export const uploadFile = async (req, res) => {
  let { htmlText, docId } = req.body;
  docId = parseInt(docId);
  try {
    await fileService.fileuploadService(htmlText, docId, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getFile = async (req, res) => {
  let { docId } = req.params;
  docId = parseInt(docId);
  //400->bad request

  try {
    await fileService.getFileService(docId, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const uploadTemplate = async (req, res) => {
  let { name, description, categoryId, htmlText } = req.body;

  try {
    const htmlData = Buffer.from(htmlText, "utf8");

    await fileService.uploadTemplateService(
      res,
      name,
      description,
      categoryId,
      htmlData
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getTemplateById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid params",
    });
  }

  try {
    await fileService.getTemplateByIdService(res, id);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
