const API_CONSTANTS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  BACKEND_BASE_URL: "http://127.0.0.1:5001",
  BACKEND_BASE_URL_PROD: "http://localhost:5001",
  TOKEN: "token",
};
const URL_CONSTANTS = {
  FRONTEND_BASE_URL: "http://localhost:5555",
};

const HEADERS_CONSTANTS = {
  CONTENT_TYPE: "Content-Type",
  ACCEPT: "Accept",
  AUTHORIZATION: "Authorization",
  CONTENT_TYPE_JSON: "application/json",
  CONTENT_TYPE_FORM: "application/x-www-form-urlencoded",
  CONTENT_TYPE_MULTIPART: "multipart/form-data",
  CONTENT_TYPE_TEXT: "text/plain",
  CONTENT_TYPE_HTML: "text/html",
  CONTENT_TYPE_XML: "text/xml",
  CONTENT_TYPE_PDF: "application/pdf",
  CONTENT_TYPE_ZIP: "application/zip",
  CONTENT_TYPE_XLS: "application/vnd.ms-excel",
  CONTENT_TYPE_XLSX:
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  CONTENT_TYPE_DOC: "application/msword",
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
  USER_NOT_FOUND: "user not found",
};
const VIEWS_CONSTANTS = {
  DASHBOARD: "/dashboard",
  LOGIN: "/login",

  FORGET_PASSWORD: "/forgotpassword",
  EMAIL_SENT: "/emailsent",
  RESET_PASSWORD: "/resetpassword",
  RESET_SUCCESS: "/resetsuccess",
  LINK_NOT_VALID: "/linkexpired",
};
const PASSWORD_CONSTANTS = {
  DIGIT: "Password should contain at least one digit",
  UPPER_CASE: "Password should contain at least one uppercase letter",
  SYMBOL: "Password should contain at least one special symbol",
};
const TOAST_ERRORS = {
  INVALID_DOMAIN: "Invalid Domain",
  USER_NOT_FOUND: "user not found",
  EMAIL_NOT_PRESENT: "Please enter your email",
  PASSWORD_NOT_PRESENT: "Please enter your password",
  INVALID_EMAIL_FORMAT: "Invalid Email format",
  INVALID_CREDENTIALS: "Invalid credentials",
  LINK_IS_NOT_VALID: "Link is not valid",
  REDIRECTING: "Redirecting you to home page",
};
const ROUTES_CONSTANTS = {
  LOGIN: "/api/user/loginUser",
  FORGET_PASSWORD: "/api/user/forgotPassword",
  RESET_PASSWORD: "/api/user/resetPassword",
  GET_USER_INFO: "/api/user/getUserInfo",
};
export {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  VIEWS_CONSTANTS,
  TOAST_COLORS,
  TOAST_ICONS,
  ROUTES_CONSTANTS,
  TOAST_ERRORS,
  HEADERS_CONSTANTS,
  PASSWORD_CONSTANTS,
  URL_CONSTANTS,
};
