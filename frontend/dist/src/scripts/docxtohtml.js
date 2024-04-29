async function renderDocx(file) {
  try {
    console.log("in render docx ");
    currentDocument = file;
    if (!currentDocument) {
      const docxOptions = Object.assign(docx.defaultOptions, {
        debug: true,
        experimental: true,

        ignoreLastRenderedPageBreak: false,
      });
      var docData = await convertDocxToBlob();
      await docx.renderAsync(
        docData,
        document.getElementById("container-content"),
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
        document.getElementById("container-content"),
        null,
        docxOptions
      );
      const result = document.getElementById("container-content");
      return result.innerHTML;
    }
  } catch (error) {
    console.log(error);
  }
}

async function convertDocxToBlob(docxFilePath) {
  console.log(docxFilePath);
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
