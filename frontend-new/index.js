// app.js

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5555;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/forgetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "forget-password.html"));
});

app.get("/emailsent", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "emailsent.html"));
});
app.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "resetpassword.html"));
});
app.get("/resetsuccess", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "resetsuccess.html"));
});
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
