import { pool } from "../core/database/db.js";
export const fileuploadService = async (htmlText, docId, res) => {
  const document = await pool.query(
    "UPDATE document SET htmldata=$1 WHERE id=$2 RETURNING *",
    [htmlText, docId]
  );

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
};

export const getFileService = async (docId, res) => {
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
};

export const uploadTemplateService = async (
  res,
  name,
  description,
  categoryId,
  htmlData
) => {
  const result = await pool.query(
    "INSERT INTO template (title,description,category_id,htmldata) VALUES($1,$2,$3,$4) RETURNING *",
    [name, description, categoryId, htmlData]
  );
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
};

export const getTemplateByIdService = async (res, id) => {
  const result = await pool.query(
    "SELECT convert_from(htmldata,'utf8') as htmldata,title,category_id,description FROM template WHERE id=$1",
    [id]
  );
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
};

export const getPagination = (page, size) => {
  //page-> page number     size-> how many in one page
  const limit = size ? +size : 5;
  //page 0 ->offset 0 page 1->offset size
  const offset = page * size ? page * size : 0;
  return { limit, offset };
};
