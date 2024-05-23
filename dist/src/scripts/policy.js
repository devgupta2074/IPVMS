import { UserInfoApiRequest } from "../api/dashboard.js";

import { InviteApiRequest } from "../api/invitation.js";

import { InsertNavbar } from "../components/Navbar.js";
import { addTable, sortTable, getdate } from "../components/TableGenerator.js";
import { fetchVersionsDateWise } from "../components/VersionTable.js";
import {
  API_CONSTANTS,
  ROUTES_CONSTANTS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";
import { docsstyle } from "../utils/docxstyle.js";

import { redirect } from "../utils/utils.js";
import { imageLoaded } from "./versioncontrol.js";

var maxPages = 10;
var pageSize = 5;
var currentPage = 1;
var totalItems;
var title = "";
// var category = "";
var siblingCount = 1;

const docxModal = (id) => {
  return `
  <div id=${id} class="hidden" >
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
      <button onclick="openEditor(${id})">
        <svg id="edit" class="h-6 w-4">
          <use
            xlink:href="/assets/icons/icon.svg#edit"
          ></use>
        </svg>
      </button>

      <button onclick="openModal(${id})">
        <svg id="view" class="h-6 w-6">
          <use
            xlink:href="/assets/icons/icon.svg#view"
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
  document.getElementById("loading").style = "display:block";
  // if (category == "Select a category") {
  //   category = "";
  // }
  const response = await fetch(
    `http://localhost:5001/api/file/getRecentPolicies`,
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

  document.getElementById("loading").style = "display:none";
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
    if (data == undefined || data.statusCode == 401) {
      redirect(VIEWS_CONSTANTS.LOGIN);
    } else {
      userdata = data;
    }
  });
}

// const signoutbutton = document.getElementById("signout");
// const todashboard = document.getElementById("dashboard");
// console.log("inviteButton dashboard", todashboard);
// const inviteButton = document.getElementById("inviteButton");
// console.log("inviteButton");
// const modal = document.getElementById("modal");
// const closeButton = document.getElementById("closeButton");
// const inviteSubmit = document.getElementById("inviteSubmit");

// let btn = document.querySelector(".logo");
// let sidebar = document.querySelector(".sidebar");
// console.log(userdata);
// let name = document.getElementById("name");
// let modalname = document.getElementById("modalname");
// let dropdownname = document.getElementById("dropdownname");
// let dropdownemail = document.getElementById("dropdownemail");

// console.log(userdata);
// dropdownemail.textContent = userdata.data?.email;
// name.textContent = userdata.data.first_name + " " + userdata.data.last_name;
// dropdownname.textContent =
//   userdata.data.first_name + " " + userdata.data.last_name;
// modalname.innerHTML =
//   userdata.data.first_name +
//   " " +
//   userdata.data.last_name +
//   `  <svg
//   class="w-4 h-4 ml-2"
//   fill="none"
//   stroke="currentColor"
//   viewBox="0 0 24 24"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <path
//     stroke-linecap="round"
//     stroke-linejoin="round"
//     stroke-width="2"
//     d="M19 9l-7 7-7-7"
//   ></path>
// </svg>`;
// inviteButton.addEventListener("click", function () {
//   console.log("clicked");
//   modal.style.display = "block";
// });

// closeButton.addEventListener("click", function () {
//   modal.style.display = "none";
// });
// async function handleInvite() {
//   const name = document.getElementById("userName").value;
//   const email = document.getElementById("userName").value;
//   console.log(name, email);
//   const res = await InviteApiRequest(email, name);

//   modal.style.display = "none";
// }
// document.getElementById("inviteSubmit").addEventListener("click", function () {
//   handleInvite();
// });

// api call to invite team member

addTable();
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
window.openEditor = async function (modalId) {
  localStorage.setItem("modalId", modalId);
  console.log("fniefniefnir");
  let htmljson;
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
};
window.closeModal = function (modalId) {
  document.getElementById(modalId).style.display = "none";
  document
    .getElementsByTagName("body")[0]
    .classList.remove("overflow-y-hidden");
};
