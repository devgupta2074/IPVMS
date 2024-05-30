/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./dist/src/scripts/emailsent.js":
      /*!***************************************!*\
  !*** ./dist/src/scripts/emailsent.js ***!
  \***************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants.js */ "./dist/src/utils/constants.js");\n/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./dist/src/utils/utils.js");\n\n\nvar url = window.location.href;\n\n// Parse the URL to extract the email parameter\nvar params = new URLSearchParams(url.split("?")[1]);\nvar email = params.get("email");\nemail = email.split("#")[0];\nvar emailText = document.getElementById("emailText");\nemailText.innerText = email;\nvar tologin = document.getElementById("tologin");\ntologin.addEventListener("click", function (e) {\n  (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.redirect)(_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.VIEWS_CONSTANTS.LOGIN);\n});\nvar tologins = document.getElementById("tologins");\ntologins.addEventListener("click", function (e) {\n  (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.redirect)(_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.VIEWS_CONSTANTS.LOGIN);\n});\n(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.showNextPolicy)();\nsetInterval(_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.showNextPolicy, 3000);\n\n//# sourceURL=webpack://ipvms-frontend/./dist/src/scripts/emailsent.js?'
        );

        /***/
      },

    /***/ "./dist/src/utils/constants.js":
      /*!*************************************!*\
  !*** ./dist/src/utils/constants.js ***!
  \*************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API_CONSTANTS: () => (/* binding */ API_CONSTANTS),\n/* harmony export */   HEADERS_CONSTANTS: () => (/* binding */ HEADERS_CONSTANTS),\n/* harmony export */   LOGIN_CONSTANTS: () => (/* binding */ LOGIN_CONSTANTS),\n/* harmony export */   PASSWORD_CONSTANTS: () => (/* binding */ PASSWORD_CONSTANTS),\n/* harmony export */   ROUTES_CONSTANTS: () => (/* binding */ ROUTES_CONSTANTS),\n/* harmony export */   TOAST_COLORS: () => (/* binding */ TOAST_COLORS),\n/* harmony export */   TOAST_ERRORS: () => (/* binding */ TOAST_ERRORS),\n/* harmony export */   TOAST_ICONS: () => (/* binding */ TOAST_ICONS),\n/* harmony export */   URL_CONSTANTS: () => (/* binding */ URL_CONSTANTS),\n/* harmony export */   VIEWS_CONSTANTS: () => (/* binding */ VIEWS_CONSTANTS),\n/* harmony export */   style: () => (/* binding */ style)\n/* harmony export */ });\nvar API_CONSTANTS = {\n  GET: "GET",\n  POST: "POST",\n  PUT: "PUT",\n  PATCH: "PATCH",\n  DELETE: "DELETE",\n  BACKEND_BASE_URL: "http://ipvms-api.exitest.com",\n  BACKEND_BASE_URL_PROD: "http://ipvms-api.exitest.com",\n  TOKEN: "token"\n};\nvar URL_CONSTANTS = {\n  FRONTEND_BASE_URL: "http://ipvms.exitest.com"\n};\nvar HEADERS_CONSTANTS = {\n  CONTENT_TYPE: "Content-Type",\n  ACCEPT: "Accept",\n  AUTHORIZATION: "Authorization",\n  CONTENT_TYPE_JSON: "application/json",\n  CONTENT_TYPE_FORM: "application/x-www-form-urlencoded",\n  CONTENT_TYPE_MULTIPART: "multipart/form-data",\n  CONTENT_TYPE_TEXT: "text/plain",\n  CONTENT_TYPE_HTML: "text/html",\n  CONTENT_TYPE_XML: "text/xml",\n  CONTENT_TYPE_PDF: "application/pdf",\n  CONTENT_TYPE_ZIP: "application/zip",\n  CONTENT_TYPE_XLS: "application/vnd.ms-excel",\n  CONTENT_TYPE_XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",\n  CONTENT_TYPE_DOC: "application/msword"\n};\nvar TOAST_COLORS = {\n  ERROR: "rgba(220, 20, 60, 0.877)",\n  SUCCESS: "rgba(23, 215, 23, 0.823);",\n  SHOW: "show",\n  ICON_SIZE: "30px"\n};\nvar TOAST_ICONS = {\n  ERROR: "fa-solid fa-circle-exclamation",\n  SUCCESS: "fa-solid fa-circle-check"\n};\nvar LOGIN_CONSTANTS = {\n  INVALID_DOMAIN: "Invalid Domain",\n  USER_NOT_FOUND: "user not found"\n};\nvar VIEWS_CONSTANTS = {\n  DASHBOARD: "/dashboard",\n  LOGIN: "/login",\n  FORGET_PASSWORD: "/forgotpassword",\n  EMAIL_SENT: "/emailsent",\n  RESET_PASSWORD: "/resetpassword",\n  RESET_SUCCESS: "/resetsuccess",\n  LINK_NOT_VALID: "/linkexpired"\n};\nvar PASSWORD_CONSTANTS = {\n  DIGIT: "Password should contain at least one digit",\n  UPPER_CASE: "Password should contain at least one uppercase letter",\n  SYMBOL: "Password should contain at least one special symbol"\n};\nvar TOAST_ERRORS = {\n  INVALID_DOMAIN: "Invalid Domain",\n  USER_NOT_FOUND: "user not found",\n  EMAIL_NOT_PRESENT: "Please enter your email",\n  PASSWORD_NOT_PRESENT: "Please enter your password",\n  INVALID_EMAIL_FORMAT: "Invalid Email format",\n  INVALID_CREDENTIALS: "Invalid credentials",\n  LINK_IS_NOT_VALID: "Link is not valid",\n  REDIRECTING: "Redirecting you to home page"\n};\nvar ROUTES_CONSTANTS = {\n  LOGIN: "/api/user/loginUser",\n  FORGET_PASSWORD: "/api/user/forgotPassword",\n  RESET_PASSWORD: "/api/user/resetPassword",\n  GET_USER_INFO: "/api/user/getUserInfo",\n  INVITE_USER: "/api/user/sendInvite",\n  SETUP_ACCOUNT: "/api/user/accountsetup"\n};\nvar style = "<style>\\n.docx-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } \\n.docx-wrapper>section.docx { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }\\n.docx { color: black; hyphens: auto; text-underline-position: from-font; }\\nsection.docx { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }\\nsection.docx>article { margin-bottom: auto; z-index: 1; }\\nsection.docx>footer { z-index: 1; }\\n.docx table { border-collapse: collapse; }\\n.docx table td, .docx table th { vertical-align: top; }\\n.docx p { margin: 0pt; min-height: 1em; }\\n.docx span { white-space: pre-wrap; overflow-wrap: break-word; }\\n.docx a { color: inherit; text-decoration: inherit; }\\n</style>\\n<style>.docx {\\n  --docx-majorHAnsi-font: Calibri Light;\\n  --docx-minorHAnsi-font: Calibri;\\n  --docx-dk1-color: #000000;\\n  --docx-lt1-color: #FFFFFF;\\n  --docx-dk2-color: #44546A;\\n  --docx-lt2-color: #E7E6E6;\\n  --docx-accent1-color: #5B9BD5;\\n  --docx-accent2-color: #ED7D31;\\n  --docx-accent3-color: #A5A5A5;\\n  --docx-accent4-color: #FFC000;\\n  --docx-accent5-color: #4472C4;\\n  --docx-accent6-color: #70AD47;\\n  --docx-hlink-color: #0563C1;\\n  --docx-folHlink-color: #954F72;\\n}\\n</style><style>.docx span {\\n  font-family: var(--docx-minorHAnsi-font);\\n  min-height: 11.00pt;\\n  font-size: 11.00pt;\\n}\\n.docx p {\\n  margin-bottom: 8.00pt;\\n  line-height: 1.08;\\n}\\n.docx p, p.docx_normal {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\n.docx p, p.docx_normal span {\\n  font-family: Calibri;\\n}\\np.docx_heading1 {\\n  margin-top: 12.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_heading1 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n  min-height: 16.00pt;\\n  font-size: 16.00pt;\\n}\\np.docx_heading1 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n  min-height: 16.00pt;\\n  font-size: 16.00pt;\\n}\\np.docx_heading2 {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_heading2 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n  min-height: 13.00pt;\\n  font-size: 13.00pt;\\n}\\np.docx_heading2 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n  min-height: 13.00pt;\\n  font-size: 13.00pt;\\n}\\np.docx_heading3 {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_heading3 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #1F4D78;\\n  min-height: 12.00pt;\\n  font-size: 12.00pt;\\n}\\np.docx_heading3 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #1F4D78;\\n  min-height: 12.00pt;\\n  font-size: 12.00pt;\\n}\\np.docx_heading4 {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_heading4 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  font-style: italic;\\n  color: #2E74B5;\\n}\\np.docx_heading4 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  font-style: italic;\\n  color: #2E74B5;\\n}\\np.docx_heading5 {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_heading5 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n}\\np.docx_heading5 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n}\\np.docx_heading7 {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_heading7 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  font-style: italic;\\n  color: #1F4D78;\\n}\\np.docx_heading7 span {\\n  font-family: var(--docx-majorHAnsi-font);\\n  font-style: italic;\\n  color: #1F4D78;\\n}\\n.docx table, table.docx_tablenormal td {\\n  padding-top: 0.00pt;\\n  padding-left: 5.40pt;\\n  padding-bottom: 0.00pt;\\n  padding-right: 5.40pt;\\n}\\nspan.docx_heading1char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n  min-height: 16.00pt;\\n  font-size: 16.00pt;\\n}\\nspan.docx_heading1char p {\\n  margin-top: 12.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_heading1char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n  min-height: 16.00pt;\\n  font-size: 16.00pt;\\n}\\nspan.docx_heading2char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n  min-height: 13.00pt;\\n  font-size: 13.00pt;\\n}\\nspan.docx_heading2char p {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_heading2char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n  min-height: 13.00pt;\\n  font-size: 13.00pt;\\n}\\nspan.docx_heading3char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #1F4D78;\\n  min-height: 12.00pt;\\n  font-size: 12.00pt;\\n}\\nspan.docx_heading3char p {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_heading3char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #1F4D78;\\n  min-height: 12.00pt;\\n  font-size: 12.00pt;\\n}\\nspan.docx_heading4char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  font-style: italic;\\n  color: #2E74B5;\\n}\\nspan.docx_heading4char p {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_heading4char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  font-style: italic;\\n  color: #2E74B5;\\n}\\nspan.docx_heading5char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n}\\nspan.docx_heading5char p {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_heading5char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  color: #2E74B5;\\n}\\np.docx_listparagraph {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_listparagraph span {\\n  font-family: Calibri;\\n}\\np.docx_freeform {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_freeform span {\\n  font-family: Lucida Grande;\\n  color: #000000;\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n}\\np.docx_nospacing {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_nospacing span {\\n}\\np.docx_default {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_default span {\\n  font-family: Calibri;\\n  color: #000000;\\n  min-height: 12.00pt;\\n  font-size: 12.00pt;\\n}\\np.docx_header {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_header span {\\n  font-family: Calibri;\\n}\\np.docx_header span {\\n  font-family: Calibri;\\n}\\nspan.docx_headerchar {\\n  font-family: Calibri;\\n}\\nspan.docx_headerchar p {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_headerchar {\\n  font-family: Calibri;\\n}\\np.docx_bodytext {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_bodytext span {\\n  font-family: Calibri;\\n}\\np.docx_bodytext span {\\n  font-family: Calibri;\\n}\\nspan.docx_bodytextchar {\\n  font-family: Calibri;\\n}\\nspan.docx_bodytextchar p {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_bodytextchar {\\n  font-family: Calibri;\\n}\\np.docx_footer {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_footer span {\\n  font-family: Calibri;\\n}\\np.docx_footer span {\\n  font-family: Calibri;\\n}\\nspan.docx_footerchar {\\n  font-family: Calibri;\\n}\\nspan.docx_footerchar p {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_footerchar {\\n  font-family: Calibri;\\n}\\np.docx_abodytextjust {\\n  margin-bottom: 12.00pt;\\n  text-indent: 72.00pt;\\n  text-align: justify;\\n  line-height: 1.00;\\n}\\np.docx_abodytextjust span {\\n  font-family: Times New Roman;\\n}\\np.docx_actrdboldcapheading {\\n  margin-bottom: 12.00pt;\\n  text-align: center;\\n  line-height: 1.00;\\n}\\np.docx_actrdboldcapheading span {\\n  font-family: Times New Roman Bold;\\n  font-weight: bold;\\n  text-transform: uppercase;\\n}\\np.docx_anormaltext {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_anormaltext span {\\n  font-family: Times New Roman;\\n}\\np.docx_anumberedtext {\\n  margin-bottom: 12.00pt;\\n  line-height: 1.00;\\n}\\np.docx_anumberedtext span {\\n  font-family: Times New Roman;\\n}\\np.docx_anapara {\\n  margin-bottom: 12.00pt;\\n  text-indent: 72.00pt;\\n  text-align: justify;\\n  line-height: 1.00;\\n}\\np.docx_anapara span {\\n  font-family: Times New Roman;\\n}\\np.docx_aheading1 {\\n  margin-top: 0.00pt;\\n  margin-bottom: 12.00pt;\\n  text-indent: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_aheading1 span {\\n  font-family: Times New Roman;\\n  color: #000000;\\n  min-height: 11.00pt;\\n  font-size: 11.00pt;\\n  text-decoration: underline;\\n}\\np.docx_aheading2 {\\n  margin-top: 0.00pt;\\n  margin-bottom: 12.00pt;\\n  text-indent: 0.00pt;\\n  text-align: justify;\\n  line-height: 1.00;\\n}\\np.docx_aheading2 span {\\n  font-family: Times New Roman;\\n  color: #000000;\\n  min-height: 11.00pt;\\n  font-size: 11.00pt;\\n}\\np.docx_aheading3 {\\n  margin-top: 0.00pt;\\n  margin-bottom: 12.00pt;\\n  text-indent: 0.00pt;\\n  text-align: justify;\\n  line-height: 1.00;\\n}\\np.docx_aheading3 span {\\n  font-family: Times New Roman;\\n  color: #000000;\\n  min-height: 11.00pt;\\n  font-size: 11.00pt;\\n  text-decoration: underline;\\n}\\np.docx_aheading4 {\\n  margin-top: 0.00pt;\\n  margin-bottom: 12.00pt;\\n  text-indent: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_aheading4 span {\\n  font-family: Times New Roman;\\n  font-style: normal;\\n  color: black;\\n  min-height: 12.00pt;\\n  font-size: 12.00pt;\\n}\\np.docx_aheading5 {\\n  margin-top: 0.00pt;\\n  margin-bottom: 12.00pt;\\n  text-indent: 0.00pt;\\n  margin-left: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_aheading5 span {\\n  font-family: Times New Roman;\\n  color: black;\\n  min-height: 12.00pt;\\n  font-size: 12.00pt;\\n}\\np.docx_deltaviewtablebody {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_deltaviewtablebody span {\\n  font-family: Arial;\\n  min-height: 12.00pt;\\n  font-size: 12.00pt;\\n}\\nspan.docx_hyperlink {\\n  color: #0563C1;\\n  text-decoration: underline;\\n}\\nspan.docx_commentreference {\\n  min-height: 8.00pt;\\n  font-size: 8.00pt;\\n}\\np.docx_commenttext span {\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n  font-family: Calibri;\\n}\\np.docx_commenttext {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_commenttext span {\\n  font-family: Calibri;\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n}\\nspan.docx_commenttextchar {\\n  font-family: Calibri;\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n}\\nspan.docx_commenttextchar {\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n  font-family: Calibri;\\n}\\nspan.docx_commenttextchar p {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_commentsubject span {\\n  font-weight: bold;\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n  font-family: Calibri;\\n}\\np.docx_commentsubject {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_commentsubject span {\\n  font-family: Calibri;\\n  font-weight: bold;\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n}\\nspan.docx_commentsubjectchar {\\n  font-family: Calibri;\\n  font-weight: bold;\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n}\\nspan.docx_commentsubjectchar {\\n  font-weight: bold;\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n  font-family: Calibri;\\n}\\nspan.docx_commentsubjectchar p {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_revision {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\np.docx_revision span {\\n  font-family: Calibri;\\n}\\nspan.docx_heading7char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  font-style: italic;\\n  color: #1F4D78;\\n}\\nspan.docx_heading7char p {\\n  margin-top: 2.00pt;\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\nspan.docx_heading7char {\\n  font-family: var(--docx-majorHAnsi-font);\\n  font-style: italic;\\n  color: #1F4D78;\\n}\\np.docx_bodytext2 {\\n  margin-bottom: 6.00pt;\\n  line-height: 2.00;\\n}\\np.docx_bodytext2 span {\\n  font-family: Calibri;\\n}\\np.docx_bodytext2 span {\\n  font-family: Calibri;\\n}\\nspan.docx_bodytext2char {\\n  font-family: Calibri;\\n}\\nspan.docx_bodytext2char p {\\n  margin-bottom: 6.00pt;\\n  line-height: 2.00;\\n}\\nspan.docx_bodytext2char {\\n  font-family: Calibri;\\n}\\np.docx_bodytextkeep {\\n  margin-bottom: 8.00pt;\\n  line-height: 1.00;\\n}\\np.docx_bodytextkeep span {\\n  font-family: Times New Roman;\\n  min-height: 10.00pt;\\n  font-size: 10.00pt;\\n}\\ntable.docx_tablegrid p {\\n  margin-bottom: 0.00pt;\\n  line-height: 1.00;\\n}\\ntable.docx_tablegrid td {\\n  border-top: 0.50pt solid black;\\n  border-left: 0.50pt solid black;\\n  border-bottom: 0.50pt solid black;\\n  border-right: 0.50pt solid black;\\n  padding-top: 0.00pt;\\n  padding-left: 5.40pt;\\n  padding-bottom: 0.00pt;\\n  padding-right: 5.40pt;\\n}\\n</style>";\n\n\n//# sourceURL=webpack://ipvms-frontend/./dist/src/utils/constants.js?'
        );

        /***/
      },

    /***/ "./dist/src/utils/utils.js":
      /*!*********************************!*\
  !*** ./dist/src/utils/utils.js ***!
  \*********************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   emailValidation: () => (/* binding */ emailValidation),\n/* harmony export */   passwordValidation: () => (/* binding */ passwordValidation),\n/* harmony export */   redirect: () => (/* binding */ redirect),\n/* harmony export */   showNextPolicy: () => (/* binding */ showNextPolicy)\n/* harmony export */ });\n/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants.js */ "./dist/src/utils/constants.js");\n\nvar emailValidation = function emailValidation(email) {\n  var check = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");\n  if (!check.test(email)) {\n    return {\n      error: "Invalid Email format",\n      success: false\n    };\n  }\n  var index = email.indexOf("@");\n  var domain = email.slice(index + 1);\n  if (domain !== "ex2india.com") {\n    return {\n      error: "Invalid Domain",\n      success: false\n    };\n  }\n  return {\n    success: true\n  };\n};\n\n// At least one uppercase letter\n// At least one lowercase letter\n// At least one digit\n// At least one special symbol\n// should be more than 4 character\n\nvar passwordValidation = function passwordValidation(password) {\n  if (!/[A-Z]/.test(password)) {\n    return {\n      error: "Password should contain at least one uppercase letter",\n      success: false\n    };\n  } else if (!/[a-z]/.test(password)) {\n    return {\n      error: "Password should contain at least one lowercase letter",\n      success: false\n    };\n  } else if (!/[0-9]/.test(password)) {\n    return {\n      error: "Password should contain at least one digit",\n      success: false\n    };\n  } else if (!/[^A-Za-z0-9]/.test(password)) {\n    return {\n      error: "Password should contain at least one special symbol",\n      success: false\n    };\n  } else if (password.length < 4) {\n    return {\n      error: "Password should be more than 4 character",\n      success: false\n    };\n  } else {\n    return {\n      success: true\n    };\n  }\n};\nfunction redirect(url) {\n  console.log(window.history);\n  var currentUrl = window.location.pathname;\n  console.log("currentUrl: " + currentUrl, url);\n  // var historyLength = window.history.length;\n  // // console.log(historyLength);\n  // console.log(window.history);\n  // if (window.history.length > 1 && window.history.state !== null) {\n  //   var previousUrl = window.history.state.url;\n  //   if (previousUrl == url) {\n  //     console.log("Previous URL:", previousUrl);\n  //     // window.history.back();\n  //   } else {\n  //     console.log("he");\n  //     window.history.pushState({ url: currentUrl }, "", currentUrl);\n\n  //     console.log("f", URL_CONSTANTS.FRONTEND_BASE_URL + url);\n  //     console.log(window.history);\n  //     window.location.href = URL_CONSTANTS.FRONTEND_BASE_URL + url;\n  //   }\n  // } else {\n  //   console.log("he");\n  //   window.history.pushState({ url: currentUrl }, "", currentUrl);\n\n  //   console.log("f", URL_CONSTANTS.FRONTEND_BASE_URL + url);\n  //   console.log(window.history);\n  window.location.href = _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.URL_CONSTANTS.FRONTEND_BASE_URL + url;\n\n  // Start from the current page and move backwards in history\n}\nvar policyIds = ["policy1", "policy2", "policy3"];\nvar currentIndex = 0;\nfunction showNextPolicy() {\n  if (currentIndex !== 0) {\n    var currentPolicyId = policyIds[currentIndex - 1];\n    var currentPolicyDiv = document.getElementById(currentPolicyId);\n    currentPolicyDiv.classList.add("hidden");\n    currentPolicyDiv.classList.remove("flex");\n    currentPolicyDiv.style.opacity = "0";\n    var currentPolicyIdx = policyIds[currentIndex];\n    var currentPolicyDivx = document.getElementById(currentPolicyIdx);\n    currentPolicyDivx.classList.remove("hidden");\n    currentPolicyDivx.classList.add("flex");\n    currentPolicyDivx.style.opacity = "1";\n  } else {\n    var _currentPolicyId = policyIds[policyIds.length - 1];\n    var _currentPolicyDiv = document.getElementById(_currentPolicyId);\n    _currentPolicyDiv.classList.add("hidden");\n    _currentPolicyDiv.classList.remove("flex");\n    _currentPolicyDiv.style.opacity = "0";\n    var _currentPolicyIdx = policyIds[currentIndex];\n    var _currentPolicyDivx = document.getElementById(_currentPolicyIdx);\n    _currentPolicyDivx.classList.remove("hidden");\n    _currentPolicyDivx.classList.add("flex");\n    _currentPolicyDivx.style.opacity = "1";\n  }\n\n  // Add the necessary classes to show the div with a smooth transition\n\n  // Increment the index or reset it if reached the end\n  currentIndex = (currentIndex + 1) % policyIds.length;\n}\n\n//# sourceURL=webpack://ipvms-frontend/./dist/src/utils/utils.js?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__(
    "./dist/src/scripts/emailsent.js"
  );
  /******/
  /******/
})();
