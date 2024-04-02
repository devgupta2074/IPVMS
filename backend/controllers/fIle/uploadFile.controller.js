import { pool } from "../../database/db.js";

export const UploadFile = async (req, res) => {
  let { htmlText, docId } = req.body;

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
  console.log(htmlText);
  try {
    const document = await pool.query(
      "UPDATE document SET htmldata=$1 WHERE id=$2 RETURNING *",
      [htmlText, docId]
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
  let { docId } = req.body;
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
      "SELECT convert_from(htmldata,'utf8') as data FROM document WHERE id=$1",
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
