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
  Invite Memeber</div>
</div>
<svg

class="h-[2.5rem] w-[2.5rem] p-2  "

>
<use xlink:href="/assets/icons/icon.svg#document"></use>
</svg>


</div>
  
 
</div>
</aside>`;

export function InsertNavbar() {
  const body = document.getElementsByTagName("body")[0];
  const navcomp = document.createElement("nav");
  navcomp.innerHTML = NavBar;

  body.insertBefore(navcomp, body.firstChild);
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
