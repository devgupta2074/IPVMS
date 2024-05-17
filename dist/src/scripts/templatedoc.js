// let response = {
//     "success": true,
//     "message": "all user are",
//     "data": [
//         {
//             "fileName": "policy1",
//             "category": 'RE',
//             "updatedBy": "rithvik",
//             "updatedAt": "2024-01-22T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy2",
//             "category": 'IT',
//             "updatedBy": "dev",
//             "updatedAt": "2023-04-29T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy3",
//             "category": 'ABC',
//             "updatedBy": "archit",
//             "updatedAt": "2024-07-25T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy4",
//             "category": 'CBR',
//             "updatedBy": "tapasvi",
//             "updatedAt": "2014-02-20T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "yash",
//             "updatedAt": "2022-04-06T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "siraj",
//             "updatedAt": "2018-03-01T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "sahil",
//             "updatedAt": "2013-04-10T00:29:54.119Z"
//         }

import { InsertNavbar } from "../components/Navbar.js";

//     ]
// };
InsertNavbar();
const signoutbutton = document.getElementById("signout");
signoutbutton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = VIEWS_CONSTANTS.LOGIN;
});
const todashboard = document.getElementById("dashboard");
todashboard.addEventListener("click", () => {
  window.location.href = "/dashboard";
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
  window.location.href = "http://ipvms.exitest.com/login";
});
