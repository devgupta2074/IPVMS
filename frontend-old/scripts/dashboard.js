import { API_CONSTANTS, ROUTES_CONSTANTS } from "../js/constants.js";
let userdata;
if (localStorage.getItem("token") === null) {
  window.location.hash = "#login"; // Redirect to login page if token is not present
  window.location.reload();
} else {
  const token = localStorage.getItem("token");
  const response = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL + ROUTES_CONSTANTS.GET_USER_INFO,
    {
      method: API_CONSTANTS.GET,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
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
for (var i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;

    arrowParent.classList.toggle("show");
  });
}
