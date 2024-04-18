import { VIEWS_CONSTANTS } from "../utils/constants.js";
import { redirect } from "../utils/utils.js";

var url = window.location.href;

// Parse the URL to extract the email parameter
var params = new URLSearchParams(url.split("?")[1]);
var email = params.get("email");
email = email.split("#")[0];
const emailText = document.getElementById("emailText");
emailText.innerText = email;
emailText.className = "font-medium "; // Example style, you can add more styles as needed
emailText.style.display = "inline";
emailText.style.color = "IndianRed";

const tologin = document.getElementById("tologin");
tologin.addEventListener("click", function (e) {
  e.preventDefault();
  redirect(VIEWS_CONSTANTS.LOGIN);
});
