import { UserInfoApiRequest } from "../api/dashboard.js";
import {
  API_CONSTANTS,
  ROUTES_CONSTANTS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";

import { redirect } from "../utils/utils.js";
let userdata;
if (localStorage.getItem("token") === null) {
  redirect(VIEWS_CONSTANTS.LOGIN);
} else {
  const token = localStorage.getItem("token");
  await UserInfoApiRequest(token).then((data) => {
    // Handle the response from the backend
    console.log(data);
    userdata = data;
  });
}

let btn = document.querySelector(".logo");
let sidebar = document.querySelector(".sidebar");
let name = document.getElementById("name");
name.textContent = userdata.data.first_name + " " + userdata.data.last_name;
btn.addEventListener("click", () => {
  console.log("click");
  sidebar.classList.toggle("close");
});

let arrows = document.querySelectorAll(".arrow");
for (let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;

    arrowParent.classList.toggle("show");
  });
}
