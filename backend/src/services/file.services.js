import { DatabaseError } from "../Error/customError.js";
import { pool } from "../core/database/db.js";
import {
  getTemplate,
  updateDocument,
  uploadTemplate,
} from "../query/document.js";
export const fileuploadService = async (htmlText, docId, res) => {
  try {
    const document = await updateDocument({ htmlText, docId });
    if (document.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "File not uploaded doc id may not exist",
      });
    }
    return res.status(201).json({
      success: true,
      message: "File uploaded",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getFileService = async (docId, res) => {
  try {
    const document = getDocumentById({ docId });
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
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const uploadTemplateService = async (
  res,
  name,
  description,
  categoryId,
  htmlData
) => {
  try {
    const result = await uploadTemplate({
      name,
      description,
      categoryId,
      htmlData,
    });

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Template not uploaded",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Template uploaded",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getTemplateByIdService = async (res, id) => {
  try {
    const result = await getTemplate({ id });
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No template found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Template fetched",
      data: result.rows,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
export const createPolicy = async (body) => {
  let { htmlText, htmlJson, categoryId, title } = body;
  const htmlData = Buffer.from(htmlText, "utf8");
  console.log();
  console.log("hit");

  try {
    const document = await pool.query(
      "INSERT INTO  document   (htmldata,category_id,title) VALUES($1,$2,$3) RETURNING *",
      [htmlData, categoryId, title]
    );
    return document;
  } catch (error) {
    console.log(error.message);
    throw new DatabaseError("cant create policy");
  }
};
