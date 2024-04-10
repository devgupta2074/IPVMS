/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// app.js\n\nvar express = require(\"express\");\nvar path = require(\"path\");\nvar app = express();\nvar PORT = process.env.PORT || 5555;\n\n// Serve static files from the public directory\napp.use(express[\"static\"](path.join(__dirname, \"public\")));\n\n// Define routes\napp.get(\"/login\", function (req, res) {\n  res.sendFile(path.join(__dirname, \"views\", \"login.html\"));\n});\napp.get(\"/forgetpassword\", function (req, res) {\n  res.sendFile(path.join(__dirname, \"views\", \"forget-password.html\"));\n});\napp.get(\"/emailsent\", function (req, res) {\n  res.sendFile(path.join(__dirname, \"views\", \"emailsent.html\"));\n});\napp.get(\"/resetpassword\", function (req, res) {\n  res.sendFile(path.join(__dirname, \"views\", \"resetpassword.html\"));\n});\napp.get(\"/resetsuccess\", function (req, res) {\n  res.sendFile(path.join(__dirname, \"views\", \"resetsuccess.html\"));\n});\napp.get(\"/dashboard\", function (req, res) {\n  res.sendFile(path.join(__dirname, \"views\", \"dashboard.html\"));\n});\napp.get(\"/document\", function (req, res) {\n  res.sendFile(path.join(__dirname, \"views\", \"document.html\"));\n});\napp.get(\"/\", function (req, res) {\n  res.sendFile(path.join(__dirname, \"views\", \"index.html\"));\n});\n\n// Start the server\napp.listen(PORT, function () {\n  console.log(\"Server is running on port \".concat(PORT));\n});\n\n//# sourceURL=webpack://ipvms-frontend/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;