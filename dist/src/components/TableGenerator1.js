import { CreatePolicy } from "../api/createpolicy.js";
import { GetAdminList } from "../api/getAdminLIst.js";
import { GetAllCategory } from "../api/getAllCategories.js";
import { SetDocumentToApprove } from "../api/setDocumenttoApprove.js";
import { DELETE_LETTER } from "../api/deleteLetterModal.js";

import { style } from "../utils/constants.js";

var ModaltoDeleteId;

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export const fetchTable = async () => {
  const apiLink = "http://localhost:5001/api/file/getLetters?status=DRAFT";

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
      } else {
        console.log("jhishi", data.data);
        totalItems = data.data[0]?.total_count;
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "";

        data.data.map((item, index) => {
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
        //addPagination()
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
      <td class="w-14">${indx + 1}</td>
      <td class="w-52">${ename}</2td>
      <td class="w-28">${truncateString(tname, 10)}</td>
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
        <button type="button" class="mb-3 flex justify-center items-center" onClick="deleteLetter(${id})">
        <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <td class="w-14">${indx + 1}</td>
    <td class="w-52">${rname}</2td>
    <td class="w-28">${truncateString(tname, 10)}</td>
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
      <button type="button" class="flex justify-center items-center mb-3" onClick="deleteLetter(${id})">
      <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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

let maxPages = 10;
let pageSize = 6;
let currentPage = 1;
let totalItems;
let title = "";
let category = "";
let siblingCount = 1;

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
        location.reload();
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

function addPagination() {
  const paginationElement = document.getElementById("pagination-controller");
  const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
  paginationElement.innerHTML = "";
  console.log(arr);
  addPaginationElement(arr);
  document.getElementById(1 + "pagination").className =
    "bg-indigo-800 text-white relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  addPrevAndNextfeature();
}

const handleNextPage = async () => {
  currentPage++;

  if (currentPage > maxPages) {
    currentPage = maxPages;
    return;
  }
  handlePagination(currentPage);
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
  let pages = Array.from({ length }, (_, i) => start + i);
  return pages;
};

const handlePagination = async (item) => {
  currentPage = item;
  const paginationElement = document.getElementById("pagination-controller");
  const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
  paginationElement.innerHTML = "";
  addPaginationElement(arr);
  document.getElementById(item + "pagination").className =
    "bg-indigo-800 text-white relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  const tableType = {
    name: "",
    category: category,
  };
  await fetchTable(tableType);
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
    siblingCount
  );
  const totalPageCount = Math.ceil(totalItems / pageSize);
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
  ).innerHTML += `<p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">${startItemIndex}</span>
                  to
                  <span class="font-medium">${endItemIndex}</span>
                  of
                  <span class="font-medium">${totalResults}</span> results
    </p>`;
};
const addPaginationElement = (arr) => {
  const paginationElement = document.getElementById("pagination-controller");
  arr.forEach((item) => {
    if (item === "DOTS") {
      paginationElement.innerHTML += `<h1 className="pagination-item dots no-decoration">&#8230;</h1>`;
    } else {
      paginationElement.innerHTML += `<button id="${item}pagination" onClick="handlePagination(${item})"  aria-current="page" class="relative z-10 inline-flex items-center text-black px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">${item}</a>`;
    }
  });
  addDocPageStatus();
};
function addPrevAndNextfeature() {
  document.getElementById("npage").addEventListener("click", handleNextPage);
  document.getElementById("ppage").addEventListener("click", handlePrevPage);
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
    const res = await GetAllCategory();

    if (modalId == 0) {
      // document.getElementById("onlyforblank").classList.remove("hidden");
      // document.getElementById("version-area").classList.add("hidden");
      document.getElementById("create-policy").classList.remove("hidden");
      document.getElementById("review").classList.add("hidden");
      document.getElementById("json").classList.add("hidden");
      document.getElementById("container-content-1").contentEditable = true;
      modalId = 236;

      category = res?.data;
      let categoryElement = `  <option selected>Select a category</option>`;
      // let categoryElement = `
      //   <select id="category" class="w-56 flex justify-center p-2  placeholder:text-right items-center  h-10 border border-[#5D5D5D33]  text-xs rounded placeholder:text-sm placeholder:text-[#5D5D5D4D] placeholder:opacity-30  placeholder:font-normal">
      //     <option  class="flex justify-center items-center" selected>Choose Category</option>
      //   `;

      category?.map((item) => {
        categoryElement += `<option value=${item.id} id=${item.id}>${item.category}</option>`;
      });
      document.getElementById("category").innerHTML = categoryElement;
      categoryElement += `
      <p  id="caterror" class=" hidden text-red-500 text-xs font-light pt-1">Select a Category first</p>
      `;
    }
    localStorage.setItem("modalId", modalId);
    console.log("fniefniefnir");
    let htmljson;

    // document.getElementById("policy-detail").classList.add("hidden");
    // document.getElementById("policy-table").classList.add("hidden");
    // document.getElementById("pagination-area").classList.add("hidden");

    document.getElementById("extralarge-modal").classList.remove("hidden");
    document.getElementById("area").classList.add("hidden");

    const response2 = await fetch(
      `http://localhost:5001/api/file/getLetter/${modalId}`,
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
        htmljson = data.data.htmljson;
        localStorage.setItem("htmljson", JSON.stringify(htmljson));
        console.log("ddddddddddddddddddddddddd");
      });
    // const container = document.getElementsByClassName("docx-wrapper")[0];
    // container.id = "docx-wrapper";
  };
  window.closeEditor = function () {
    document.getElementById("extralarge-modal").classList.add("hidden");
  };
}

