import { UserInfoApiRequest } from "../api/dashboard.js";
document.addEventListener("DOMContentLoaded", async () => {
  addTable();
});
import { InviteApiRequest } from "../api/invitation.js";
import { fetchCategory } from "../components/CategoryChart.js";
import { InsertNavbar } from "../components/Navbar.js";
import {
  API_CONSTANTS,
  ROUTES_CONSTANTS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";

import { redirect } from "../utils/utils.js";
InsertNavbar();
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
fetchCategory();
const signoutbutton = document.getElementById("signout");
const todashboard = document.getElementById("dashboard");

const inviteButton = document.getElementById("inviteButton");
console.log("inviteButton");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("closeButton");
const inviteSubmit = document.getElementById("inviteSubmit");

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
// let btn = document.querySelector(".logo");
// let sidebar = document.querySelector(".sidebar");
let name = document.getElementById("name");
let modalname = document.getElementById("modalname");
let dropdownname = document.getElementById("dropdownname");
let dropdownemail = document.getElementById("dropdownemail");
dropdownemail.textContent = userdata.data.email;
console.log(userdata);
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
