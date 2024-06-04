async function renderDocx(file, elementId) {
  try {
    console.log("in render docx ");
    const currentDocument = file;
    if (!currentDocument) {
      const docxOptions = Object.assign(docx.defaultOptions, {
        debug: true,
        experimental: true,
        breakPages: true, //enables page breaking on page breaks
        ignoreLastRenderedPageBreak: false,
        renderHeaders: true, //enables headers rendering
        renderFooters: true, //enables footers rendering
        renderFootnotes: true, //enables footnotes rendering
        renderEndnotes: true, //enables endnotes rendering
        trimXmlDeclaration: true, //if true, xml declaration will be removed from xml documents before parsing
      });
      var docData = await convertDocxToBlob();
      await docx.renderAsync(
        docData,
        document.getElementById(`${elementId}`),
        null,
        docxOptions
      );
    } else {
      const docxOptions = Object.assign(docx.defaultOptions, {
        debug: true,
        experimental: true,
        ignoreLastRenderedPageBreak: false,
      });

      var docData = await convertDocxToBlob();
      console.log("gere", docData);
      const res = await docx.renderAsync(
        currentDocument,
        document.getElementById(`${elementId}`),
        null,
        docxOptions
      );

      const result = document.getElementById(`${elementId}`);
      return result.innerHTML;
    }
  } catch (error) {
    console.log(error);
  }
}

async function convertDocxToBlob(docxFilePath) {
  console.log(docxFilePath, "HEEEEE");
  try {
    const response = await fetch(docxFilePath);
    console.log(response);
    const arrayBuffer = await response.arrayBuffer();

    const blob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    console.log(blob);

    return blob;
  } catch (error) {
    console.error("Error converting DOCX to Blob:", error);
  }
}
