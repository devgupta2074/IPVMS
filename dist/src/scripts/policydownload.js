import { API_CONSTANTS } from "../utils/constants.js";

document.addEventListener("DOMContentLoaded", function (event) {
  const url = window.location.href;
  console.log("URL:", url);

  const match = url.match(/\/(\d+)$/);
  console.log("Match:", match);

  const id = match ? match[1] : null;
  console.log("ID:", id);

  const fetchAndRenderDoc = async (modalId) => {
    const response = await fetch(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getFile/${modalId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "response issss");
        const docData = data.data.data;
        console.log(docData);
        console.log(docData);
        document.getElementById("docx-wrapper").innerHTML = "";
        document.getElementById("docx-wrapper").innerHTML = docData;
        document.getElementById("docx-wrapper").querySelectorAll("section");
        console.log();
        setTimeout(() => {
          window.print();
        }, 1000);
      });
  };
  fetchAndRenderDoc(id);
});
