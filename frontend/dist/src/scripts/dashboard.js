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



const fetchDoc = async (currentPage, pageSize) => {
  // document.getElementById("loading").style = "display:block";
  // if (category == "Select a category") {
  //   category = "";
  // }
  const response = await fetch(
    `http://localhost:3000/api/file/getpaginateddocuments?page=${currentPage}&size=${pageSize}`,
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
        // document.getElementById("main-body").innerHTML = "";
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
    <tr class="flex justify-around w-full">
      <th scope="col" class="w-14">ID</th>
      <th scope="col" class="w-52">
        <div class="flex items-center">
          Policy name
          <a href="#" onclick="sort(1,0)">
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
          <a href="#" onclick="sort(2,0)">
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
          <a href="#" onclick="sort(3,0)">
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
          <a href="#" onclick="sort(4,0)">
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
          <a href="#" onclick="sort(5,0)">
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
          <a href="#" onclick="sort(6,0)">
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
    <tr
      class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3]"
    >
      <td class="w-14">1</td>
      <td class="w-52">360 Performance Review Policy</td>
      <td class="w-28">Emmy</td>
      <td class="w-28">02/30/20</td>
      <td class="w-28">Admin</td>
      <td class="w-28">2/30/24</td>
      <td class="w-28">James</td>
      <td class="w-28">
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
  </tbody>
</table>
    `;
}



const docCard = (title, category, created_by, created_at, id) => {
  let date = new Date(created_at);
  // console.log(created_at);
  return `
  
  <tr
  class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3]"
>
  <td class="w-14">1</td>
  <td class="w-52">360 Performance Review Policy</td>
  <td class="w-28">Emmy</td>
  <td class="w-28">02/30/20</td>
  <td class="w-28">Admin</td>
  <td class="w-28">2/30/24</td>
  <td class="w-28">James</td>
  <td class="w-28">
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



function getdate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-based
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  return date;
}

function sort(col, order) {
  // const table = document.getElementById('myTable');
  const tbody = document.getElementById("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const th = document.getElementsByTagName("th");
  if (order) {
    const a = th[col + 1].getElementsByTagName("a");
    a[0].setAttribute("onclick", `sort(${col}, ${!order})`);
    // .setAttribute('onclick', !order);
    console.log(order);
    if (col === 2) {
      rows.sort((rowA, rowB) => {
        let cellA = rowA.querySelectorAll("td")[col].textContent.trim();
        let cellB = rowB.querySelectorAll("td")[col].textContent.trim();
        cellA = getdate(cellA);
        cellB = getdate(cellB);
        return cellA - cellB;
      });
    } else {
      rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[col].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[col].textContent.trim();
        return cellA.localeCompare(cellB, "en", { numeric: true });
      });
    }
  } else {
    const a = th[col + 1].getElementsByTagName("a");
    a[0].setAttribute("onclick", `sort(${col}, ${!order})`);

    if (col === 2) {
      rows.sort((rowA, rowB) => {
        let cellA = rowA.querySelectorAll("td")[col].textContent.trim();
        let cellB = rowB.querySelectorAll("td")[col].textContent.trim();
        cellA = getdate(cellA);
        cellB = getdate(cellB);
        return cellB - cellA;
      });
    } else {
      rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[col].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[col].textContent.trim();
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