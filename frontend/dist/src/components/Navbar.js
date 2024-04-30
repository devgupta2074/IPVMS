const NavBar = `
<aside
class="h-full col-start-1 col-end-2 px-6 bg-gulf-blue-950"
>


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
  Invite Memeber</div>
</div>
<svg

class="h-[2.5rem] w-[2.5rem] p-2  "

>
<use xlink:href="/assets/icons/icon.svg#document"></use>
</svg>


</div>
  
 
</div>
</aside>
<header
class="w-full py-5 pl-8  bg-gulf-blue-950 flex items-center justify-end gap-5 col-span-full"
>
<img class="h-[39px] w-[39px]" src="/assets/images/exsquared.png">
<div
  class="flex-1 ml-5 flex items-center justify-end relative gap-3"
>
  <input
    type="name"
    name="search"
    type="text"
    id="search"
    class="w-[17.5rem] p-2 font-roboto text-[0.9375rem] leading-[1.0985rem] placeholder:text-white font-medium rounded-full shadow-md text-white bg-astronaut-900 hover:border-none focus:border-none"
    placeholder="Search"
  />
  <svg class="h-6 w-6 z-50 -ml-12 mt-1">
    <use xlink:href="/assets/icons/icon.svg#search-icon"></use>
  </svg>
</div>
<div class="flex items-center justify-center gap-5 pr-10">
  <svg class="h-6 w-6 ">
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
      <span id="dropdownname" class=" hidden text-sm"></span>
      <span id="dropdownemail" class="block text-sm   font-semibold text-gray-900 truncate"
        ></span>
        <span  class="block text-sm font-medium  text-boulder-500 truncate"
        >Hr Admin</span>
    </div>
    <ul class="py-1" aria-labelledby="dropdown">
      <li>
        <a
          href="#"
          id="signout"
          class="text-sm flex flex-row hover:bg-gray-100 text-black gap-2 items-center   px-4 py-2"
          >
          <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.36693 10.7338L9.42474 8.67581H3.60634C2.77053 8.67581 2.77053 7.40607 3.60634 7.40607H9.42492L7.36693 5.34826L8.26452 4.45067C8.65792 4.84407 11.3988 7.53649 11.5051 7.72022C11.6544 7.97817 11.6068 8.29105 11.4017 8.49406L8.26452 11.6314L7.36693 10.7338ZM6.748 1.26956V0H2.56122C1.3466 0 0.35498 0.991619 0.35498 2.20624V13.8758C0.35498 15.0904 1.3466 16.0821 2.56122 16.0821H6.74818V14.8125H2.56122C2.04731 14.8125 1.62454 14.3897 1.62454 13.8758V2.20624C1.62454 1.69233 2.04731 1.26956 2.56122 1.26956H6.748Z" fill="black"/>
</svg>
<span class="font-roboto  font-medium"> Log Out</span></a
        >
      </li>
    </ul>
  </div>
  <!-- Dropdown menu -->
</div>
</header>`;

export function InsertNavbar() {
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
}

export function NavbarHoverFunctionality() {
  document.querySelectorAll(".sidebar-icon").forEach((item) => {
    console.log();
    item.addEventListener("mouseover", (event) => {
      console.log(item);
      const tooltipText = event.target.getAttribute("data-tooltip");
      const tooltip = document.querySelector(".tooltip");
      tooltip.innerText = tooltipText;
      tooltip.style.display = "block";
      tooltip.style.top = event.pageY + "px";
      tooltip.style.left = event.pageX + "px";
    });

    item.addEventListener("mouseout", () => {
      const tooltip = document.querySelector(".tooltip");
      tooltip.style.display = "none";
    });
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
