import { pool } from "../core/database/db.js";
export const fileuploadService = async (
  version_number,
  doc_id,
  delta,
  created_by,
  res
) => {
  const query = `
      INSERT INTO document_version(version_number, doc_id, delta, created_by)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `;
  const values = [version_number, doc_id, delta, created_by];

  const result = await pool.query(query, values);
  //   const document = await pool.query(
  //     "UPDATE document SET htmldata=$1 WHERE id=$2 RETURNING *",
  //     [htmlText, docId]
  //   );

  if (result.rowCount === 0) {
    return res.status(400).json({
      success: false,
      message: "Document version not created, doc id may not exist",
    });
  }
  return res.status(201).json({
    success: true,
    message: "Document Version Created",
  });
};
