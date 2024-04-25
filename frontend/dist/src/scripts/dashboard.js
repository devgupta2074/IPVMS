import { UserInfoApiRequest } from "../api/dashboard.js";

import { InviteApiRequest } from "../api/invitation.js";
import { fetchCategory } from "../components/CategoryChart.js";
import { InsertNavbar } from "../components/Navbar.js";
import {
  API_CONSTANTS,
  ROUTES_CONSTANTS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";
import { docsstyle } from "../utils/docxstyle.js";

import { redirect } from "../utils/utils.js";

var maxPages = 10;
var pageSize = 5;
var currentPage = 5;
var totalItems;
var title = "";
// var category = "";
var siblingCount = 1;

const docxModal = (id) => {
  return `
  <div id=${id}  >
  <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20  sm:block sm:p-0 ">
    <!-- Background overlay -->
    <div  class="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity " aria-hidden="true"></div>

    <!-- Modal content -->
    <div class="fixed inset-0  w-4/5 h-full pt-10 pb-10  m-auto  bg-white rounded-lg shadow-xl  transform transition-all sm:my-8 overflow-y-scroll">
      <div class="absolute top-0 right-0 p-2 ">
        <button onclick="closeModal(${id})" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <div id="printThis" class="p-6 pt-0  ">
        <div id="render-docs" class=" w-full h-full  flex flex-col justify-center items-center ">
        ${docsstyle}
        <div class='docx-wrapper' id='docx-wrapper'></div>
          </div>
        
      
        <a href="#" onclick="closeModal(${id})" class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
         Close Modal
        </a>
      </div>
    </div>
  </div>
</div>

  `;
};

const docCard = (title, category, created_by, created_at, id) => {
  let date = new Date(created_at);
  date = date.toLocaleDateString("en-GB");
  // console.log(created_at);
  return `
  
  <tr
  
  class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in"
>
  <td class="w-14">${id}</td>
  <td class="w-52">${title}</2td>
  <td class="w-28">${created_by}</td>
  <td class="w-28">${date}</td>
  <td class="w-28">Admin</td>
  <td class="w-28">${date}</td>
  <td class="w-28">${created_by}</td>
  <td class="w-28">
    <div class="flex gap-1">
      <button>
        <svg id="greenpen" class="h-6 w-4">
          <use
            xlink:href="/assets/icons/icon.svg#greenpen"
          ></use>
        </svg>
      </button>

      <button onclick="openModal(${id})">
        <svg id="redeye" class="h-6 w-6">
          <use
            xlink:href="/assets/icons/icon.svg#redeye"
          ></use>
        </svg>
      </button>

      <a href="/policydownload/${id}" target="_blank" >
        <svg id="download" class="h-6 w-6">
          <use
            xlink:href="/assets/icons/icon.svg#download"
          ></use>
        </svg>
      </a>
    </div>
  </td>
</tr>
      
      `;
  //   .toLocaleDateString('en-GB')
};

const fetchDoc = async (currentPage, pageSize) => {
  // document.getElementById("loading").style = "display:block";
  // if (category == "Select a category") {
  //   category = "";
  // }
  const response = await fetch(
    `http://localhost:5001/api/file/getpaginateddocuments?page=${currentPage}&size=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data);
      if (data.success == false) {
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "No data found";
      } else {
        totalItems = data?.data[0]?.total_count;
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "";
        document.getElementById("main-body").innerHTML = "";
        data.data.map((item) => {
          console.log(item);
          parentElement.innerHTML += docCard(
            item.title || "demo",
            item.category_name,
            item.created_by,
            item.created_at,
            item.id
          );

          document.getElementById("main-body").innerHTML += docxModal(item.id);
          document.getElementById(item.id).style.display = "none";
        });
      }
    });

  // document.getElementById("loading").style = "display:none";
};

document.addEventListener("DOMContentLoaded", async () => {
  addTable();
  await fetchDoc(currentPage - 1, pageSize);
  const sortButtons = document.querySelectorAll(".sort");
  sortButtons.forEach((e, index) => {
    e.addEventListener("click", () => {
      console.log(index);
      window.event.preventDefault();
      sortTable(index, 0);
    });
  });
});

InsertNavbar();

let userdata;
if (localStorage.getItem("token") === null) {
  redirect(VIEWS_CONSTANTS.LOGIN);
} else {
  const token = localStorage.getItem("token");
  await UserInfoApiRequest(token).then((data) => {
    // Handle the response from the backend
    console.log(data, "d");
    userdata = data;
  });
}
fetchCategory();
const signoutbutton = document.getElementById("signout");
const todashboard = document.getElementById("dashboard");
console.log("inviteButton dashboard", todashboard);
const inviteButton = document.getElementById("inviteButton");
console.log("inviteButton");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("closeButton");
const inviteSubmit = document.getElementById("inviteSubmit");

todashboard.addEventListener("click", () => {
  console.log("inviteButton dash");
  window.location.href = "/dashboard";
});
const toeditor = document.getElementById("editor");
toeditor.addEventListener("click", () => {
  window.location.href = "/editor";
});
const todocument = document.getElementById("document");
todocument.addEventListener("click", () => {
  console.log("inviteButton dash");
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
// let btn = document.querySelector(".logo");
// let sidebar = document.querySelector(".sidebar");
console.log(userdata);
let name = document.getElementById("name");
let modalname = document.getElementById("modalname");
let dropdownname = document.getElementById("dropdownname");
let dropdownemail = document.getElementById("dropdownemail");

console.log(userdata);
dropdownemail.textContent = userdata.data?.email;
name.textContent = userdata.data.first_name + " " + userdata.data.last_name;
dropdownname.textContent =
  userdata.data.first_name + " " + userdata.data.last_name;
modalname.innerHTML =
  userdata.data.first_name +
  " " +
  userdata.data.last_name +
  `  <svg
  class="w-4 h-4 ml-2"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M19 9l-7 7-7-7"
  ></path>
</svg>`;
inviteButton.addEventListener("click", function () {
  console.log("clicked");
  modal.style.display = "block";
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});
async function handleInvite() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userName").value;
  console.log(name, email);
  const res = await InviteApiRequest(email, name);

  modal.style.display = "none";
}
document.getElementById("inviteSubmit").addEventListener("click", function () {
  handleInvite();
});

// api call to invite team member

function addTable() {
  const tableDiv = document.getElementById("insert-table");
  tableDiv.innerHTML = "";

  // console.log(tableDiv);

  tableDiv.innerHTML = `<table class="w-[69.5rem] mt-5 mb-5 text-left text-sm text-gray-500 bg-white">
  <thead class=" bg-ship-cove-500 py-3 text-xs capitalize text-white flex rounded-t-md">
    <tr class="flex justify-around w-full">
      <th scope="col" class="w-14">ID</th>
      <th scope="col" class="w-52">
        <div class="flex items-center">
          Policy name
          <a href="#"class="sort" name="true">
            <svg id="sorticon" class="pl-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">
        <div class="flex items-center">
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
        <div class="flex items-center">
          Created at
          <a  class="sort" name="true">
            <svg id="sorticon" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">
        <div class="flex items-center">
          Approved
          <a class="sort" name="true">
            <svg id="greenpen" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">
        <div class="flex items-center">
          Published on
          <a class="sort" name="true">
            <svg id="greenpen" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">
        <div class="flex items-center">
          Published by
          <a href="#" >
            <svg id="greenpen" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">Action</th>
    </tr>
  </thead>
  <tbody id="tbody">
  
  </tbody>
</table>
    `;
}

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
    });
};

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
