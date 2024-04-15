import { pool } from "../../core/database/db.js";
import * as fileService from "../../services/file.services.js";
import puppeteer from "puppeteer";
import path from "path";

const __dirname = path.resolve();
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
//pagination and sorting

export const getdocument = async (req, res) => {
  const query = req.query;
  const title = req.query.title;
  console.log(title);
  //  /document?page=1&size=2
  const page = parseInt(query.page);
  const size = parseInt(query.size);
  const { limit, offset } = fileService.getPagination(page, size);
  console.log(limit, offset);
  //order by
  const orderByColumn = query?.orderByColumn || "created_at";
  const orderByDirection = query?.orderByDirection?.toUpperCase() || "ASC";
  try {
    const query = `
WITH paginated_data AS (
  SELECT 
    id, 
    htmljson, 
    convert_from(htmldata, 'utf8') as data, 
    category_id, 
    created_at, 
    created_by, 
    title
  FROM document
  WHERE 
  title ILIKE '%'||$3||'%'
  ORDER BY ${orderByColumn} ${orderByDirection}
  LIMIT $1 OFFSET $2
),
total_count AS (
  SELECT COUNT(*) as total_count FROM document
)
SELECT 
  pd.*
  , 
  (SELECT total_count FROM total_count) as total_count
FROM 
  paginated_data pd;
`;

    const data = await pool.query(query, [limit, offset, title]);
    if (data.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no document dound" });
    }
    console.log(data.rows.length);
    return res
      .status(200)
      .json({ message: "documents are", success: true, data: data.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error, success: false });
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

export const editDocument = async (req, res) => {
  const { title } = req.body;
  let id = req.params.id;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "title is missing" });
  }

  const docId = parseInt(id);
  console.log(docId, title);
  try {
    const query = `
UPDATE document
SET title=$1
WHERE id=$2
RETURNING *
`;
    const result = await pool.query(query, [title, docId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "no document found" });
    }
    return res
      .status(200)
      .json({ message: "updated title success", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const saveAsPdf = async (req, res) => {
  const { htmlData } = req.body;

  if (!htmlData) {
    return res
      .status(400)
      .json({ message: "Invalid syntax error", success: false });
  }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(htmlData, {
    waitUntil: "domcontentloaded",
  });
  const pdfBuffer = await page.pdf({
    format: "tabloid",
  });
  console.log("pdf buffer", pdfBuffer);
  await page.pdf({
    margin: { top: "10px", bottom: "10px" },

    path: `${__dirname}/my-fance-invoice.pdf`,
  });
  await browser.close();
  return res
    .status(200)
    .json({ message: "pdf file saved success", success: true });
};
