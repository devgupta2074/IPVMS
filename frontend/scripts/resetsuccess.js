import { VIEWS_CONSTANTS } from "../js/constants.js";
import { redirect } from "../js/utils.js";

setTimeout(function () {
  redirect(VIEWS_CONSTANTS.LOGIN);
}, 5000);
