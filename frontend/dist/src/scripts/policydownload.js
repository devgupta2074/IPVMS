document.addEventListener("DOMContentLoaded", function (event) {
  const url = window.location.href;
  console.log("URL:", url);

  const match = url.match(/\/(\d+)$/);
  console.log("Match:", match);

  const id = match ? match[1] : null;
  console.log("ID:", id);

  const fetchAndRenderDoc = async (modalId) => {
    const response = await fetch(
      `http://localhost:5001/api/file/getFile/${modalId}`,
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
        document.getElementById("docx-wrapper").innerHTML = "";
        document.getElementById("docx-wrapper").innerHTML = docData;
        setTimeout(() => {
          window.print();
        }, 1000);
      });
  };
  fetchAndRenderDoc(id);
});
