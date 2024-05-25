import { CreatePolicy } from "../api/createpolicy.js";
import { GetAdminList } from "../api/getAdminLIst.js";
import { GetAllCategory } from "../api/getAllCategories.js";
import { SetDocumentToApprove } from "../api/setDocumenttoApprove.js";
import { extractHtmlToJson } from "../scripts/uploadpolicy1.js";

import { imageLoaded } from "../scripts/versioncontrol.js";
import { style } from "../utils/constants.js";
import { fetchVersionsDateWise } from "./VersionTable.js";

const docxModal = (id) => {
  return `
    <div id=${id} class="modal-class"  >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20  sm:block sm:p-0 ">
      <!-- Background overlay -->
      <div  class="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity backdrop " aria-hidden="true"></div>
  
      <!-- Modal content -->
      <div class="fixed inset-0  w-3/5 h-full pt-10 pb-10  m-auto  bg-white rounded-lg shadow-xl  transform transition-all sm:my-8 overflow-y-scroll">
        <div class="absolute top-0 right-0 p-2 ">
          <button onclick="closeModal(${id})" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
  
        <div id="printThis" class="p-6 pt-0  ">
          <div id="render-docs" class="  flex flex-col justify-center items-center ">
          ${style}
          <div class='shadow-2xl' id='docx-wrapper'>
          </div>
          
            </div>
          
        
         
        </div>
      </div>
    </div>
  </div>
  
    `;

  // Event listener for clicks outside the modal
};

const docCard = (title, created_by, created_at, id, index, type) => {
  let date = new Date(created_at);
  date = date.toLocaleDateString("en-GB");
  // console.log(created_at);
  if (type === "recent") {
    return `
      
      <tr
   
      class="flex justify-around w-full py-3 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-200 ease-out hover:ease-in last:rounded-b-md"
    >
      <td class="w-14">${index}</td>
      <td class="w-52 hover:text-blue-600 hover:underline"     onclick="openModal(${id})">${title}</2td>
      <td class="w-28">${created_by}</td>
      <td class="w-28">${date}</td>
      <td class="w-28">Admin</td>
      <td class="w-28">${date}</td>
      <td class="w-28">${created_by}</td>
      <td class="w-28">
        <div class="flex gap-6 justify-center">      
          <a href="/policydownload/${id}" target="_blank" >
            <svg id="download" class="h-6 w-4">
              <use
                xlink:href="/assets/icons/icon.svg#download"
              ></use>
            </svg>
          </a>
        </div>
      </td>
    </tr>
          
          `;
  } else {
    return `
      
    <tr
 
    class="flex justify-around w-full py-3 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-200 ease-out hover:ease-in last:rounded-b-md"
  >
    <td class="w-14">${index}</td>
    <td class="w-52 hover:text-blue-600 hover:underline"     onclick="openModal(${id})">${title}</2td>
    <td class="w-28">${created_by}</td>
    <td class="w-28">${date}</td>
    <td class="w-28">Admin</td>
    <td class="w-28">${date}</td>
    <td class="w-28">${created_by}</td>
    <td class="w-28">
      <div class="flex gap-6 justify-center">
        <button onclick="openEditor(${id})">
          <svg id="edit" class="h-6 w-4">
            <use
              xlink:href="/assets/icons/icon.svg#edit"
            ></use>
          </svg>
        </button>
    
        <a href="/policydownload/${id}" target="_blank" >
          <svg id="download" class="h-6 w-4">
            <use
              xlink:href="/assets/icons/icon.svg#download"
            ></use>
          </svg>
        </a>
      </div>
    </td>
  </tr>
        
        `;
  }
  //   .toLocaleDateString('en-GB')
};

function addTable() {
  const tableDiv = document.getElementById("insert-table");
  tableDiv.innerHTML = "";

  console.log(tableDiv);

  tableDiv.innerHTML = `
  <table id='table' class="w-full mb-5 text-left text-sm text-gray-500 bg-white font-roboto rounded-md">
    <thead class="bg-ship-cove-200 text-xs capitalize text-[#333333] flex rounded-t-md">
      <tr class="py-4 flex justify-around w-full">
        <th scope="col" class="w-14 font-normal">ID</th>
        <th scope="col" class="w-52">
          <div class="flex items-center font-normal">
            Policy name
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
            Created by
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
            Created at
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
            Approved
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
            Published on
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
            Published by
            <a href="#" class="sort" name="true">
              <svg id="sorticon" class="px-2 h-4 w-6">
                <use
                  xlink:href="/assets/icons/icon.svg#sorticon"
                ></use>
              </svg>
            </a>
          </div>
        </th>
        <th scope="col" class="w-28 font-normal text-center">Action</th>
      </tr>
    </thead>
    <tbody id="tbody">
    
    </tbody>
  </table>
      `;

  addSortFeature();
  addEditorOpenCloseFeature();
  addModalOpenCloseFeature();

  if (searchcheck) {
    addSearchbar();
  }
}

let maxPages = 10;
let pageSize = 7;
let currentPage = 1;
let totalItems = 0;
let title = "";
let category = "";
let siblingCount = 1;
let totalPageCount;
let searchcheck = false;

