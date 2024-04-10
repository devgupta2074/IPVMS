import { VIEWS_CONSTANTS } from "../js/constants.js";
import { redirect } from "../js/utils.js";

const tologin = document.getElementById("tologin");
tologin.addEventListener("click", function (e) {
  e.preventDefault();
  redirect(VIEWS_CONSTANTS.LOGIN);
});
