const API_CONSTANTS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  BACKEND_BASE_URL: "http://127.0.0.1:3000",
  TOKEN: "token",
};

const TOAST_COLORS = {
  ERROR: "rgba(220, 20, 60, 0.877)",
  SUCCESS: "rgba(23, 215, 23, 0.823);",
  SHOW: "show",
  ICON_SIZE: "30px",
};
const TOAST_ICONS = {
  ERROR: "fa-solid fa-circle-exclamation",
  SUCCESS: "fa-solid fa-circle-check",
};
const LOGIN_CONSTANTS = {
  INVALID_DOMAIN: "Invalid Domain",
};
const VIEWS_CONSTANTS = {
  DASHBOARD: "#dashboard",
  LOGIN: "#login",
  SIGNUP: "#signup",
  HOME: "#home",
};

const ROUTES_CONSTANTS = {
  LOGIN: "/api/user/loginUser",
  //   SIGNUP: "/signup",
  //   HOME: "/home",
  //   DASHBOARD: "/dashboard",
};
export {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  VIEWS_CONSTANTS,
  TOAST_COLORS,
  TOAST_ICONS,
  ROUTES_CONSTANTS,
};