export const fetchTable = async (tableType) => {
  document.getElementById("loading").style = "display:block";
  console.log(tableType);
  let apiLink = "";
  searchcheck = tableType.pagination;

  category = tableType.category;
  const title = tableType.title ? tableType.title : "";

  if (tableType.name == "recent") {
    apiLink = "http://localhost:5001/api/file/getRecentPolicies";
  } else {
    apiLink = `http://localhost:5001/api/file/document?page=${currentPage - 1
      }&size=${pageSize}&title=${title}&category=${category}`;
  }

  const response = await fetch(apiLink, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend

      const tablecheck = document.getElementById("table");

      if (!tablecheck) {
        console.log(
          "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
          searchcheck
        );
        addTable();
      }
      console.log(data);
      if (data.success == false) {
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "No data found";
        if (tableType?.pagination) {
          maxPages = 10;
          pageSize = 7;
          currentPage = 1;
          totalItems = 0;
          siblingCount = 1;

          addPagination(currentPage);
          // addSearchbar();
        }
      } else {
        console.log("jhishi", data.data);
        totalItems = data.data[0]?.total_count;
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "";
        document.getElementById("main-body").innerHTML = "";
        const startItemIndex = (currentPage - 1) * pageSize + 1;
        data.data.map((item, index) => {
          console.log(item);
          index = index + startItemIndex;
          parentElement.innerHTML += docCard(
            item.title || "demo",
            item.first_name,
            item.created_at,
            item.id,
            index,
            tableType?.name
          );

          document.getElementById("main-body").innerHTML += docxModal(item.id);
          document.getElementById(item.id).style.display = "none";
        });
        if (tableType?.pagination) {
          console.log(currentPage);
          addPagination(currentPage);
          // addSearchbar();
        }
      }
    });

  document.getElementById("loading").style = "display:none";
  return true;
};

function getdate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-based
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  return date;
}

function sortTable(col) {
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
}

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

    document.getElementById("policy-detail").classList.add("hidden");
    document.getElementById("policy-table").classList.add("hidden");
    document.getElementById("pagination-area").classList.add("hidden");
    document.getElementById("extralarge-modal").classList.remove("hidden");

    const response2 = await fetch(
      `http://localhost:5001/api/file/getFile/${modalId}`,
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

        fetchVersionsDateWise(modalId);
        // Handle the response from the backend
        console.log(data.data, "fffffkbnjb ");
        document.getElementById("docx-wrapper-1").innerHTML = data.data.data;
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
          document.getElementById("adminlist").innerHTML += `<option value=${item.id
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

    window.addEventListener("click", function (event) {
      console.log(event.target, "clcikde", modalId);

      if (event.target.classList.contains('backdrop')) {
        window.closeModal(modalId);
      }
    });


    // document.addEventListener('click', (event) => {

    //   console.log(document.getElementById(modalId).style.display);
    //   if (document.getElementById(modalId).style.display === "block") {
    //     event.stopPropagation();
    //     document.getElementById(modalId).style.display = "none";
    //     document
    //       .getElementsByTagName("body")[0]
    //       .classList.remove("overflow-y-hidden");
    //   }
    // });
    await fetchAndRenderDoc(modalId);
  };

  window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = "none";
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
  };
}

const fetchAndRenderDoc = async (modalId) => {
  const response = await fetch(
    `http://localhost:5001/api/file/getFile/${modalId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "response issss");
      const docData = data.data.data;
      document
        .getElementById(modalId)
        .querySelector("#docx-wrapper").innerHTML = "";
      document
        .getElementById(modalId)
        .querySelector("#docx-wrapper").innerHTML = docData;
      const modal = document.getElementById(modalId);
    });
};

// Pagination

function addPagination(item) {
  const paginationElement = document.getElementById("pagination-controller");
  const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
  paginationElement.innerHTML = "";
  console.log(arr);
  addPaginationElement(arr);
  document.getElementById(
    item + "pagination"
  ).className = `bg-white text-dodger-blue-500 rounded-md border-[1px] border-dodger-blue-500 relative z-10 inline-flex items-center  font-bold px-3  text-sm  focus:z-20 h-8`;
  addPrevAndNextfeature();
  handlePaginationOnClick();
}

const handleNextPage = async () => {
  currentPage++;

  if (currentPage > maxPages) {
    currentPage = maxPages;
    return;
  }
  if (currentPage < totalPageCount) {
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

  const tableType = {
    name: "",
    category: category,
    pagination: true,
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

export const resetVariables = () => {
  maxPages = 10;
  pageSize = 7;
  currentPage = 1;
  totalItems = 0;
  title = "";
  category = "";
  totalPageCount = 0;
};

function handlePaginationOnClick() {
  const paginationButtons = document.querySelectorAll(
    "div#pagination_controller > button"
  );

  window.handlePagination = async function (Id) {
    handlePagination(Id);
  };
}

////////  Search bar

function addSearchbar() {
  const sbar = document.getElementById("document-search-bar");
  const cross_mark = document.getElementById('x');
  sbar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const tableType = {
        name: "",
        title: `${sbar.value}`,
        category: `${category}`,
        pagination: true,
      };
      // console.log(tableType);
      // resetVariables();
      fetchTable(tableType);
      // sbar.value = "";
      cross_mark.classList.remove('hidden');
      // addPagination(currentPage);
    }
  });

  cross_mark.addEventListener('click', () => {
    sbar.value = '';
    const tableType = {
      name: "",
      title: `${sbar.value}`,
      category: `${category}`,
      pagination: true,
    };

    fetchTable(tableType);
    cross_mark.classList.add('hidden');

  });
}
