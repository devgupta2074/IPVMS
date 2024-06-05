import { CreatePolicy } from "../api/createpolicy.js";
import { GetAdminList } from "../api/getAdminLIst.js";
import { GetAllCategory } from "../api/getAllCategories.js";
import { SetDocumentToApprove } from "../api/setDocumenttoApprove.js";
import { DELETE_LETTER } from "../api/deleteLetterModal.js";

import { API_CONSTANTS, style, URL_CONSTANTS } from "../utils/constants.js";

var ModaltoDeleteId;
var templateId;
var recipientId;
var ipvmsuserId;
var recipientEmail;
var recipientName;
var letter_id;


let maxPages = 10;
let pageSize = 5;
let currentPage = 1;
let totalItems;
let title = "";
let category = "";
let siblingCount = 1;
let totalPageCount;

document.addEventListener("DOMContentLoaded", () => {
  ipvmsuserId = localStorage.getItem("userId");
});

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export const fetchTable = async () => {
  const apiLink =
    API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getLetters?status=DRAFT&page=${currentPage - 1}&size=${pageSize}`;

  const response = await fetch(apiLink, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success == false) {
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "No data found";
        maxPages = 10;
        pageSize = 7;
        currentPage = 1;
        totalItems = 0;
        siblingCount = 1;

        addPagination(currentPage);
      } else {
        console.log("jhishi", data.data);
        totalItems = data.data[0]?.total_count;
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "";
        const startItemIndex = (currentPage - 1) * pageSize + 1;

        data.data.map((item, index) => {
          index = index + startItemIndex;
          console.log(item);
          parentElement.innerHTML += docCard(
            index,
            item.id,
            item.employee_name,
            item.template_name,
            item.category,
            item.created_at,
            item.created_by,
            item.rname
          );
        });
        //
        addPagination(currentPage);
      }
    });
};

const docCard = (
  indx,
  id,
  ename,
  tname,
  category,
  created_at,
  created_by,
  rname,
  html_data
) => {
  let date = new Date(created_at);
  date = date.toLocaleDateString("en-GB");
  created_at = date;

  if (ename !== "New User") {
    return `
      
      <tr
      class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in last:rounded-b-md"
    >
      <td class="w-14">${indx}</td>
      <td class="w-32">${ename}</td>
      <td class="w-52">${truncateString(tname, 20)}</td>
      <td class="w-28">${category}</td>
      <td class="w-28">${created_at}</td>
      <td class="w-28">${created_by}</td>
      <td class="w-28">${created_at}</td>
      <td class="w-28">
        <div class="flex gap-5 items-center">
          <button type="button" onclick="openLetterFile(${id})">
            <svg id="view" class="h-6 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#view"
              ></use>
            </svg>
          </button>
          <button type="button" onClick="openEditor(${id})">
          <svg id="view" class="h-6 w-6">
          <use
            xlink:href="/assets/icons/icon.svg#edit"
          ></use>
        </svg>
        </button>
        <button type="button" class=" flex justify-center items-center" onClick="deleteLetter(${id})">
        <svg class=" mb-2" width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 5.25H6.125V10.5H5.25V5.25Z" fill="#5D5D5D"/>
<path d="M7.875 5.25H8.75V10.5H7.875V5.25Z" fill="#5D5D5D"/>
<path d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z" fill="#5D5D5D"/>
<path d="M5.25 0.875H8.75V1.75H5.25V0.875Z" fill="#5D5D5D"/>
</svg>
      </button>
        </div>
        <div id="letterdeletemodal">
    </div>
      </td>
    </tr>

          
          `;
  } else {
    return `
    <tr
    class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in last:rounded-b-md"
  >
    <td class="w-14">${indx}</td>
    <td class="w-32">${rname}</td>
    <td class="w-52">${truncateString(tname, 20)}</td>
    <td class="w-28">${category}</td>
    <td class="w-28">${created_at}</td>
    <td class="w-28">${created_by}</td>
    <td class="w-28">${created_at}</td>
    <td class="w-28">
      <div class="flex gap-5">
        <button type="button" onclick="openLetterFile(${id})">
          <svg id="view" class="h-6 w-6">
            <use
              xlink:href="/assets/icons/icon.svg#view"
            ></use>
          </svg>
        </button>
        <button type="button" onClick="openEditor(${id})">
        <svg id="view" class="h-6 w-6">
        <use
          xlink:href="/assets/icons/icon.svg#edit"
        ></use>
      </svg>
      </button>
      <button type="button" class="flex justify-center items-center" onClick="deleteLetter(${id})">
      <svg class=" mb-2" width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 5.25H6.125V10.5H5.25V5.25Z" fill="#5D5D5D"/>
<path d="M7.875 5.25H8.75V10.5H7.875V5.25Z" fill="#5D5D5D"/>
<path d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z" fill="#5D5D5D"/>
<path d="M5.25 0.875H8.75V1.75H5.25V0.875Z" fill="#5D5D5D"/>
</svg>
    </button>
    <div id="letterdeletemodal">
    </div>
        
      </div>
    </td>
  </tr>`;
  }
  //   .toLocaleDateString('en-GB')
};


function addSortFeature() {
  const sortButtons = document.querySelectorAll(".sort");
  sortButtons.forEach((e, index) => {
    e.addEventListener("click", () => {
      // console.log(index);
      window.event.preventDefault();
      sortTable(index, 0);
    });
  });
}
window.deleteLetter = function (id) {
  ModaltoDeleteId = id;
  const deleteModalHtml = `
  <div id="deleteModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
  <div class="relative p-4 w-full max-w-md h-full md:h-auto">
  <!-- Modal content -->
  <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
      <button type="button" id="cancelButton" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close modal</span>
      </button>
      <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
      <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
      <div class="flex justify-center items-center space-x-4">
          <button id="cancelButton1" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
               Cancel
          </button>
          <button type="submit" id="confirmButton" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
              Yes, I'm sure
          </button>
      </div>
  </div> `;

  document.getElementById("letterdeletemodal").innerHTML = deleteModalHtml;
  const cancelButton = document.getElementById("cancelButton");
  const cancelButton1 = document.getElementById("cancelButton1");
  const confirmButton = document.getElementById("confirmButton");
  cancelButton.addEventListener("click", () => {
    document.getElementById("letterdeletemodal").innerHTML = "";
  });
  cancelButton1.addEventListener("click", () => {
    document.getElementById("letterdeletemodal").innerHTML = "";
  });
  confirmButton.addEventListener("click", async () => {
    // Add you1r delete logic here
    const result = await DELETE_LETTER(ModaltoDeleteId);
    console.log(result);
    if (result.success) {
      Toastify({
        text: "Letter deleted success",
        duration: 3000,
        newWindow: true,
        className: "text-black",
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "white",
        },
      }).showToast();
      setTimeout(() => {
        fetchTable();
        document.getElementById("letterdeletemodal").innerHTML = "";
      }, 1000);
    }

    //delete ModaldeleteModal.classList.add("hidden");
  });
  const deleteModal = document.getElementById("deleteModal");
  window.addEventListener("click", (event) => {
    // console.log("event ", event.target);
    if (event.target === deleteModal) {
      document.getElementById("letterdeletemodal").innerHTML = "";
    }

    // setTimeout(() => {
    //   location.reload();
    // }, 2000);
  });
};

// View Modal

function addModalOpenCloseFeature() {
  window.openModal = async function (modalId) {
    console.log(modalId, "modal id");
    document.getElementById(modalId).style.display = "block";
    document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
    window.addEventListener("beforeprint", (event) => {
      console.log("Before print");
      const contents = document
        .getElementById(modalId)
        .getElementsByClassName("docx-wrapper")[0].outerHTML;
      document.getElementById(modalId).innerHTML = contents;
    });
    await fetchAndRenderDoc(modalId);
  };

  window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = "none";
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
  };
}


// Pagination

function addPagination(item) {
  const paginationElement = document.getElementById("pagination-controller");
  const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
  paginationElement.innerHTML = "";
  console.log("............................................", arr);
  addPaginationElement(arr);
  const dot = document.getElementById(
    item + "pagination"
  ).className = `bg-white text-dodger-blue-500 rounded-md border-[1px] border-dodger-blue-500 relative z-10 inline-flex items-center  font-bold px-3  text-sm  focus:z-20 h-8`;
  addPrevAndNextfeature();
  handlePaginationOnClick();
}

const handleNextPage = async () => {
  console.log('ssssssssss', currentPage, maxPages);

  if (currentPage < totalPageCount) {
    currentPage++;
    console.log('ssssssssss', currentPage, maxPages, totalPageCount);

    handlePagination(currentPage);
  }
};
const handlePrevPage = async () => {
  currentPage--;
  if (currentPage < 1) {
    currentPage = 1;
    return;
  }
  handlePagination(currentPage);
};

const removepagination = () => {
  const paginationElement = document.getElementById("pagination-controller");
  paginationElement.innerHTML = "";
};

const range = (start, end) => {
  let length = end - start + 1;
  console.log(length);
  let pages = Array.from({ length }, (_, i) => start + i);
  console.log(pages);
  return pages;
};

const handlePagination = async (item) => {
  currentPage = item;
  addPagination(currentPage);
  // console.log("deeevv", tableType);
  await fetchTable();
};

const paginate = (totalItems, currentPage, pageSize, siblingCount) => {
  console.log(
    "totI",
    totalItems,
    "currentP",
    currentPage,
    "pagesize",
    pageSize,
    "sibc",
    siblingCount,
    "totalpage",
    totalPageCount
  );
  if (totalItems === 0) {
    return [1];
  }
  totalPageCount = Math.ceil(totalItems / pageSize);
  console.log(totalPageCount, maxPages);
  const totalPageNumbers = siblingCount + 5;
  //first last current page  2 dots

  // Case 1  totaItems<maxPages
  if (totalPageCount <= maxPages) {
    return range(1, totalPageCount);
  }
  // Case 2
  //left  and right sibling index
  const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
  const rightSiblingIndex = Math.min(
    totalPageCount,
    currentPage + siblingCount
  );
  // are there dots
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = totalPageCount - rightSiblingIndex > 2;
  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;
  //No left dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    //1  sibling currentpage  sibling  .. last page
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);
    return [...leftRange, "DOTS", totalPageCount];
  }
  if (shouldShowLeftDots && !shouldShowRightDots) {
    //1  sibling currentpage  sibling  .. last page
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    return [firstPageIndex, "DOTS", ...rightRange];
  }
  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
  }
};


const addDocPageStatus = () => {
  const startItemIndex = (currentPage - 1) * pageSize + 1;
  const endItemIndex = Math.min(currentPage * pageSize, totalItems);
  const totalResults = totalItems;

  document.getElementById("doc-status").innerHTML = "";
  document.getElementById(
    "doc-status"
  ).innerHTML += `<p class="text-sm text-gray-700 font-roboto">
                Showing
                <span class="font-medium font-roboto">${startItemIndex}</span>
                to
                <span class="font-medium font-roboto">${endItemIndex}</span>
                of
                <span class="font-medium font-roboto">${totalResults}</span> results
  </p>`;
};
const addPaginationElement = (arr) => {
  const paginationElement = document.getElementById("pagination-controller");
  arr.forEach((item) => {
    if (item === "DOTS") {
      paginationElement.innerHTML += `<h1 className="pagination-item dots no-decoration">&#8230;</h1>`;
    } else {
      paginationElement.innerHTML += `<button id="${item}pagination" onClick="handlePagination(${item})"  aria-current="page" class="relative bg-white h-8 font-bold rounded-md border-[1px] z-10 inline-flex items-center px-3 text-sm hover:bg-gray-50">${item}</a>`;
    }
  });
  addDocPageStatus();
};

