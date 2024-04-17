import { VIEWS_CONSTANTS } from "../utils/constants.js";
import { redirect, showNextPolicy } from "../utils/utils.js";

let url = window.location.href;

// Parse the URL to extract the email parameter
let params = new URLSearchParams(url.split("?")[1]);
let email = params.get("email");
email = email.split("#")[0];
const emailText = document.getElementById("emailText");
emailText.innerText = email;

const tologin = document.getElementById("tologin");
tologin.addEventListener("click", function (e) {
  redirect(VIEWS_CONSTANTS.LOGIN);
});

const tologins = document.getElementById("tologins");
tologins.addEventListener("click", function (e) {
  redirect(VIEWS_CONSTANTS.LOGIN);
});
showNextPolicy();
setInterval(showNextPolicy, 3000);
