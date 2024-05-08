// let response = {
//     "success": true,
//     "message": "all user are",
//     "data": [
//         {
//             "fileName": "policy1",
//             "category": 'RE',
//             "updatedBy": "rithvik",
//             "updatedAt": "2024-01-22T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy2",
//             "category": 'IT',
//             "updatedBy": "dev",
//             "updatedAt": "2023-04-29T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy3",
//             "category": 'ABC',
//             "updatedBy": "archit",
//             "updatedAt": "2024-07-25T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy4",
//             "category": 'CBR',
//             "updatedBy": "tapasvi",
//             "updatedAt": "2014-02-20T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "yash",
//             "updatedAt": "2022-04-06T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "siraj",
//             "updatedAt": "2018-03-01T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "sahil",
//             "updatedAt": "2013-04-10T00:29:54.119Z"
//         }

import { fetchCategories } from "../components/Categories.js";
import {
  InsertNavbar,
} from "../components/Navbar.js";
import { fetchTable } from "../components/Table.js";

InsertNavbar();
// var maxPages = 10;
// var pageSize = 5;
// var currentPage = 1;
// var totalItems;
// var title = "";
// var category = "";
// var siblingCount = 1;

document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode === 27) {
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
    let modals = document.getElementsByClassName("modal");
    Array.prototype.slice.call(modals).forEach((i) => {
      i.style.display = "none";
    });
  }
};

// const range = (start, end) => {
//   let length = end - start + 1;
//   let pages = Array.from({ length }, (_, i) => start + i);
//   return pages;
// };

// const handlePagination = async (item) => {
//   currentPage = item;
//   const paginationElement = document.getElementById("pagination-controller");
//   const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
//   paginationElement.innerHTML = "";
//   addPaginationElement(arr);
//   document.getElementById(item + "pagination").className =
//     "bg-indigo-800 text-white relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
//   await fetchDoc(currentPage - 1, pageSize);
// };

// const paginate = (totalItems, currentPage, pageSize, siblingCount) => {
//   const totalPageCount = Math.ceil(totalItems / pageSize);
//   console.log(totalPageCount, maxPages);
//   const totalPageNumbers = siblingCount + 5;
//   //first last current page  2 dots

//   // Case 1  totaItems<maxPages
//   if (totalPageCount <= maxPages) {
//     return range(1, totalPageCount);
//   }
//   // Case 2
//   //left  and right sibling index
//   const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
//   const rightSiblingIndex = Math.min(
//     totalPageCount,
//     currentPage + siblingCount
//   );
//   // are there dots
//   const shouldShowLeftDots = leftSiblingIndex > 2;
//   const shouldShowRightDots = totalPageCount - rightSiblingIndex > 2;
//   const firstPageIndex = 1;
//   const lastPageIndex = totalPageCount;
//   //No left dots
//   if (!shouldShowLeftDots && shouldShowRightDots) {
//     //1  sibling currentpage  sibling  .. last page
//     let leftItemCount = 3 + 2 * siblingCount;
//     let leftRange = range(1, leftItemCount);
//     return [...leftRange, "DOTS", totalPageCount];
//   }
//   if (shouldShowLeftDots && !shouldShowRightDots) {
//     //1  sibling currentpage  sibling  .. last page
//     let rightItemCount = 3 + 2 * siblingCount;
//     let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
//     return [firstPageIndex, "DOTS", ...rightRange];
//   }
//   if (shouldShowLeftDots && shouldShowRightDots) {
//     let middleRange = range(leftSiblingIndex, rightSiblingIndex);
//     return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
//   }
// };
// const addDocPageStatus = () => {
//   const startItemIndex = (currentPage - 1) * pageSize + 1;
//   const endItemIndex = Math.min(currentPage * pageSize, totalItems);
//   const totalResults = totalItems;

