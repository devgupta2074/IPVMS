import { VIEWS_CONSTANTS } from "../utils/constants.js";
import { redirect, showNextPolicy } from "../utils/utils.js";

const tologin = document.getElementById("tologin");
tologin.addEventListener("click", function (e) {
  e.preventDefault();
  redirect(VIEWS_CONSTANTS.LOGIN);
});

showNextPolicy();
setInterval(showNextPolicy, 3000);
