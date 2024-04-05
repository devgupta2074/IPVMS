const response = fetch("http://localhost:3000/api/file/getFile/1", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the response from the backend
    console.log(data);

    if (data.success) {
      console.log(data.secretToken);
      const blob = new Blob([data.data.data], { type: "text/html" });

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "output.html";

      // Trigger the download
      link.click();

      // redirect(`?email=${email}` + VIEWS_CONSTANTS.EMAIL_SENT);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
