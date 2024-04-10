import * as versioncontrolService from "../../services/versioncontrol.services.js";
import path from "path";
import dotenv from "dotenv";
const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const createDocumentVersion = async (req, res) => {
  try {
    // middleware apply user
    const { version_number, doc_id, delta } = req.body;
    await versioncontrolService.fileuploadService(
      version_number,
      doc_id,
      delta,
      res
    );
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, success: false, message: "Internal Server Error" });
  }
};
