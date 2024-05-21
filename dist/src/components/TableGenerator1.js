import { CreatePolicy } from "../api/createpolicy.js";
import { GetAdminList } from "../api/getAdminLIst.js";
import { GetAllCategory } from "../api/getAllCategories.js";
import { SetDocumentToApprove } from "../api/setDocumenttoApprove.js";

import { style } from "../utils/constants.js";
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

  if (ename !== "NewUser") {
    return `
      
      <tr
      class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in last:rounded-b-md"
    >
      <td class="w-14">${id}</td>
      <td class="w-52">${ename}</2td>
      <td class="w-28">${tname}</td>
      <td class="w-28">${category}</td>
      <td class="w-28">${created_at}</td>
      <td class="w-28">${created_by}</td>
      <td class="w-28">${created_at}</td>
      <td class="w-28">
        <div class="flex gap-2">
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
          
        </div>
      </td>
    </tr>

          
          `;
  } else {
    return `
    <tr
    class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in last:rounded-b-md"
  >
    <td class="w-14">${id}</td>
    <td class="w-52">${rname}</2td>
    <td class="w-28">${tname}</td>
    <td class="w-28">${category}</td>
    <td class="w-28">${created_at}</td>
    <td class="w-28">${created_by}</td>
    <td class="w-28">${created_at}</td>
    <td class="w-28">
      <div class="flex gap-2">
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

export function addTable1() {
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
  fetchTable();
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
    newel.innerHTML = `  <div id=${modalId}  >
   <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20  sm:block sm:p-0 ">
     <!-- Background overlay -->
     <div  class="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity " aria-hidden="true"></div>
 
     <!-- Modal content -->
     <div class="fixed inset-0  w-4/5 h-full pt-10 pb-10  m-auto  bg-white rounded-lg shadow-xl  transform transition-all sm:my-8 overflow-y-scroll">
       <div class="absolute top-0 right-0 p-2 ">
         <button onclick="closeLetterFile(${modalId})" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
           </svg>
         </button>
       </div>
 
       <div id="printThis" class="p-6 pt-0  ">
         <div id="render-docs" class=" w-full h-full  flex flex-col justify-center items-center ">
         ${style}
         <div class='docx-wrapper' id='docx-wrapper'>
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