function addPrevAndNextfeature() {
  document.getElementById("npage").addEventListener("click", handleNextPage);
  document.getElementById("ppage").addEventListener("click", handlePrevPage);
}

function handlePaginationOnClick() {
  const paginationButtons = document.querySelectorAll(
    "div#pagination_controller > button"
  );

  window.handlePagination = async function (Id) {
    handlePagination(Id);
  };
}


export const resetVariables = () => {
  maxPages = 10;
  pageSize = 6;
  currentPage = 1;
  totalItems;
  title = "";
  category = "";
  siblingCount = 1;
};

export async function addTable1() {
  const tableDiv = document.getElementById("insert-table");
  tableDiv.innerHTML = "";

  // console.log(tableDiv);

  tableDiv.innerHTML = `<table class="w-full mt-10 mb-5 text-left text-sm text-gray-500 bg-white font-roboto rounded-md">
    <thead class="bg-ship-cove-200 py-3 text-xs capitalize text-[#333333] flex rounded-t-md">
      <tr class="flex justify-around w-full">
        <th scope="col" class="w-14 font-normal">ID</th>
        <th scope="col" class="w-52">
          <div class="flex items-center font-normal">
           Employee Name
            <a href="#" class="sort" name="true">
              <svg id="sorticon" class="pl-2 h-4 w-6">
                <use
                  xlink:href="/assets/icons/icon.svg#sorticon"
                ></use>
              </svg>
            </a>
          </div>
        </th>
        <th scope="col" class="w-28">
          <div class="flex items-center font-normal">
            Template
            <a href="#" class="sort" name="true">
              <svg id="sorticon" class="pl-2 h-4 w-6">
                <use
                  xlink:href="/assets/icons/icon.svg#sorticon"
                ></use>
              </svg>
            </a>
          </div>
        </th>
        <th scope="col" class="w-28">
          <div class="flex items-center font-normal">
            Category
            <a href="#" class="sort" name="true">
              <svg id="sorticon" class="px-2 h-4 w-6">
                <use
                  xlink:href="/assets/icons/icon.svg#sorticon"
                ></use>
              </svg>
            </a>
          </div>
        </th>
        <th scope="col" class="w-28">
          <div class="flex items-center font-normal">
            Created At
            <a href="#" class="sort" name="true">
              <svg id="sorticon" class="px-2 h-4 w-6">
                <use
                  xlink:href="/assets/icons/icon.svg#sorticon"
                ></use>
              </svg>
            </a>
          </div>
        </th>
        <th scope="col" class="w-28">
          <div class="flex items-center font-normal">
            Generated By
            <a href="#" class="sort" name="true">
              <svg id="sorticon" class="px-2 h-4 w-6">
                <use
                  xlink:href="/assets/icons/icon.svg#sorticon"
                ></use>
              </svg>
            </a>
          </div>
        </th>
        <th scope="col" class="w-28">
          <div class="flex items-center font-normal">
            Generated On
            <a href="#" >
              <svg id="sorticon" class="px-2 h-4 w-6">
                <use
                  xlink:href="/assets/icons/icon.svg#sorticon"
                ></use>
              </svg>
            </a>
          </div>
        </th>
        <th scope="col" class="w-28 font-normal">Action</th>
      </tr>
    </thead>  
    <tbody id="tbody">
    
    </tbody>
  </table>
        `;
  await fetchTable();
  addSortFeature();
  addModalOpenCloseFeature();
}

