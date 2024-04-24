import { UserInfoApiRequest } from "../api/dashboard.js";
import {
  API_CONSTANTS,
  ROUTES_CONSTANTS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";

import { redirect } from "../utils/utils.js";

var maxPages = 10;
var pageSize = 5;
var currentPage = 1;
var totalItems;
var title = "";
// var category = "";
var siblingCount = 1;



const docCard = (index, title, created_by, created_at, id) => {
  let date = new Date(created_at);
  // console.log(created_at);
  return `
  
  <tr
  class="flex pl-5 justify-around w-full py-3 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in"
>
  <td class="w-14">${index + 1}</td>
  <td class="w-52">${title}</td>
  <td class="w-28">${created_by}</td>
  <td class="w-28">${date.toLocaleDateString('en-GB')}</td>
  <td class="w-28">${created_by}</td>
  <td class="w-28">${date.toLocaleDateString('en-GB')}</td>
  <td class="w-28">${created_by}</td>
  <td class="w-24">
    <div class="flex gap-1">
      <button>
        <svg id="greenpen" class="h-6 w-4">
          <use
            xlink:href="/assets/icons/icon.svg#greenpen"
          ></use>
        </svg>
      </button>

      <button>
        <svg id="redeye" class="h-6 w-6">
          <use
            xlink:href="/assets/icons/icon.svg#redeye"
          ></use>
        </svg>
      </button>

      <button>
        <svg id="download" class="h-6 w-6">
          <use
            xlink:href="/assets/icons/icon.svg#download"
          ></use>
        </svg>
      </button>
    </div>
  </td>
</tr>
      
      `;
  //   .toLocaleDateString('en-GB')
};

const fetchData = async () => {
  // document.getElementById("loading").style = "display:block";
  // if (category == "Select a category") {
  //   category = "";
  // }
  const response = await fetch(
    `http://localhost:3000/api/file/getRecentPolicies`,
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
        parentElement.innerHTML = "<tr>No data found</tr>";
      } else {
        // totalItems = data?.data[0]?.total_count;
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "";
        // document.getElementById("main-body").innerHTML = "";
        data.data.map((item, index) => {
          // console.log(item);
          parentElement.innerHTML += docCard(
            index,
            item.title || "demo",
            item.first_name,
            item.created_at,
            item.id
          );

          // document.getElementById("main-body").innerHTML += docxModal(item.id);
          // document.getElementById(item.id).style.display = "none";
        });
      }
    });

  // document.getElementById("loading").style = "display:none";
};


document.addEventListener("DOMContentLoaded", async () => {
  addTable();
  await fetchData();

  const sortButtons = document.querySelectorAll('.sort');

  sortButtons.forEach((e, index) => {

    e.addEventListener('click', () => {
      console.log(index);
      window.event.preventDefault();
      sortTable(index, 0);
    });
  });

});


let userdata;
if (localStorage.getItem("token") === null) {
  redirect(VIEWS_CONSTANTS.LOGIN);
} else {
  const token = localStorage.getItem("token");
  await UserInfoApiRequest(token).then((data) => {
    // Handle the response from the backend
    console.log(data);
    userdata = data;
  });
}
const signoutbutton = document.getElementById("signout");
const todashboard = document.getElementById("dashboard");
todashboard.addEventListener("click", () => {
  window.location.href = "/dashboard";
});
const toeditor = document.getElementById("editor");
toeditor.addEventListener("click", () => {
  window.location.href = "/editor";
});
const todocument = document.getElementById("documents");
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
let btn = document.querySelector(".logo");
let sidebar = document.querySelector(".sidebar");
let name = document.getElementById("name");
name.textContent = userdata.data.first_name + " " + userdata.data.last_name;
btn.addEventListener("click", () => {
  console.log("click");
  sidebar.classList.toggle("close");
});

let arrows = document.querySelectorAll(".arrow");
for (let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;

    arrowParent.classList.toggle("show");
  });
}


function addTable() {

  const tableDiv = document.getElementById('insert-table');

  // console.log(tableDiv);

  tableDiv.innerHTML = `
  <table class="w-full mx-10 text-left text-sm text-gray-500">
  <thead
    class="bg-[#D5DBEB] py-3 text-xs capitalize text-gray-700 flex rounded-t-md"
  >
    <tr class="flex pl-5 justify-around w-full">
      <th scope="col" class="w-14">ID</th>
      <th scope="col" class="w-52">
        <div class="flex items-center">
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
        <div class="flex items-center">
          Approved
          <a href="#" class="sort" name="true">
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
          <a href="#" class="sort" name="true">
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
          <a href="#" class="sort" name="true">
            <svg id="greenpen" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-24">Action</th>
    </tr>
  </thead>
  <tbody id="tbody">
    <tr
      class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3]"
    >
    <td>Things are loading up. We appreciate your patience.</td>
    </tr>
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

  const sort_th = document.querySelectorAll('.sort');
  const order = sort_th[col].getAttribute('name') === 'true' ? true : false;
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

