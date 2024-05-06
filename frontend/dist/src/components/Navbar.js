import { UserInfoApiRequest } from "../api/dashboard.js";
import { VIEWS_CONSTANTS } from "../utils/constants.js";

const NavBar = `
<header
class="w-full h-[3.5rem] z-20 fixed top-0 left-0 p-1 bg-gulf-blue-950 flex items-center justify-end gap-5"
>
<div
  class="flex-1 my-2 mx-5 flex items-center justify-end relative gap-3"
>
  <input
    type="name"
    name="search"
    type="text"
    id="search"
    class="w-[17.5rem] p-2 h-10 pl-10 font-roboto text-[0.9375rem] leading-[1.0985rem] placeholder:text-white font-medium rounded-full shadow-md text-white bg-astronaut-900 hover:border-none focus:border-none"
    placeholder="Search"
  />
  <svg class="h-6 w-6 z-50 -ml-12 mt-1">
    <use xlink:href="/assets/icons/icon.svg#search-icon"></use>
  </svg>
</div>
<div class="flex items-center justify-center gap-5 pr-10">
  <svg class="h-6 w-6 z-50">
    <use xlink:href="/assets/icons/icon.svg#bellicon"></use>
  </svg>
  <figure class=" ">
    <img
      class="rounded-full m-1"
      width="39"
      height="39"
      src="/assets/images/profile2.jpg"
      alt="Profile"
    />
  </figure>

  <button
   id="modalname"
    class="text-white font-medium font-roboto rounded-lg text-base text-center inline-flex items-center"
    type="button"
    data-dropdown-toggle="dropdown"
  >

  
  </button>
  <!-- Dropdown menu -->
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
  </div>
  <!-- Dropdown menu -->
</div>
</header>
<aside
class="w-[5%] z-40 h-full fixed top-0 left-0 p-[1.3125rem] bg-gulf-blue-950"
>
<div class="fixed z-100 top-4 left-6 flex text-white gap-3">
  <figure class="">
    <img
      class=""
      width="39"
      height="39"
      src="/assets/images/exsquared.png"
      alt="Exsquared Logo"
    />
  </figure>
</div>

<div
  class="flex flex-col items-center mt-20 gap-y-8 m-0 w-full p-0  sidebar-icon"
>

<div  id="dashboard" class="relative">
<div   class=" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ">
  <svg   class="  order-1 w-[9px] h-[13px] ml-10 ">
    <use  xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div  class="  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 ">
    Dashboard</div>
</div>
<svg

class="h-[2.5rem] w-[2.5rem] p-2  "

>
<use xlink:href="/assets/icons/icon.svg#dashboard"></use>
</svg>


</div>
<div  id="document" class="relative">
<div   class=" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ">
  <svg   class="  order-1 w-[9px] h-[13px] ml-10 ">
    <use  xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div  class="  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 ">
    Document</div>
</div>
<svg

class="h-[2.5rem] w-[2.5rem] p-2  "

>
<use xlink:href="/assets/icons/icon.svg#document"></use>
</svg>


</div>


<div  id="letters" class="relative">
<div   class=" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ">
  <svg   class="  order-1 w-[9px] h-[13px] ml-10 ">
    <use  xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div  class="  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 ">
  Letters</div>
</div>
<svg

class="h-[2.5rem] w-[2.5rem] p-2  "

>
<use xlink:href="/assets/icons/icon.svg#policy"></use>
</svg>


</div>
<div  id="editor" class="relative">
<div   class=" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ">
  <svg   class="  order-1 w-[9px] h-[13px] ml-10 ">
    <use  xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div  class="  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 ">
  Editor</div>
</div>
<svg

class="h-[2.5rem] w-[2.5rem] p-2  "

>
<use xlink:href="/assets/icons/icon.svg#document"></use>
</svg>


</div>
<div  id="inviteButton" class="relative">
<div   class=" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ">
  <svg   class="  order-1 w-[9px] h-[13px] ml-10 ">
    <use  xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div  class="  order-2  w-24  bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2 ">
  Invite Member</div>
</div>
<svg

class="h-[2.5rem] w-[2.5rem] p-2  "

>
<use xlink:href="/assets/icons/icon.svg#document"></use>
</svg>


</div>
  
 
</div>
</aside>`;

export async function InsertNavbar() {
  let userdata;
  if (localStorage.getItem("token") === null) {
    redirect(VIEWS_CONSTANTS.LOGIN);
  } else {
    const token = localStorage.getItem("token");
    await UserInfoApiRequest(token).then((data) => {
      // Handle the response from the backend
      console.log(data, "d");
      if (data.statusCode == 401) {
        redirect(VIEWS_CONSTANTS.LOGIN);
      } else {
        userdata = data;
      }
    });
  }
  const body = document.getElementsByTagName("body")[0];
  const navcomp = document.createElement("div");
  navcomp.id = "navbar-removed";
  navcomp.innerHTML = NavBar;

  body.insertBefore(navcomp, body.firstChild);
  const parentElement = document.getElementsByTagName("body")[0];
  const toBeDeletedElement = document.getElementById("navbar-removed");
  console.log(toBeDeletedElement, parentElement, "gggh");
  // Check if both the parent and to-be-deleted elements exist
  if (parentElement && toBeDeletedElement) {
    // Move children of the to-be-deleted element to the parent element

    while (toBeDeletedElement.firstChild) {
      parentElement.insertBefore(
        toBeDeletedElement.firstChild,
        parentElement.firstChild
      );
    }

    // Remove the to-be-deleted element
    parentElement.removeChild(toBeDeletedElement);
  }
  var url = window.location.pathname;

  // Extracting just the word "dashboard"
  var urlaction = url.split("/")[1];

  console.log("dashboard dev", url);
  if (document.getElementById(urlaction)) {
    document.getElementById(urlaction).classList.add("bg-[#718BD3]");
    document.getElementById(urlaction).classList.add("shadow-lg");
    document.getElementById(urlaction).classList.add("rounded-[10px]");
  }
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
}

// <div class="tooltip">
//   <div
//     class="absolute top-1 -right-24 flex flex-row justify-center items-center gap-0"
//   >
//     <svg class="z-10 order-1 w-[9px] h-[13px]">
//       <use xlink:href="./assets/icons/icon.svg#triangle"></use>
//     </svg>

//     <div
//       class="tooltip order-2 bg-[#eaeeff] font-sfprodisplay font-medium text-gulf-blue-950 text-xs rounded p-2"
//     >
//       Dashboard
//     </div>
//   </div>
// </div>