export function getdate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-based
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  return date;
}

export const sortTable = (col) => {
  // const table = document.getElementById('myTable');
  const tbody = document.getElementById("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const sort_th = document.querySelectorAll(".sort");
  const order = sort_th[col].getAttribute("name") === "true" ? true : false;
  // console.log(order, col);

  if (order) {
    sort_th[col].setAttribute("name", `${!order}`);

    if (col === 2 || col === 4) {
      rows.sort((rowA, rowB) => {
        let cellA = rowA.querySelectorAll("td")[col + 1].textContent.trim();
        let cellB = rowB.querySelectorAll("td")[col + 1].textContent.trim();
        cellA = getdate(cellA);
        cellB = getdate(cellB);
        // console.log(cellA);
        return cellA - cellB;
      });
    } else {
      rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[col + 1].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[col + 1].textContent.trim();
        return cellA.localeCompare(cellB, "en", { numeric: true });
      });
    }
  } else {
    sort_th[col].setAttribute("name", `${!order}`);

    if (col === 2 || col === 4) {
      rows.sort((rowA, rowB) => {
        let cellA = rowA.querySelectorAll("td")[col + 1].textContent.trim();
        let cellB = rowB.querySelectorAll("td")[col + 1].textContent.trim();
        cellA = getdate(cellA);
        cellB = getdate(cellB);
        // console.log(cellA);
        return cellB - cellA;
      });
    } else {
      rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[col + 1].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[col + 1].textContent.trim();
        return cellB.localeCompare(cellA, "en", { numeric: true });
      });
    }
  }

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  rows.forEach((row) => {
    tbody.appendChild(row);
  });
};

