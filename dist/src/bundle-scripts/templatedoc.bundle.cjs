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
    /***/ "./dist/src/components/Navbar.js":
      /*!***************************************!*\
  !*** ./dist/src/components/Navbar.js ***!
  \***************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InsertNavbar: () => (/* binding */ InsertNavbar),\n/* harmony export */   NavbarHoverFunctionality: () => (/* binding */ NavbarHoverFunctionality)\n/* harmony export */ });\nvar NavBar = "\\n<header\\nclass=\\"w-full h-[3.5rem] z-20 fixed top-0 left-0 p-1 bg-gulf-blue-950 flex items-center justify-end gap-5\\"\\n>\\n<div\\n  class=\\"flex-1 my-2 mx-5 flex items-center justify-end relative gap-3\\"\\n>\\n  <input\\n    type=\\"name\\"\\n    name=\\"search\\"\\n    type=\\"text\\"\\n    id=\\"search\\"\\n    class=\\"w-[17.5rem] p-2 h-10 pl-10 font-roboto text-[0.9375rem] leading-[1.0985rem] placeholder:text-white font-medium rounded-full shadow-md text-white bg-astronaut-900 hover:border-none focus:border-none\\"\\n    placeholder=\\"Search\\"\\n  />\\n  <svg class=\\"h-6 w-6 z-50 -ml-12 mt-1\\">\\n    <use xlink:href=\\"/assets/icons/icon.svg#search-icon\\"></use>\\n  </svg>\\n</div>\\n<div class=\\"flex items-center justify-center gap-5 pr-10\\">\\n  <svg class=\\"h-6 w-6 z-50\\">\\n    <use xlink:href=\\"/assets/icons/icon.svg#bellicon\\"></use>\\n  </svg>\\n  <figure class=\\" \\">\\n    <img\\n      class=\\"rounded-full m-1\\"\\n      width=\\"39\\"\\n      height=\\"39\\"\\n      src=\\"/assets/images/profile2.jpg\\"\\n      alt=\\"Profile\\"\\n    />\\n  </figure>\\n\\n  <button\\n   id=\\"modalname\\"\\n    class=\\"text-white font-medium font-roboto rounded-lg text-base text-center inline-flex items-center\\"\\n    type=\\"button\\"\\n    data-dropdown-toggle=\\"dropdown\\"\\n  >\\n\\n  \\n  </button>\\n  <!-- Dropdown menu -->\\n  <div\\n    class=\\"hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4\\"\\n    id=\\"dropdown\\"\\n  >\\n    <div class=\\"px-4 py-3\\">\\n      <span id=\\"dropdownname\\" class=\\"block text-sm\\"></span>\\n      <span id=\\"dropdownemail\\" class=\\"block text-sm font-medium text-gray-900 truncate\\"\\n        ></span\\n      >\\n    </div>\\n    <ul class=\\"py-1\\" aria-labelledby=\\"dropdown\\">\\n      <li>\\n        <a\\n          href=\\"#\\"\\n          id=\\"signout\\"\\n          class=\\"text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2\\"\\n          >Sign out</a\\n        >\\n      </li>\\n    </ul>\\n  </div>\\n  <!-- Dropdown menu -->\\n</div>\\n</header>\\n<aside\\nclass=\\"w-[5%] z-40 h-full fixed top-0 left-0 p-[1.3125rem] bg-gulf-blue-950\\"\\n>\\n<div class=\\"fixed z-100 top-4 left-6 flex text-white gap-3\\">\\n  <figure class=\\"\\">\\n    <img\\n      class=\\"\\"\\n      width=\\"39\\"\\n      height=\\"39\\"\\n      src=\\"/assets/images/exsquared.png\\"\\n      alt=\\"Exsquared Logo\\"\\n    />\\n  </figure>\\n</div>\\n\\n<div\\n  class=\\"flex flex-col items-center mt-20 gap-y-8 m-0 w-full p-0  sidebar-icon\\"\\n>\\n\\n<div  id=\\"dashboard\\" class=\\"relative\\">\\n<div   class=\\" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 \\">\\n  <svg   class=\\"  order-1 w-[9px] h-[13px] ml-10 \\">\\n    <use  xlink:href=\\"./assets/icons/icon.svg#triangle\\"></use>\\n  </svg>\\n \\n  <div  class=\\"  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 \\">\\n    Dashboard</div>\\n</div>\\n<svg\\n\\nclass=\\"h-[2.5rem] w-[2.5rem] p-2  \\"\\n\\n>\\n<use xlink:href=\\"/assets/icons/icon.svg#dashboard\\"></use>\\n</svg>\\n\\n\\n</div>\\n<div  id=\\"document\\" class=\\"relative\\">\\n<div   class=\\" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 \\">\\n  <svg   class=\\"  order-1 w-[9px] h-[13px] ml-10 \\">\\n    <use  xlink:href=\\"./assets/icons/icon.svg#triangle\\"></use>\\n  </svg>\\n \\n  <div  class=\\"  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 \\">\\n    Document</div>\\n</div>\\n<svg\\n\\nclass=\\"h-[2.5rem] w-[2.5rem] p-2  \\"\\n\\n>\\n<use xlink:href=\\"/assets/icons/icon.svg#document\\"></use>\\n</svg>\\n\\n\\n</div>\\n\\n\\n<div  id=\\"letters\\" class=\\"relative\\">\\n<div   class=\\" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 \\">\\n  <svg   class=\\"  order-1 w-[9px] h-[13px] ml-10 \\">\\n    <use  xlink:href=\\"./assets/icons/icon.svg#triangle\\"></use>\\n  </svg>\\n \\n  <div  class=\\"  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 \\">\\n  Letters</div>\\n</div>\\n<svg\\n\\nclass=\\"h-[2.5rem] w-[2.5rem] p-2  \\"\\n\\n>\\n<use xlink:href=\\"/assets/icons/icon.svg#policy\\"></use>\\n</svg>\\n\\n\\n</div>\\n<div  id=\\"editor\\" class=\\"relative\\">\\n<div   class=\\" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 \\">\\n  <svg   class=\\"  order-1 w-[9px] h-[13px] ml-10 \\">\\n    <use  xlink:href=\\"./assets/icons/icon.svg#triangle\\"></use>\\n  </svg>\\n \\n  <div  class=\\"  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 \\">\\n  Editor</div>\\n</div>\\n<svg\\n\\nclass=\\"h-[2.5rem] w-[2.5rem] p-2  \\"\\n\\n>\\n<use xlink:href=\\"/assets/icons/icon.svg#document\\"></use>\\n</svg>\\n\\n\\n</div>\\n<div  id=\\"inviteButton\\" class=\\"relative\\">\\n<div   class=\\" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 \\">\\n  <svg   class=\\"  order-1 w-[9px] h-[13px] ml-10 \\">\\n    <use  xlink:href=\\"./assets/icons/icon.svg#triangle\\"></use>\\n  </svg>\\n \\n  <div  class=\\"  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 \\">\\n  Invite Memeber</div>\\n</div>\\n<svg\\n\\nclass=\\"h-[2.5rem] w-[2.5rem] p-2  \\"\\n\\n>\\n<use xlink:href=\\"/assets/icons/icon.svg#document\\"></use>\\n</svg>\\n\\n\\n</div>\\n  \\n \\n</div>\\n</aside>";\nfunction InsertNavbar() {\n  var body = document.getElementsByTagName("body")[0];\n  var navcomp = document.createElement("nav");\n  navcomp.innerHTML = NavBar;\n  body.insertBefore(navcomp, body.firstChild);\n  var url = window.location.pathname;\n\n  // Extracting just the word "dashboard"\n  var urlaction = url.split("/")[1];\n  console.log("dashboard dev", url);\n  if (document.getElementById(urlaction)) {\n    document.getElementById(urlaction).classList.add("bg-[#718BD3]");\n    document.getElementById(urlaction).classList.add("shadow-lg");\n    document.getElementById(urlaction).classList.add("rounded-[10px]");\n  }\n}\nfunction NavbarHoverFunctionality() {\n  document.querySelectorAll(".sidebar-icon").forEach(function (item) {\n    console.log();\n    item.addEventListener("mouseover", function (event) {\n      console.log(item);\n      var tooltipText = event.target.getAttribute("data-tooltip");\n      var tooltip = document.querySelector(".tooltip");\n      tooltip.innerText = tooltipText;\n      tooltip.style.display = "block";\n      tooltip.style.top = event.pageY + "px";\n      tooltip.style.left = event.pageX + "px";\n    });\n    item.addEventListener("mouseout", function () {\n      var tooltip = document.querySelector(".tooltip");\n      tooltip.style.display = "none";\n    });\n  });\n}\n\n// <div class="tooltip">\n//   <div\n//     class="absolute top-1 -right-24 flex flex-row justify-center items-center gap-0"\n//   >\n//     <svg class="z-10 order-1 w-[9px] h-[13px]">\n//       <use xlink:href="./assets/icons/icon.svg#triangle"></use>\n//     </svg>\n\n//     <div\n//       class="tooltip order-2 bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2"\n//     >\n//       Dashboard\n//     </div>\n//   </div>\n// </div>\n\n//# sourceURL=webpack://ipvms-frontend/./dist/src/components/Navbar.js?'
        );

        /***/
      },

    /***/ "./dist/src/scripts/templatedoc.js":
      /*!*****************************************!*\
  !*** ./dist/src/scripts/templatedoc.js ***!
  \*****************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Navbar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Navbar.js */ "./dist/src/components/Navbar.js");\n// let response = {\n//     "success": true,\n//     "message": "all user are",\n//     "data": [\n//         {\n//             "fileName": "policy1",\n//             "category": \'RE\',\n//             "updatedBy": "rithvik",\n//             "updatedAt": "2024-01-22T00:29:54.119Z"\n//         },\n//         {\n//             "fileName": "policy2",\n//             "category": \'IT\',\n//             "updatedBy": "dev",\n//             "updatedAt": "2023-04-29T00:29:54.119Z"\n//         },\n//         {\n//             "fileName": "policy3",\n//             "category": \'ABC\',\n//             "updatedBy": "archit",\n//             "updatedAt": "2024-07-25T00:29:54.119Z"\n//         },\n//         {\n//             "fileName": "policy4",\n//             "category": \'CBR\',\n//             "updatedBy": "tapasvi",\n//             "updatedAt": "2014-02-20T00:29:54.119Z"\n//         },\n//         {\n//             "fileName": "policy5",\n//             "category": \'hr\',\n//             "updatedBy": "yash",\n//             "updatedAt": "2022-04-06T00:29:54.119Z"\n//         },\n//         {\n//             "fileName": "policy5",\n//             "category": \'hr\',\n//             "updatedBy": "siraj",\n//             "updatedAt": "2018-03-01T00:29:54.119Z"\n//         },\n//         {\n//             "fileName": "policy5",\n//             "category": \'hr\',\n//             "updatedBy": "sahil",\n//             "updatedAt": "2013-04-10T00:29:54.119Z"\n//         }\n\n\n\n//     ]\n// };\n(0,_components_Navbar_js__WEBPACK_IMPORTED_MODULE_0__.InsertNavbar)();\nvar signoutbutton = document.getElementById("signout");\nsignoutbutton.addEventListener("click", function () {\n  localStorage.removeItem("token");\n  window.location.href = VIEWS_CONSTANTS.LOGIN;\n});\nvar todashboard = document.getElementById("dashboard");\ntodashboard.addEventListener("click", function () {\n  window.location.href = "/dashboard";\n});\nvar toeditor = document.getElementById("editor");\ntoeditor.addEventListener("click", function () {\n  window.location.href = "/editor";\n});\nvar todocument = document.getElementById("document");\ntodocument.addEventListener("click", function () {\n  window.location.href = "/document";\n});\nvar toletters = document.getElementById("letters");\ntoletters.addEventListener("click", function () {\n  window.location.href = "/letters";\n});\nsignoutbutton.addEventListener("click", function () {\n  localStorage.removeItem("token");\n  window.location.href = "http://ipvms.exitest.com/login";\n});\n\n//# sourceURL=webpack://ipvms-frontend/./dist/src/scripts/templatedoc.js?'
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
    "./dist/src/scripts/templatedoc.js"
  );
  /******/
  /******/
})();
