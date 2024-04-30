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

/***/ "./dist/src/scripts/editor.js":
/*!************************************!*\
  !*** ./dist/src/scripts/editor.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar optionsButtons = document.querySelectorAll(\".option-button\");\nvar advancedOptionButton = document.querySelectorAll(\".adv-option-button\");\nvar fontName = document.getElementById(\"fontName\");\nvar fontSizeRef = document.getElementById(\"fontSize\");\nvar writingArea = document.getElementById(\"text-input\");\nvar linkButton = document.getElementById(\"createLink\");\nvar alignButtons = document.querySelectorAll(\".align\");\nvar spacingButtons = document.querySelectorAll(\".spacing\");\nvar formatButtons = document.querySelectorAll(\".format\");\nvar scriptButtons = document.querySelectorAll(\".script\");\n\n//List of fontlist\nvar fontList = [\"Arial\", \"Verdana\", \"Times New Roman\", \"Garamond\", \"Georgia\", \"Courier New\", \"cursive\"];\n\n//Initial Settings\nvar initializer = function initializer() {\n  //function calls for highlighting buttons\n  //No highlights for link, unlink,lists, undo,redo since they are one time operations\n  highlighter(alignButtons, true);\n  highlighter(spacingButtons, true);\n  highlighter(formatButtons, false);\n  highlighter(scriptButtons, true);\n\n  //create options for font names\n  fontList.map(function (value) {\n    var option = document.createElement(\"option\");\n    option.value = value;\n    option.innerHTML = value;\n    fontName.appendChild(option);\n  });\n\n  //fontSize allows only till 7\n  for (var i = 1; i <= 7; i++) {\n    var option = document.createElement(\"option\");\n    option.value = i;\n    option.innerHTML = i;\n    fontSizeRef.appendChild(option);\n  }\n\n  //default size\n  fontSizeRef.value = 3;\n};\n\n//main logic\nvar modifyText = function modifyText(command, defaultUi, value) {\n  //execCommand executes command on selected text\n  document.execCommand(command, defaultUi, value);\n};\n\n//For basic operations which don't need value parameter\noptionsButtons.forEach(function (button) {\n  button.addEventListener(\"click\", function () {\n    modifyText(button.id, false, null);\n  });\n});\n\n//options that require value parameter (e.g colors, fonts)\nadvancedOptionButton.forEach(function (button) {\n  button.addEventListener(\"change\", function () {\n    modifyText(button.id, false, button.value);\n  });\n});\n\n//link\nlinkButton.addEventListener(\"click\", function () {\n  var userLink = prompt(\"Enter a URL\");\n  //if link has http then pass directly else add https\n  if (/http/i.test(userLink)) {\n    modifyText(linkButton.id, false, userLink);\n  } else {\n    userLink = \"http://\" + userLink;\n    modifyText(linkButton.id, false, userLink);\n  }\n});\n\n//Highlight clicked button\nvar highlighter = function highlighter(className, needsRemoval) {\n  className.forEach(function (button) {\n    button.addEventListener(\"click\", function () {\n      //needsRemoval = true means only one button should be highlight and other would be normal\n      if (needsRemoval) {\n        var alreadyActive = false;\n\n        //If currently clicked button is already active\n        if (button.classList.contains(\"active\")) {\n          alreadyActive = true;\n        }\n\n        //Remove highlight from other buttons\n        highlighterRemover(className);\n        if (!alreadyActive) {\n          //highlight clicked button\n          button.classList.add(\"active\");\n        }\n      } else {\n        //if other buttons can be highlighted\n        button.classList.toggle(\"active\");\n      }\n    });\n  });\n};\nvar highlighterRemover = function highlighterRemover(className) {\n  className.forEach(function (button) {\n    button.classList.remove(\"active\");\n  });\n};\nwindow.onload = initializer();\n\n//# sourceURL=webpack://ipvms-frontend/./dist/src/scripts/editor.js?");

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
/******/ 	__webpack_modules__["./dist/src/scripts/editor.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;