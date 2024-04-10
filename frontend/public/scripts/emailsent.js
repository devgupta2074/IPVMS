import { VIEWS_CONSTANTS } from "../js/constants.js";
import { redirect } from "../js/utils.js";

var url = window.location.href;

// Parse the URL to extract the email parameter
var params = new URLSearchParams(url.split("?")[1]);
var email = params.get("email");
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