function addEditorOpenCloseFeature() {
  window.openEditor = async function (modalId) {
    letter_id = modalId;
    document.getElementById("version-area").classList.add("hidden");
    if (document.getElementById("letters-tab")) {
      document.getElementById("letters-tab").classList.add("hidden");
    }

    document.getElementById("button-header").innerHTML = `
    <button
type="button"
id="sendButton"              
class="hover:cursor-pointer bg-blue-500  border-2 border-[#EAEAEA] text-white  font-medium rounded-full text-sm px-5 py-2.5 text-center "
>
Send 
</button>
<!-- modal to send letter --> 
<div id="confirmModal" class=" z-[1000000] hidden  fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-end pr-20">
  <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
      <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Confirmation</h2>
          <span class="close text-gray-500 text-2xl cursor-pointer">&times;</span>
      </div>
      <p class="mb-5">Do you want to send the letter?</p>
      <label class="inline-flex items-center mb-4">
          <input type="checkbox" id="signCheckbox" class="form-checkbox h-5 w-5 text-blue-600">
          <span class="ml-2 text-gray-700">Should be signed</span>
      </label>
      <p id="signMessage" class="text-blue-600 mb-4 hidden">The letter will be sent to Sign Swift for signature. Please follow up on their website.</p>
      <p id="loginError" class="text-red-600 mb-4 hidden">User not found in Sign Swift. Please <a href="https://ex-sign-swift.vercel.app" class="text-blue-600 underline">log in</a>.</p>
      <p id="uploadError" class="text-red-600 mb-4 hidden">An error occurred while uploading the file. Please try again.</p>
      <p id="uploadSuccess" class="text-green-600 mb-4 hidden">Success</p>
      <div class="flex justify-end space-x-4">
          <button id="sendLetter" class="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
          <button id="cancelSend" class="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
      </div>
  </div>
</div>
<button
id="saveasdraft"
type="button"
class="hover:cursor-pointer text-white bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ">
Save as Draft
</button>`;
    if (modalId == 0) {
      document.getElementById("docx-wrapper-1").contentEditable = true;
      modalId = 237;

      // let categoryElement = `
      //   <select id="category" class="w-56 flex justify-center p-2  placeholder:text-right items-center  h-10 border border-[#5D5D5D33]  text-xs rounded placeholder:text-sm placeholder:text-[#5D5D5D4D] placeholder:opacity-30  placeholder:font-normal">
      //     <option  class="flex justify-center items-center" selected>Choose Category</option>
      //   `;
    }
    localStorage.setItem("modalId", modalId);

    let htmljson;

    // document.getElementById("policy-detail").classList.add("hidden");
    // document.getElementById("policy-table").classList.add("hidden");
    // document.getElementById("pagination-area").classList.add("hidden");

    document.getElementById("extralarge-modal").classList.remove("hidden");
    document.getElementById("area").classList.add("hidden");

    const response2 = await fetch(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getLetter/${modalId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("modalId", modalId);
        if (data.data.title !== "emptydocx.docx") {
          document.getElementById("doc_title").textContent = data.data.title;
        }

        // fetchVersionsDateWise(modalId);
        // Handle the response from the backend
        console.log(data.data, "fffffkbnjb ");
        document.getElementById("docx-wrapper-1").innerHTML =
          data.data.html_data;
        recipientEmail = data?.data?.recipient_email;
        recipientId = data?.data?.recipientid;
        templateId = data?.data?.template_id;
        recipientName = data?.data?.recipient_name;
        letter_id = data?.data?.letter_id;
        console.log(recipientEmail, recipientName, recipientId, templateId);

        console.log("ddddddddddddddddddddddddd");
      });
    // const container = document.getElementsByClassName("docx-wrapper")[0];
    // container.id = "docx-wrapper";
    onEditorOpen();
  };
  window.closeEditor = function () {
    document.getElementById("extralarge-modal").classList.add("hidden");
    if (document.getElementById("letters-tab")) {
      document.getElementById("letters-tab").classList.remove("hidden");
      document.getElementById("area").classList.remove("hidden");
    }
  };
}

