import { fetchCategories } from "../components/Categories.js";
import { InsertNavbar } from "../components/Navbar.js";
import { fetchTable } from "../components/Table.js";

InsertNavbar();
// var maxPages = 10;
// var pageSize = 5;
// var currentPage = 1;
// var totalItems;
// var title = "";
// var category = "";
// var siblingCount = 1;

document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode === 27) {
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
    let modals = document.getElementsByClassName("modal");
    Array.prototype.slice.call(modals).forEach((i) => {
      i.style.display = "none";
    });
  }
};

const tableType = {
  name: "",
  category: "",
};

document.addEventListener("DOMContentLoaded", async () => {
  // console.log("f");
  fetchTable(tableType);
  // console.log("f");
  fetchCategories();
});

const signoutbutton = document.getElementById("signout");
signoutbutton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:5555/login";
});
const todashboard = document.getElementById("dashboard");
todashboard.addEventListener("click", () => {
  window.location.href = "/dashboard";
});
const toeditor = document.getElementById("editor");
toeditor.addEventListener("click", () => {
  window.location.href = "/editor";
});
const todocument = document.getElementById("document");
todocument.addEventListener("click", () => {
  window.location.href = "/document";
});
const toletters = document.getElementById("letters");
toletters.addEventListener("click", () => {
  window.location.href = "/letters";
});
signoutbutton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = VIEWS_CONSTANTS.LOGIN;
});
