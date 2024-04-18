export const fileuploadMiddleware = async (req, res, next) => {
  let { htmlText, docId } = req.body;
  docId = parseInt(docId);
  if (!htmlText) {
    return res.status(400).json({
      success: false,
      message: "htmlText is required",
    });
  }
  if (!docId) {
    return res.status(400).json({
      success: false,
      message: "docId is required",
    });
  }

  const textBytesSize = Buffer.byteLength(htmlText, "utf8");
  if (textBytesSize > 10 * 1024 * 1024) {
    return res.status(400).json({
      success: false,
      message: "File size should be less than 10MB",
    });
  }

  next();
};

export const getFileMiddleware = async (req, res, next) => {
  let { docId } = req.params;
  docId = parseInt(docId);
  if (!docId) {
    return res.status(400).json({
      success: false,
      message: "Document Id is required",
    });
  }
};

export const uploadTemplateMiddleware = async (req, res, next) => {
  const { name, description, categoryId, htmlText } = req.body;
  if (!name || !description || !categoryId || !htmlText) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
    });
  }
  //check htmlText size->
  const textBytesSize = Buffer.byteLength(htmlText, "utf8");
  if (textBytesSize > 10 * 1024 * 1024) {
    return res.status(400).json({
      success: false,
      message: "File size should be less than 10MB",
    });
  }
  next();
};
