import { pool } from "../../core/database/db.js";
import * as fileService from "../../services/file.services.js";
export const uploadFile = async (req, res) => {
  let { htmlText, docId, htmljson } = req.body;

  docId = parseInt(docId);

  const textBytesSize = Buffer.byteLength(htmlText, "utf8");

  if (textBytesSize > 10 * 1024 * 1024) {
    return res.status(400).json({
      success: false,
      message: "File size should be less than 10MB",
    });
  }
  if (htmlText === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "File not uploaded,Invalid input" });
  }

  try {
    const document = await pool.query(
      "UPDATE document SET htmldata=$1, htmljson=$2  WHERE id=$3 RETURNING *",
      [htmlText, htmljson, docId]
    );

    if (document.rowCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "File not uploaded" });
    }

    return res.status(201).json({
      success: true,
      message: "File uploaded",
    });
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
  console.log(docId);
  docId = parseInt(docId);
  //400->bad request
  if (!docId) {
    return res.status(400).json({
      success: false,
      message: "Document Id is required",
    });
  }

  try {
    const document = await pool.query(
      "SELECT  htmljson , convert_from(htmldata,'utf8') as data  FROM document WHERE id=$1",
      [docId]
    );
    if (document.rows.length === 0) {
      //400->bad request invalid doc id
      return res.status(400).json({
        success: false,
        message: "File not found ,invalid document id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "File fetched",
      data: document.rows[0],
    });
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
