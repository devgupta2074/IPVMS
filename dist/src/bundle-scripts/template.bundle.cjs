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
    /***/ "./dist/src/scripts/template.js":
      /*!**************************************!*\
  !*** ./dist/src/scripts/template.js ***!
  \**************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\nvar makeForm = function makeForm() {\n  var htmlContent = document.getElementById("container").innerHTML;\n  var handlebarsRegex = /\\{\\{([^{}]+)\\}\\}/g;\n  //extarction logic\n\n  var selectElement = function selectElement(title) {\n    return "<div class=\\"inline-block relative w-96 px-2\\">\\n            <h1>".concat(title, "</h1>\\n            <input onchange=\\"handleSubmit()\\" id=").concat(title, " class=\\"appearance-none block w-full bg-white  rounded-md    border-2 border-gray-200 text-gray-700   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white\\" id=\\"grid-first-name\\" type=\\"text\\" placeholder=\\"Jane\\">\\n    </div>");\n  };\n  var emailElement = function emailElement(title) {\n    return "<div>\\n      <label for=\\"website\\" class=\\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\\">".concat(title, "</label>\\n      <input onchange=\\"handleSubmit()\\" type=\\"url\\" id=").concat(title, " class=\\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\\" placeholder=\\"flowbite.com\\" required />\\n      </div>");\n  };\n  var numberElement = function numberElement(title) {\n    return "<div>\\n      <label for=\\"phone\\" class=\\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\\">".concat(title, "</label>\\n      <input  onchange=\\"handleSubmit()\\" type=\\"number\\" id=").concat(title, " class=\\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\\" placeholder=\\"123-45-678\\" pattern=\\"[0-9]{3}-[0-9]{2}-[0-9]{3}\\" maxlength=\\"10\\"   required />\\n  </div>");\n  };\n  var imageElement = function imageElement(title) {\n    return "<div class=\\"border-2 border-gray-100 flex item-center flex-col items-center p-2   \\">\\n            <h1>".concat(title, "</h1>\\n        <div \\n        id=\\"main\\" \\n        class=\\"rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md  w-64 \\">\\n        <label for=\\"upload\\" class=\\"flex flex-col items-center gap-2 cursor-pointer\\">\\n          <svg xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"h-10 w-10 fill-white stroke-indigo-500\\" viewBox=\\"0 0 24 24\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\\" />\\n          </svg>\\n          <span class=\\"text-gray-600 font-medium\\">Upload file</span> \\n        </label>\\n        <input onchange=\\"handleSubmit()\\" id=\\"").concat(title, "\\" type=\\"file\\" />\\n        <img  id=\\"").concat(title, "image\\" class=\\"object-cover h-20 w-40\\" alt=\\"image\\">\\n    </div>\\n    </div>");\n  };\n  var dateElement = function dateElement(title) {\n    return "\\n      <div class=\\"relative max-w-sm\\">\\n    <div class=\\"absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none\\">\\n      <svg class=\\"w-4 h-4 text-gray-500 dark:text-gray-400\\" aria-hidden=\\"true\\" xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"currentColor\\" viewBox=\\"0 0 20 20\\">\\n        <path d=\\"M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z\\"/>\\n      </svg>\\n    </div>\\n    <input onchange=\\"handleSubmit()\\" datepicker type=\\"text\\" id=".concat(title, " class=\\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\\" placeholder=\\"Select date\\">\\n  </div>\\n      ");\n  };\n  var linkElement = function linkElement(title) {\n    return "<div>\\n        <label class=\\"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2\\" for=\\"grid-first-name\\">\\n            ".concat(title, "\\n          </label>\\n          <input onchange=\\"handleSubmit()\\" id=\\"").concat(title, "\\" class=\\"appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white\\" id=\\"grid-first-name\\" type=\\"text\\" placeholder=\\"Jane\\">\\n          </div>");\n  };\n  var loopElement = function loopElement(name, head) {\n    return "<div class=\\"w-15\\" >\\n    <h1>\\n    ".concat(head, "\\n    </h1>\\n    <div class=\\"flex flex-row gap-5 items-center justify-center\\">\\n    <input onchange=\\"handleSubmit()\\" placeholder=\\"").concat(name, "\\"\\n    id=\\"").concat(name, "\\"\\n          class=\\"peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50\\" />\\n          <i class=\\"fa-solid fa-plus\\"></i>\\n    </div>\\n    </div>   \\n    ");\n  };\n  function extractVariableNames(html) {\n    var variableNames = new Set();\n    var vname = new Set();\n    var match;\n    var loopStart = false;\n    var loopHead = null;\n    while ((match = handlebarsRegex.exec(html)) !== null) {\n      var expression = match[1].trim();\n      var parts = expression.split(/\\s+/);\n      if (parts[0].startsWith("#")) {\n        loopStart = true;\n        loopHead = parts[0].substring(1);\n        continue;\n      }\n      if (parts[0].startsWith("/")) {\n        loopStart = false;\n        loopHead = null;\n        continue;\n      }\n      if (parts[0] === "this" || parts[0] === "/each") {\n        continue;\n      }\n      if (parts[0] === "image") {\n        if (vname.has(parts[1])) continue;\n        variableNames.add({\n          name: parts[1],\n          type: "image"\n        });\n        vname.add(parts[1]);\n        continue;\n      }\n      if (parts[0] === "link") {\n        if (vname.has(parts[1])) continue;\n        variableNames.add({\n          name: parts[1],\n          type: "link"\n        });\n        vname.add(parts[1]);\n        continue;\n      }\n      if (parts[0] === "number") {\n        if (vname.has(parts[1])) continue;\n        variableNames.add({\n          name: parts[1],\n          type: "number"\n        });\n        vname.add(parts[1]);\n        continue;\n      }\n      if (parts[0] === "email") {\n        if (vname.has(parts[1])) continue;\n        variableNames.add({\n          name: parts[1],\n          type: "email"\n        });\n        vname.add(parts[1]);\n        continue;\n      }\n      if (parts[0] === "number") {\n        if (vname.has(parts[1])) continue;\n        variableNames.add({\n          name: parts[1],\n          type: "number"\n        });\n        vname.add(parts[1]);\n        continue;\n      }\n      if (parts[0] === "date") {\n        if (vname.has(parts[1])) continue;\n        variableNames.add({\n          name: parts[1],\n          type: "date"\n        });\n        vname.add(parts[1]);\n        continue;\n      }\n      if (parts[0] === "email") {\n        if (vname.has(parts[1])) continue;\n        variableNames.add({\n          name: parts[1],\n          type: "email"\n        });\n        vname.add(parts[1]);\n        continue;\n      }\n      if (loopStart) {\n        if (vname.has(parts[0])) continue;\n        variableNames.add({\n          name: parts[0],\n          type: "loop",\n          head: loopHead\n        });\n        vname.add(parts[0]);\n      } else {\n        if (vname.has(parts[0])) continue;\n        variableNames.add({\n          name: parts[0],\n          type: "variable"\n        });\n        vname.add(parts[0]);\n      }\n    }\n    return Array.from(variableNames);\n  }\n  var variableNames = extractVariableNames(htmlContent);\n  console.log(variableNames);\n  var container = document.querySelector(".container2");\n  container.innerHTML = "";\n  var el = container.appendChild(document.createElement("div"));\n  el.style.border = "1px solid red";\n  console.log(variableNames);\n  variableNames.map(function (item) {\n    if (item.type === "image") {\n      var _el = container.appendChild(document.createElement("div"));\n      _el.innerHTML += imageElement(item.name);\n    }\n    if (item.type === "variable") {\n      var _el2 = container.appendChild(document.createElement("div"));\n      _el2.innerHTML += selectElement(item.name);\n    }\n    if (item.type === "loop") {\n      var _el3 = container.appendChild(document.createElement("div"));\n      _el3.innerHTML += loopElement(item.name, item.head);\n    }\n    if (item.type === "email") {\n      var _el4 = container.appendChild(document.createElement("div"));\n      _el4.innerHTML += emailElement(item.name);\n    }\n    if (item.type === "number") {\n      var _el5 = container.appendChild(document.createElement("div"));\n      _el5.innerHTML += numberElement(item.name);\n    }\n    if (item.type === "link") {\n      var _el6 = container.appendChild(document.createElement("div"));\n      _el6.innerHTML += linkElement(item.name);\n    }\n    if (item.type === "date") {\n      var _el7 = container.appendChild(document.createElement("div"));\n      _el7.innerHTML += dateElement(item.name);\n    }\n  });\n};\n\n//# sourceURL=webpack://ipvms-frontend/./dist/src/scripts/template.js?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The require scope
  /******/ var __webpack_require__ = {};
  /******/
  /************************************************************************/
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
  /******/ var __webpack_exports__ = {};
  /******/ __webpack_modules__["./dist/src/scripts/template.js"](
    0,
    __webpack_exports__,
    __webpack_require__
  );
  /******/
  /******/
})();