addEditorOpenCloseFeature();
const fetchAndRenderLetter = async (modalId) => {
  const response = await fetch(
    `http://localhost:5001/api/file/getLetter/${modalId}`,
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
    });
};

function addModalOpenCloseFeatureLetter() {
  window.openLetterFile = async function (modalId) {
    console.log(modalId, "modal id");
    const newel = document.createElement("div");
    newel.innerHTML = ` <div id="${modalId}" tabindex="-1" class="  w-full  overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <button id="back-request" class="mt-5 mb-5   flex flex-row gap-3 items-center font-roboto font-normal leading-4 text-mineshaft-900">
      <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.9999 6.99997H4.41394L9.70694 1.70697L8.29294 0.292969L0.585938 7.99997L8.29294 15.707L9.70694 14.293L4.41394 8.99997H18.9999V6.99997Z" fill="#333333"/>
        </svg>
        
  Back
    </button>
    

  
    <div class="relative w-full max-h-full">
  
        <div class="relative bg-white rounded-md shadow z-[6999] ">
        <div class="sticky top-0 bg-white z-[6999]">
          <div class="flex items-center justify-between p-3 border-b rounded-t ">
            <h3 id="doc_title" class="text-xl font-medium text-gray-900 flex flex-row items-center justify-center gap-8  ">
              New Document
              <!-- <button
              id="modalname"
                type="button"
              data-dropdown-toggle="dropdown" >
                <svg class="flex items-center justify-center" width="23" height="5" viewBox="0 0 23 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.5" cy="2.5" r="2.5" fill="#AFB8D0"/>
                  <circle cx="11.5" cy="2.5" r="2.5" fill="#AFB8D0"/>
                  <circle cx="20.5" cy="2.5" r="2.5" fill="#AFB8D0"/>
                  </svg>
              </button>
              <div
              class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4"
              id="dropdown"
            >
              <div class="px-4 py-3">
                <span id="dropdownname" class="block text-sm"></span>
                <span id="dropdownemail" class="block text-sm font-medium text-gray-900 truncate"
                  ></span
                >
              </div>
              <ul class="py-1" aria-labelledby="dropdown">
                <li>
                  <a
                    href="#"
                    id="signout"
                    class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div> -->
                
            </h3>
            <div class="flex flex-row gap-5 sticky top-0">
              <!-- <button id="generatepdf" type="button" class="text-dodger-blue-500  hover:bg-dodger-blue-500 border border-dodger-blue-500 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Generate PDF</button> -->
              <button id="approve" type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Approve</button>
           
              <button id="reject"  type="button" class=" text-blue-700 bg-white font-roboto border-2 border-blue-700  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 ">Reject</button>
             
                <!-- <button onclick="closeEditor()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  " data-modal-hide="extralarge-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button> -->
            </div>
      
        </div>
        <div id="rejectionmodal" class="hidden z-[6999]  backdrop-blur-xl overflow-y-auto overflow-x-hidden fixed flex   justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-2xl max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow ">
                  <!-- Modal header -->
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900">
  Reject the New Changes 
                      </h3>
                      <button id="closereview" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <!-- Modal body -->
                  <div class="p-4 md:p-5 space-y-4">
                    <label for="reason" class="block mb-2 text-sm font-normal text-chicago-600 leading-5 ">Please Send your Reason for Rejection</label>
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>    <div id="admin-error" class=" opacity-0 font-normal text-sm text-red-600 mt-1 ">
          Please write a reason
        </div>
                   
                      <!-- <p class="text-base leading-relaxed text-gray-500 ">
                         Note : You are sending your latest version of this policy for review. You will get the updates of the review on your dashboard.
                      </p> -->
                  </div>
                  <!-- Modal footer -->
                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                      <button id="rejectbutton"  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Send</button>
                      <button id="cancelbutton" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ">Cancel</button>
                  </div>
              </div>
          </div>
      </div>
   
     
        
        </div>
         <div class="relative">
          <div class="  sticky top-0 flex flex-row"> 
            <div id="editor-area" class="bg-white m-4 rounded-lg flex-1  shadow-lg mt-2 mb-2 p-2 w-full"> 
            <div id="container-content-1" contenteditable="false">
              <div id ="docx-wrapper-1" class="docx-wrapper"></div>
            </div>
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
      console.log(event.target.id, "clcikde", modalId);

      if (event.target.id === modalId) {
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
