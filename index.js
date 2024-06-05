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
app.get("/comparisontool", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "comparison.html"));
});
// app.get("/policy", (req, res) => {
//   res.sendFile(path.join(__dirname, "src/views", "policy.html"));
// });

app.get("/policydownload/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "policydownload.html"));
});
app.get("/letters", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "letters.html"));
});
app.get("/template", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "template.html"));
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
app.get("/zerostate", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "dashboard-zerostate.html"));
});
app.get("/policy", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "document.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "index.html"));
});
app.get("/invite", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "invitation.html"));
});
app.get("/accountsetup", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "account-setup.html"));
});
app.get("/allemployee", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "employees.html"));
});
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "userProfile.html"));
});
app.get("/uploadpolicy", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "uploadpolicy.html"));
});
app.get("/uploadpolicy1", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "uploadpolicy1.html"));
});
app.get("/pdfViewer?:url", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "pdfViewer.html"));
});
app.get("/skeliton-test", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "trash.html"));
});
// app.get("/notification", (req, res) => {
//   res.sendFile(path.join(__dirname, "src/views", "notification.html"));
// });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
