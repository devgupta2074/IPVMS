import { UserInfoApiRequest } from "../api/dashboard.js";
import { VIEWS_CONSTANTS } from "../utils/constants.js";

const NavBar = `
<aside class="h-full col-start-1 col-end-2 px-6 bg-deep-cove-950">
<div class="flex flex-col items-center mt-20 gap-y-8 m-0 w-full p-0  sidebar-icon">

<button id="dashboard" class="relative ">
<div class=" absolute   flex flex-row gap-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ">
  <svg class="  order-1 w-[9px] h-[13px] ml-10 ">
    <use xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div class=" order-2 p-2 w-24 bg-ship-cove-500 font-semibold text-white text-sm rounded font-roboto">
    Dashboard</div>
</div>

</button>


<button id="document" class="h-[2.5rem] w-[2.5rem] flex flex-row ">
<span id="doc-svg" class=" peer/doc-svg">
<svg class="h-[2.5rem] w-[2.5rem] p-2  ">
<use xlink:href="/assets/icons/icon.svg#shield"></use>
</svg>
</span>
<div class=" my-[2px] z-10 flex flex-row gap-0 items-center justify-center opacity-0  invisible peer-hover/doc-svg:visible peer-hover/doc-svg:opacity-100 transition-opacity duration-300">

  <svg class="  order-1 w-[9px] h-[13px] ml-3 -mr-1 ">
    <use xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div class="  order-2 p-2 w-24 bg-ship-cove-500 font-roboto font-semibold text-white text-sm rounded">
    Policies</div>
</div>
</button>


<button id="letters" class="h-[2.5rem] w-[2.5rem] flex flex-row">
<span id="letter-svg" class=" peer/letter-svg">
<svg class="h-[2.5rem] w-[2.5rem] p-2  ">
<use xlink:href="/assets/icons/icon.svg#policy"></use>
</svg>
</span>
<div class=" my-[2px] z-10 flex flex-row gap-0 items-center justify-center opacity-0  invisible peer-hover/letter-svg:visible peer-hover/letter-svg:opacity-100 transition-opacity duration-300 ">
  <svg class="  order-1 w-[9px] h-[13px] ml-3 -mr-1">
    <use xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div class="  order-2 p-2 w-24 bg-ship-cove-500 font-roboto font-semibold text-white text-sm rounded">
  Letters</div>
</div>
</button>

<button id="inviteButton" class="h-[2.5rem] w-[2.5rem] flex flex-row">
<span id="invite-svg" class=" peer/invite-svg">
<svg class="h-[2.5rem] w-[2.5rem] p-2  ">
<use xlink:href="/assets/icons/icon.svg#document"></use>
</svg>
</span>

<div class=" my-[2px] z-10 flex flex-row gap-0 items-center justify-center opacity-0  invisible peer-hover/invite-svg:visible peer-hover/invite-svg:opacity-100 transition-opacity duration-300">
  <svg class="  order-1 w-[9px] h-[13px] ml-3 -mr-1 ">
    <use xlink:href="./assets/icons/icon.svg#triangle"></use>
  </svg>
 
  <div class="  order-2 p-2 w-32  bg-ship-cove-500 font-roboto text-white font-semibold text-sm rounded ">
  Invite Memeber</div>
</div>
</button>
  
 
</div>
</aside>
<header class="w-full py-5 pl-8   bg-deep-cove-950 flex items-center justify-end gap-5 col-span-full ">
<img class="h-[39px] w-[39px]" src="/assets/images/exsquared.png">
<div class="flex-1 ml-5 flex items-center justify-end relative gap-3">
  <input type="name" name="search" id="globalsearch" class="w-[17.5rem] p-2 px-4 font-roboto text-[0.9375rem] leading-[1.0985rem] placeholder:text-white font-medium rounded-full shadow-md text-white bg-astronaut-900 hover:border-none focus:border-none" placeholder="Search">
  <svg class="h-6 w-6 z-50 -ml-12 mt-1">
    <use xlink:href="/assets/icons/icon.svg#search-icon"></use>
  </svg>
</div>
<div class="flex items-center justify-center gap-5 pr-10">
<button>
  <svg class="h-6 w-6 ">
    <use xlink:href="/assets/icons/icon.svg#bellicon"></use>
  </svg>
</button> 
  <figure class=" ">
    <img class="rounded-full m-1" width="39" height="39" src="/assets/images/profile2.jpg" alt="Profile">
  </figure>
<div class="relative">
  <button id="modalname" class="text-white font-medium font-roboto rounded-lg text-base text-center inline-flex items-center" type="button" data-dropdown-toggle="dropdown">  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
</svg></button>
  <!-- Dropdown menu -->
  <div class="hidden bg-white text-base z-50   list-none divide-y divide-gray-100 rounded shadow my-4" id="dropdown" style="position: absolute; inset: 0 auto auto 0; margin: 0px; transform: translate3d(-30px, 40.6px, 0px);" data-popper-placement="bottom">
    <div class="px-4 py-3">
      <span id="dropdownname" class=" hidden text-sm"></span>
      <span id="dropdownemail" class="block text-sm   font-semibold text-gray-900 truncate"></span>
        <span class="block text-sm font-medium  text-boulder-500 truncate">Hr Admin</span>
    </div>
    <ul class="py-1" aria-labelledby="dropdown">
      <li>
        <a href="#" id="signout" class="text-sm flex flex-row hover:bg-gray-100 text-black gap-2 items-center   px-4 py-2">
          <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.36693 10.7338L9.42474 8.67581H3.60634C2.77053 8.67581 2.77053 7.40607 3.60634 7.40607H9.42492L7.36693 5.34826L8.26452 4.45067C8.65792 4.84407 11.3988 7.53649 11.5051 7.72022C11.6544 7.97817 11.6068 8.29105 11.4017 8.49406L8.26452 11.6314L7.36693 10.7338ZM6.748 1.26956V0H2.56122C1.3466 0 0.35498 0.991619 0.35498 2.20624V13.8758C0.35498 15.0904 1.3466 16.0821 2.56122 16.0821H6.74818V14.8125H2.56122C2.04731 14.8125 1.62454 14.3897 1.62454 13.8758V2.20624C1.62454 1.69233 2.04731 1.26956 2.56122 1.26956H6.748Z" fill="black"></path>
</svg>
<span class="font-roboto  font-medium"> Log Out</span></a>
      </li>
    </ul>
  </div>
  <!-- Dropdown menu -->
  </div>
</div>
</header>

`;

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
  let modal = document.getElementById("modal");
  let closeButton = document.getElementById("closeButton");
  const inviteSubmit = document.getElementById("inviteSubmit");

  todashboard.addEventListener("click", () => {
    console.log("inviteButton dash");
    window.location.href = "/dashboard";
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
  console.log(userdata, "Dddd");
  let name = document.getElementById("name");
  let modalname = document.getElementById("modalname");
  let dropdown = document.getElementById("dropdown");
  modalname.addEventListener("click", function () {
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  });
  let dropdownname = document.getElementById("dropdownname");
  let dropdownemail = document.getElementById("dropdownemail");

  console.log(userdata);
  dropdownemail.textContent = userdata.data.email;
  console.log(dropdownemail.textContent);
  if (name) {
    name.textContent = userdata.data.first_name + " " + userdata.data.last_name;
  }

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
    const invitemodal = document.createElement("div");
    invitemodal.id = "removemodal";
    invitemodal.innerHTML = `      <div
    id="modal"
    class="modal hidden fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-40 flex justify-center items-center"
  >
    <div
      class="modal-content p-8 bg-white rounded-lg shadow-xl w-full max-w-xl"
    >
      <div class="modal-header flex items-center justify-between mb-4">
        <h1 class="modal-title text-xl font-medium text-gray-800">
          Invite member
        </h1>
        <button
          id="closeButton"
          class="close-button text-gray-600 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <p class="modal-text text-sm text-gray-500">
        Send invitation to the user for joining the platform
      </p>
      <form id="inviteForm" class="invite-form">
        <div class="mb-4">
          <label
            for="userName"
            class="pt-2 block text-sm text-gray-700 capitalize"
            >User name</label
          >
          <input
            id="userName"
            placeholder="Arthur Melo"
            type="text"
            class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
          />
        </div>

        <div class="mb-4">
          <label
            for="userEmail"
            class="block text-sm text-gray-700 capitalize"
            >User email</label
          >
          <input
            id="userEmail"
            placeholder="arthurmelo@example.app"
            type="email"
            class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
          />
        </div>

        <div class="flex justify-end">
          <button
            id="inviteSubmit"
            type="button"
        
            class="invite-submit px-3 py-2 text-sm text-white capitalize transition-colors duration-200 bg-indigo-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50 hover:bg-indigo-600"
          >
            Invite Member
          </button>
        </div>
      </div>
     
      </form>
    </div>`;
    document.getElementsByTagName("main")[0].appendChild(invitemodal);
    console.log("clicked");
    modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "flex";
    }
    closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }
  });

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      const removemodal = document.getElementById("removemodal");
      removemodal.remove();
      modal.style.display = "none";
    });
  }
}

// <div class="tooltip">
//   <div
//     class="absolute top-1 -right-24 flex flex-row justify-center items-center gap-0"
//   >
//     <svg class="z-10 order-1 w-[9px] h-[13px]">
//       <use xlink:href="./assets/icons/icon.svg#triangle"></use>
//     </svg>

//     <div
//       class="tooltip order-2 bg-[#eaeeff] font-sfprodisplay font-medium text-deep-cove-950 text-sm rounded p-2"
//     >
//       Dashboard
//     </div>
//   </div>
// </div>