addEditorOpenCloseFeature();
const fetchAndRenderLetter = async (modalId) => {
  const response = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getLetter/${modalId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const docData = data.data.html_data;
      document
        .getElementById(modalId)
        .querySelector("#docx-wrapper").innerHTML = "";
      document
        .getElementById(modalId)
        .querySelector("#docx-wrapper").innerHTML = docData;

      const modal = document.getElementById(modalId);
      window.addEventListener("click", function (event) {
        console.log(event.target.id, "clcikde", modalId);
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    });
};

function addModalOpenCloseFeatureLetter() {
  window.openLetterFile = async function (modalId) {
    console.log(modalId, "modal id");
    const newel = document.createElement("div");
    newel.innerHTML = ` 
   
    <div id=${modalId} >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20  sm:block sm:p-0 ">
      <!-- Background overlay -->
      <div  class="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity backdrop " aria-hidden="true"></div>
  
      <!-- Modal content -->
      <div class="fixed  inset-0  w-3/5 h-full m-auto  bg-link-water-100 rounded-lg shadow-xl p-6 transform transition-all sm:my-8 overflow-y-scroll">
       
  
        <div id="printThis" class="  relative ">
        <div class="relative ">
        <button onclick="closeLetter(${modalId})" type="button" class= " absolute top-0 right-0 p-1.5 m-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  ml-auto inline-flex items-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
        
          <div id="render-docs" class="  ">
         
          ${style}
          <div class='shadow-2xl bg-white' id='docx-wrapper'>
          </div>
          
            </div>
          
        
          
        </div>
      </div>
    </div>
  </div>`;
    document.getElementsByTagName("body")[0].appendChild(newel);

    document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
    window.addEventListener("beforeprint", (event) => {
      console.log("Before print");
      const contents = document
        .getElementById(modalId)
        .getElementsByClassName("docx-wrapper")[0].outerHTML;
      document.getElementById(modalId).innerHTML = contents;
    });
    window.addEventListener("click", function (event) {
      console.log(event, "clcikde", modalId);

      if (event.target.classList.contains("backdrop")) {
        window.closeModal(modalId);
      }
    });

    await fetchAndRenderLetter(modalId);
  };

  window.closeLetterFile = function (modalId) {
    document.getElementById(modalId).style.display = "none";
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
  };
}

addModalOpenCloseFeatureLetter();

// send and save as draft icons
const onEditorOpen = () => {
  console.log(document.getElementById("saveasdraft"));
  if (document.getElementById("saveasdraft")) {
    document
      .getElementById("saveasdraft")
      .addEventListener("click", async () => {
        const res = await saveAsDraft();
        setTimeout(() => {
          window.location.href = URL_CONSTANTS.FRONTEND_BASE_URL + "/letters";
        }, 3000);
      });
  }

  const saveAsDraft = async () => {
    const htmlData1 = document.querySelector("#docx-wrapper-1").innerHTML;
    // console.log("html data is", htmlData1);
    try {
      console.log("name", recipientName);
      const res = await axios.post(
        API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/saveLetter",
        {
          html_data: htmlData1,
          templateId: templateId,
          recipientId: recipientId,
          createdby: ipvmsuserId,
          letter_id: letter_id,
          email: recipientEmail,
          name: recipientName,
        }
      );
      if (res) {
        Toastify({
          text: "Letter save as draft success",
          duration: 3000,
          newWindow: true,
          className: "text-black",
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "white",
          },
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Some error occured",
        duration: 3000,
        newWindow: true,
        className: "text-red",
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "white",
        },
      }).showToast();
    }
  };
  const handleGeneratePdf = async () => {
    showLoading();
    var element = document.getElementById("docx-wrapper-1");
    var opt = {
      margin: 0,
      filename: "Contrato.pdf",
      image: {
        type: "",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: "avoid-all", after: "section" },
    };
    const pdfBlob = await html2pdf().from(element).output("blob");
    const formData = new FormData();

    // console.log(email);
    const fileName = "pdfsend" + Date.now() + ".pdf";
    formData.append("file", pdfBlob, fileName);
    console.log("rrrrecepirnt id is", recipientId);
    formData.append("userId", recipientId);
    formData.append("templateId", templateId);
    formData.append("email", "tapasviarora2002@gmail.com");
    formData.append("html_data", element.innerHTML);
    formData.append("letter_id", letter_id);
    console.log(ipvmsuserId, "actorrrrrrrrrrr");
    formData.append("ipvms_userId", ipvmsuserId);
    console.log("letter id is", letter_id);
    try {
      const response = await axios.post(
        API_CONSTANTS.BACKEND_BASE_URL + "/api/file/uploadLetter",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Toastify({
        text: "Letter send succesfully",
        duration: 3000,
        newWindow: true,
        className: "text-black",
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "white",
        },
      }).showToast();
      if (response.status == 200) {
        setTimeout(() => {
          window.location.href = URL_CONSTANTS.FRONTEND_BASE_URL + "/letters";
        }, 1000);
      }
    } catch (error) {
      Toastify({
        text: "Some error occured",
        duration: 3000,
        newWindow: true,
        className: "text-black",
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "white",
        },
      }).showToast();
      setTimeout(() => {
        window.location.href = URL_CONSTANTS.FRONTEND_BASE_URL + "/letters";
      }, 2000);
    } finally {
      removeLoading();
    }
  };

  //loader
  const showLoading = () => {
    const loading = document.createElement("div");
    loading.id = "loadingicon";
    loading.innerHTML = `<div id="loading"  >
  <div id="overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.8); z-index: 1000;">
  <div class="flex gap-2 justify-center items-center h-screen">
  <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
  <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
  <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
  </div>
  </div>  
  </div>`;
    document.body.appendChild(loading);
  };
  const removeLoading = () => {
    const loadingElement = document.getElementById("loadingicon");
    if (loadingElement) {
      loadingElement.remove();
    }
  };
  var shouldBeSigned = false;
  const handleSignSwiftCall = async () => {
    showLoading();
    var element = document.getElementById("docx-wrapper-1");
    var opt = {
      margin: 0,
      filename: "Contrato.pdf",
      image: {
        type: "",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: "avoid-all", after: "section" },
    };
    let letterId;
    const pdfBlob = await html2pdf().from(element).output("blob");
    const formData = new FormData();
    const fileName = "pdfFile" + Date.now() + ".pdf";
    formData.append("file", pdfBlob, fileName);
    const fileUpload = await axios.post(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/upload/letterpdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const ShareLink = fileUpload.data.url;
    const email = localStorage.getItem("email");
    if (fileUpload) {
      fetch("https://ex-sign-swift.vercel.app/api/users/findUser", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data is", data);
          removeLoading();
          if (data.status == 500) {
            console.log("first log in sign swift");
            Toastify({
              text: "Make a account in signwift first",
              duration: 3000,
              newWindow: true,
              className: "text-black",
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "white",
              },
            }).showToast();
            document.getElementById("loginError").classList.remove("hidden");
          } else {
            console.log("data", data);
            const signSwiftId = data.user.customerId;
            fetch(
              "https://ex-sign-swift.vercel.app/api/document/uploadDocument",
              {
                method: "POST",
                body: JSON.stringify({
                  userId: data.user.customerId,
                  ShareLink: ShareLink,
                  title: title,
                }),
                mode: "cors",
              }
            )
              .then((response) => response.json())
              .then(async (data) => {
                removeLoading();
                const docId = data.document.id;
                if (docId) {
                  //draft->pending
                  const data1 = await axios.post(
                    API_CONSTANTS.BACKEND_BASE_URL_PROD +
                    "/api/file/upload/updateLetterStatus",
                    {
                      letterId: letter_id,
                      htmlData: element.innerHTML,
                      recipientId: recipientId,
                      createdBy: ipvmsuserId,
                      templateId: templateId,
                      email: recipientEmail,
                      name: recipientName,
                      fileName: fileName,
                      swift_id: docId,
                    }
                  );
                  console.log("data is data1", data1);
                  if (data1?.data?.success) {
                    console.log("upload doc  is", data);
                    //error upload doc
                    if (data.status !== 201) {
                      document
                        .getElementById("uploadError")
                        .classList.remove("hidden");
                    } else {
                      console.log("success");
                      document
                        .getElementById("uploadSuccess")
                        .classList.remove("hidden");
                      Toastify({
                        text: "Redirecting to sign swift",
                        duration: 3000,
                        newWindow: true,
                        className: "text-black",
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                          background: "white",
                        },
                      }).showToast();
                      setTimeout(() => {
                        window.location.href = `https://ex-sign-swift.vercel.app/user/${signSwiftId}/document/${docId}/step1`;
                      }, 2000);
                    }
                  }
                }
              });
          }
        });
    }
  };

  document.getElementById("sendButton").addEventListener("click", function () {
    // document.getElementById("submitBtn").click();
    const modal = document.getElementById("confirmModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  document
    .getElementsByClassName("close")[0]
    .addEventListener("click", function () {
      const modal = document.getElementById("confirmModal");
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.getElementById("loginError").classList.add("hidden");
      document.getElementById("uploadError").classList.add("hidden");

      const signMessage = document.getElementById("signMessage");
      signMessage.classList.remove("hidden");
    });

  document.getElementById("cancelSend").addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("uploadError").classList.add("hidden");
    document.getElementById("successError").classList.add("hidden");
    const signMessage = document.getElementById("signMessage");
    signMessage.classList.remove("hidden");
  });
  document.getElementById("sendLetter").addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");

    if (!shouldBeSigned) {
      handleGeneratePdf();
    } else {
      handleSignSwiftCall();
    }
  });
  document
    .getElementById("signCheckbox")
    .addEventListener("change", function () {
      const signMessage = document.getElementById("signMessage");

      if (this.checked) {
        signMessage.classList.remove("hidden");
        shouldBeSigned = true;
      } else {
        signMessage.classList.add("hidden");
        shouldBeSigned = false;
      }
    });

  // pdf generate function

  window.onclick = function (event) {
    const modal = document.getElementById("confirmModal");
    if (event.target == modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.getElementById("loginError").classList.add("hidden");
      document.getElementById("uploadError").classList.add("hidden");

      const signMessage = document.getElementById("signMessage");
      signMessage.classList.remove("hidden");
    }
  };
};
