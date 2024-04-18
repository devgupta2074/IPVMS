import { VIEWS_CONSTANTS } from "../js/constants.js";
import { redirect } from "../js/utils.js";
let userdata;
if (localStorage.getItem("token") === null) {
  redirect(VIEWS_CONSTANTS.LOGIN);
} else {
}
redirect(VIEWS_CONSTANTS.DASHBOARD);
