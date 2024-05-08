import { UserInfoApiRequest } from "../api/dashboard.js";

import { InviteApiRequest } from "../api/invitation.js";
import { fetchCategory } from "../components/CategoryChart.js";
import { fetchTable } from "../components/Table.js";
import { InsertNavbar } from "../components/Navbar.js";
import {
  API_CONSTANTS,
  ROUTES_CONSTANTS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";
import { docsstyle } from "../utils/docxstyle.js";

import { redirect } from "../utils/utils.js";

var maxPages = 10;
var pageSize = 5;
var currentPage = 1;
var totalItems;
var title = "";
// var category = "";
var siblingCount = 1;


fetchTable({ name: "recent" });

InsertNavbar();

let userdata;
if (localStorage.getItem("token") === null) {
  redirect(VIEWS_CONSTANTS.LOGIN);
} else {
  const token = localStorage.getItem("token");
  await UserInfoApiRequest(token).then((data) => {
    // Handle the response from the backend
    console.log(data, "d");
    if (data.statusCode == 401) {
      redirect(VIEWS_CONSTANTS.LOGIN);
    } else {
      userdata = data;
    }
  });
}
fetchCategory();
const signoutbutton = document.getElementById("signout");
const todashboard = document.getElementById("dashboard");
// console.log("inviteButton dashboard", todashboard);
const inviteButton = document.getElementById("inviteButton");
// console.log("inviteButton");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("closeButton");
const inviteSubmit = document.getElementById("inviteSubmit");

todashboard.addEventListener("click", () => {
  console.log("inviteButton dash");
  window.location.href = "/dashboard";
});
const toeditor = document.getElementById("editor");
toeditor.addEventListener("click", () => {
  window.location.href = "/editor";
});
const todocument = document.getElementById("document");
todocument.addEventListener("click", () => {
  console.log("inviteButton dash");
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
// let btn = document.querySelector(".logo");
// let sidebar = document.querySelector(".sidebar");
console.log(userdata);
let name = document.getElementById("name");
let modalname = document.getElementById("modalname");
let dropdownname = document.getElementById("dropdownname");
let dropdownemail = document.getElementById("dropdownemail");

console.log(userdata);
dropdownemail.textContent = userdata.data?.email;
name.textContent = userdata.data.first_name + " " + userdata.data.last_name;
dropdownname.textContent =
  userdata.data.first_name + " " + userdata.data.last_name;
modalname.innerHTML =
  userdata.data.first_name +
  " " +
  userdata.data.last_name +
  `  <svg
  class="w-4 h-4 ml-2"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M19 9l-7 7-7-7"
  ></path>
</svg>`;
inviteButton.addEventListener("click", function () {
  console.log("clicked");
  modal.style.display = "block";
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});
async function handleInvite() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userName").value;
  console.log(name, email);
  const res = await InviteApiRequest(email, name);

  modal.style.display = "none";
}
document.getElementById("inviteSubmit").addEventListener("click", function () {
  handleInvite();
});

// api call to invite team member
