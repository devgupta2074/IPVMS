import { VIEWS_CONSTANTS } from "../utils/constants.js";
import { redirect } from "../utils/utils.js";
let userdata;
if (localStorage.getItem("token") === null) {
  redirect(VIEWS_CONSTANTS.LOGIN);
} else {
}
redirect(VIEWS_CONSTANTS.DASHBOARD);
