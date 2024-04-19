// app.js

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5555;
console.log(path.join(__dirname, "public"));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "src")));
// app.use(express.static(path.join(__dirname)));

// Define routes
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "login.html"));
});

app.get("/editor", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "modify.html"));
});

app.get("/forgotpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "forget-password.html"));
});

app.get("/emailsent", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "emailsent.html"));
});
app.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "resetpassword.html"));
});
app.get("/linkexpired", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "linkexpired.html"));
});
app.get("/resetsuccess", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "resetsuccess.html"));
});
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "dashboard.html"));
});
app.get("/document", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "document.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