//   document.getElementById("doc-status").innerHTML = "";
//   document.getElementById(
//     "doc-status"
//   ).innerHTML += `<p class="text-sm text-gray-700">
//                 Showing
//                 <span class="font-medium">${startItemIndex}</span>
//                 to
//                 <span class="font-medium">${endItemIndex}</span>
//                 of
//                 <span class="font-medium">${totalResults}</span> results
//   </p>`;
// };
// const addPaginationElement = (arr) => {
//   const paginationElement = document.getElementById("pagination-controller");
//   arr.forEach((item) => {
//     if (item === "DOTS") {
//       paginationElement.innerHTML += `<h1 className="pagination-item dots no-decoration">&#8230;</h1>`;
//     } else {
//       paginationElement.innerHTML += `<button id="${item}pagination" onClick="handlePagination(${item})"  aria-current="page" class="relative z-10 inline-flex items-center text-black px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">${item}</a>`;
//     }
//   });
//   addDocPageStatus();
// };


// const search = async () => {
//   const searchText = document.getElementById("search").value;
//   console.log("search func");
//   const response = await fetch(
//     "http://localhost:5001/api/globalsearch/search",
//     {
//       method: "POST",
//       // mode: "no-cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         searchString: searchText,
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response from the backend
//       console.log(data);
//       if (data.success == false) {
//         const parentElement = document.getElementById("tbody");
//         parentElement.innerHTML = "No data found";
//       } else {
//         totalItems = data?.count;
//         console.log(totalItems);
//         removepagination();
//         const parentElement = document.getElementById("tbody");
//         const paginationElement = document.getElementById(
//           "pagination-controller"
//         );
//         const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
//         console.log(arr);
//         addPaginationElement(arr);
//         document.getElementById(1 + "pagination").className =
//           "bg-indigo-800 text-white relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
//         parentElement.innerHTML = "";
//         data.data.map((item) => {
//           console.log(item);
//           parentElement.innerHTML += docCard(
//             item.title || item.document_title || "demo",
//             item.category,
//             item.created_by,
//             item.created_at,
//             item.id
//           );
//           // parentElement.innerHTML += docxModal(item.id);
//           // document
//           //   .getElementById(item.id)
//           //   .querySelector("#render-docs").innerHTML = item.data;
//         });
//       }
//     });
// };


// const removepagination = () => {
//   const paginationElement = document.getElementById("pagination-controller");
//   paginationElement.innerHTML = "";
// };
// document.getElementById("search").addEventListener("keydown", function (event) {
//   if (event.keyCode === 13) {
//     search();
//   }
// });

const tableType = {
  name: '',
  category: ''
};

document.addEventListener("DOMContentLoaded", async () => {
  // console.log("f");
  fetchTable(tableType);
  // console.log("f");
  fetchCategories();

  // const paginationElement = document.getElementById("pagination-controller");
  // const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
  // console.log(arr);
  // addPaginationElement(arr);
  // document.getElementById(1 + "pagination").className =
  //   "bg-indigo-800 text-white relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
});

// const handleNextPage = async () => {
//   currentPage++;

//   if (currentPage > maxPages) {
//     currentPage = maxPages;
//     return;
//   }
//   handlePagination(currentPage);
// };
// const handlePrevPage = async () => {
//   currentPage--;
//   if (currentPage < 1) {
//     currentPage = 1;
//     return;
//   }
//   handlePagination(currentPage);
// };

// const handleFilter = async () => {
//   const inpTitle = document.getElementById("doctitle");
//   title = inpTitle.value;
//   const inpcategory = document.getElementById("doccategory");
//   category = inpcategory.value;
//   console.log(category, title);
//   fetchDoc(currentPage - 1, pageSize);
// };

const signoutbutton = document.getElementById("signout");
signoutbutton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:5555/login";
});
const todashboard = document.getElementById("dashboard");
todashboard.addEventListener("click", () => {
  window.location.href = "/dashboard";
});
const toeditor = document.getElementById("editor");
toeditor.addEventListener("click", () => {
  window.location.href = "/editor";
});
const todocument = document.getElementById("document");
todocument.addEventListener("click", () => {
  window.location.href = "/document";
});
const toletters = document.getElementById("letters");
toletters.addEventListener("click", () => {
  window.location.href = "/letters";
});
signoutbutton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = VIEWS_CONSTANTS.LOGIN;
});

// document.getElementById("npage").addEventListener("click", handleNextPage);
// document.getElementById("ppage").addEventListener("click", handlePrevPage);
// document.getElementById("filter").addEventListener("click", handleFilter);
