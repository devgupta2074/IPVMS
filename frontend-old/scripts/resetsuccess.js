import { VIEWS_CONSTANTS } from "../utils/constants.js";
import { redirect } from "../utils/utils.js";

setTimeout(function () {
  redirect(VIEWS_CONSTANTS.LOGIN);
}, 5000);
