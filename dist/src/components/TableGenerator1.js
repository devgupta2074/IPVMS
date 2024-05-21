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
            item.created_by
          );
        });
        data.data.map((item, index) => {
          document
            .getElementById(`edit${item.id}`)
            .addEventListener("click", async () => {
              //id->Api call
              const response = await fetch(
                `http://localhost:5001/api/file/getLetter/${item.id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((response) => {
                  console.log(response);
                  response.json();
                })
                .then((data) => {
                  console.log(data.data);
                  console.log(data[0]);
                });
            });
        });

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
  html_data
) => {
  let date = new Date(created_at);
  date = date.toLocaleDateString("en-GB");
  created_at = date;

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
        <div class="flex gap-1">
          <button type="button" id="edit${id}">
            <svg id="view" class="h-6 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#view"
              ></use>
            </svg>
          </button>

          <button type="button" onClick="openEditor(${id})">
          <svg id="view" class="h-6 w-6">
            <use
              xlink:href="/assets/icons/icon.svg#view"
            ></use>
          </svg>
        </button>
          
        </div>
      </td>
    </tr>

          
          `;
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
    document.getElementById("onlyforblank").classList.remove("hidden");

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
    imageLoaded();
  };
  window.closeEditor = function () {
    console.log("fniefniefnir");
    document.getElementById("extralarge-modal").classList.add("hidden");
    document.getElementById("area").classList.remove("hidden");
    if (!document.getElementById("onlyforblank").classList.contains("hidden")) {
      document.getElementById("onlyforblank").classList.add("hidden");
      document.getElementById("json").textContent = "Save a Version as Draft";
      document.getElementById("version-area").classList.remove("hidden");
      document.getElementById("create-policy").classList.add("hidden");
      document.getElementById("json").classList.remove("hidden");
    }
    document.getElementById("policy-detail").classList.remove("hidden");
    document.getElementById("policy-table").classList.remove("hidden");
    document.getElementById("pagination-area").classList.remove("hidden");
  };
  if (document.getElementById("create-policy")) {
    document
      .getElementById("create-policy")
      .addEventListener("click", async function () {
        document.getElementById("policyname-error").classList.add("hidden");
        document
          .getElementById("policydescription-error")
          .classList.add("hidden");
        document.getElementById("policycategory-error").classList.add("hidden");
        let policyname = document.getElementById("policy-name").value;
        let policydescription =
          document.getElementById("policy-description").value;
        let policycategory = document.getElementById("category").value;
        console.log(policycategory, policydescription, policyname);

        if (
          policyname !== "" &&
          policydescription !== "" &&
          policycategory !== "Select a category"
        ) {
          // document.getElementById("policyname-error").classList.add("hidden");
          // document
          //   .getElementById("policydescription-error")
          //   .classList.add("hidden");
          // document
          //   .getElementById("policycategory-error")
          //   .classList.add("hidden");

          const blobToBase64 = (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            return new Promise((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });
          };

          async function convertImagesToBase64(divId) {
            // Find the div element
            var div = document.getElementById(divId);

            // Find all images within the div
            var images = div.getElementsByTagName("img");

            // Iterate over each image
            if (images.length > 0) {
              for (var i = 0; i < images.length; i++) {
                var img = images[i];

                // Create a blob URL for the image
                var blob = await fetch(img.src).then((response) =>
                  response.blob()
                );

                // Convert blob to base64
                var base64 = await blobToBase64(blob);

                img.src = base64;
              }
            }
          }

          await convertImagesToBase64("container-content-1");
          const container = document.getElementById("container-content-1");
          var tags = container.querySelectorAll(".docx-wrapper *");
          // console.log(tags);
          var idCounter = 1;
          tags.forEach(function (tag) {
            if (!tag.id) {
              tag.id = "id_" + idCounter;
              idCounter++;
            }
          });
          const sections = container.getElementsByClassName("docx");
          console.log(sections);
          for (var i = 0; i < sections.length; i++) {
            console.log("section height chages");
            sections[i].setAttribute(
              "style",
              "padding: 20.15pt 59.15pt 72pt 72pt; width: 595pt; height: 842pt;"
            );
          }
          const containerdocx =
            container.getElementsByClassName("docx-wrapper")[0];
          const headers = containerdocx.getElementsByTagName("header");
          console.log(headers);
          // for (var i = 0; i < headers.length; i++) {
          //   console.log("section height chages");
          //   headers[i].setAttribute(
          //     "style",
          //     "margin-top: 19.3333px; height: 48px; margin-bottom:10px"
          //   );
          // }
          const articles = containerdocx.getElementsByTagName("article");
          console.log(articles);
          // for (var i = 0; i < articles.length; i++) {
          //   console.log("section height chages");
          //   articles[i].setAttribute("style", "margin-top: 48px; ");
          // }
          var containerContent = document.getElementById("container-content-1");

          let resHtml = document.getElementById("docx-wrapper-1").innerHTML;

          console.log("ggg", resHtml);
          // dummy value
          //   const categoryId = 1;
          const htmlJson = extractHtmlToJson(
            containerContent.getElementsByClassName("docx-wrapper")[0]
          );
          console.log(resHtml, htmlJson);
          const token = localStorage.getItem("token");
          console.log("token is ", token);
          await CreatePolicy(
            resHtml,
            htmlJson,
            policycategory,
            policyname,
            token
          );
          console.log("results");
          window.closeEditor();
        } else {
          if (policyname == "") {
            document
              .getElementById("policyname-error")
              .classList.remove("hidden");
          }
          if (policydescription == "") {
            document
              .getElementById("policydescription-error")
              .classList.remove("hidden");
          }
          if (policycategory == "Select a category") {
            document
              .getElementById("policycategory-error")
              .classList.remove("hidden");
          }
        }
      });
  }
  function closereviewmodal() {
    document.getElementById("sendforreview").classList.add("hidden");
  }
  if (document.getElementById("review")) {
    document
      .getElementById("review")
      .addEventListener("click", async function () {
        document.getElementById("adminlist").innerHTML =
          "  <option selected>Select an Admin</option>";
        document.getElementById("sendforreview").classList.remove("hidden");
        const adminlist = await GetAdminList();
        console.log(adminlist, "Admin list");
        adminlist.map((item) => {
          console.log(item.email, "email");
          document.getElementById("adminlist").innerHTML += `<option value=${
            item.id
          }>${item.first_name + " " + item.last_name}</option>`;
        });
      });
    document
      .getElementById("closereview")
      .addEventListener("click", closereviewmodal);
    document
      .getElementById("sendreview")
      .addEventListener("click", async function () {
        console.log(document.getElementById("adminlist").value);
        if (document.getElementById("adminlist").value !== "Select an Admin") {
          document.getElementById("admin-error").classList.remove("opacity-1");
          document.getElementById("admin-error").classList.add("opacity-0");
          const response = await SetDocumentToApprove(
            parseInt(document.getElementById("adminlist").value),
            parseInt(localStorage.getItem("modalId")),
            parseInt(localStorage.getItem("userid"))
          ).then(() => {
            closereviewmodal();
            document.getElementById("sendforreview").classList.add("hidden");
          });
          console.log(response);
          if (response) {
            document.getElementById("sendforreview").classList.add("hidden");
          }
        } else {
          document.getElementById("admin-error").classList.add("opacity-1");
          document.getElementById("admin-error").classList.remove("opacity-0");
        }
      });
  }
}

addEditorOpenCloseFeature();
