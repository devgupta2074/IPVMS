import { UserInfoApiRequest } from "../api/dashboard.js";
import { GetAllTemplates } from "../api/getAllTemplates.js";
import { GetAllUsers } from "../api/getAllUsers.js";
import { addTable, sortTable, getdate } from "../components/TableGenerator.js";
import { InsertNavbar } from "../components/Navbar.js";
import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ERRORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";
import { debounce } from "../utils/debouncing.js";
import { docsstyle } from "../utils/docxstyle.js";
import { redirect, showNextPolicy } from "../utils/utils.js";
var maxPages = 10;
var pageSize = 5;
var currentPage = 1;
var totalItems;
// const docCard = (title, category, created_by, created_at, id) => {
//   let date = new Date(created_at);
//   date = date.toLocaleDateString("en-GB");
//   // console.log(created_at);
//   return `

//   <tr

//   class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in"
// >
//   <td class="w-14">${id}</td>
//   <td class="w-52">${title}</2td>
//   <td class="w-28">${created_by}</td>
//   <td class="w-28">${date}</td>
//   <td class="w-28">Admin</td>
//   <td class="w-28">${date}</td>
//   <td class="w-28">${created_by}</td>
//   <td class="w-28">
//     <div class="flex gap-1">
//       <button onclick="openEditor(${id})">
//         <svg id="greenpen" class="h-6 w-4">
//           <use
//             xlink:href="/assets/icons/icon.svg#greenpen"
//           ></use>
//         </svg>
//       </button>

//       <button onclick="openModal(${id})">
//         <svg id="redeye" class="h-6 w-6">
//           <use
//             xlink:href="/assets/icons/icon.svg#redeye"
//           ></use>
//         </svg>
//       </button>

//       <a href="/policydownload/${id}" target="_blank" >
//         <svg id="download" class="h-6 w-6">
//           <use
//             xlink:href="/assets/icons/icon.svg#download"
//           ></use>
//         </svg>
//       </a>
//     </div>
//   </td>
// </tr>

//       `;
//   //   .toLocaleDateString('en-GB')
// };

// const fetchDoc = async (currentPage, pageSize) => {
//   // document.getElementById("loading").style = "display:block";
//   // if (category == "Select a category") {
//   //   category = "";
//   // }
//   const response = await fetch(
//     `http://localhost:5001/api/file/getpaginateddocuments?page=${currentPage}&size=${pageSize}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response from the backend
//       console.log(data);
//       if (data.success == false) {
//         const parentElement = document.getElementById("tbody");
//         parentElement.innerHTML = "No data found";
//       } else {
//         totalItems = data?.data[0]?.total_count;
//         const parentElement = document.getElementById("tbody");
//         parentElement.innerHTML = "";
//         // document.getElementById("main-body").innerHTML = "";
//         data.data.map((item) => {
//           console.log(item);
//           parentElement.innerHTML += docCard(
//             item.title || "demo",
//             item.category_name,
//             item.created_by,
//             item.created_at,
//             item.id
//           );

//           // document.getElementById("main-body").innerHTML += docxModal(item.id);
//           // document.getElementById(item.id).style.display = "none";
//         });
//       }
//     });

//   // document.getElementById("loading").style = "display:none";
// }

async function getTemplateInfo(templateId) {
  document.getElementById("selectedtemplate").innerHTML = `
  <div>
  <div
    class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
  >
    <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
      <use xlink:href="./assets/icons/icon.svg#threedots"></use>
    </svg>

    <svg class="w-[260px] h-[150px]">
      <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
    </svg>
  </div>
  <div
    class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
  >
    <div class="text-base">Increment Letter</div>
    <div class="text-sm">Mar 26, 2023</div>
  </div>
</div>`;
}
async function getUserInfoToDisplay(userId) {
  console.log(userId);
  const response = await fetch(
    `http://localhost:5001/api/user/getUserInfo/${userId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const result = data.data;
      // Handle the response from the backend
      console.log(result, "hello user changed");
      const additionaldetails = document.getElementById("additionaldetails");
      additionaldetails.innerHTML = ` <div
      id="userdetails"
      class="w-full mt-5 p-6 rounded-lg grid grid-cols-2 gap-5 bg-white"
    >
      <div class="flex flex-row gap-6 items-center">
        <div
          class="rounded-full bg-gallery-100 flex items-center justify-center font-roboto p-5 leading-7 font-semibold text-2xl"
        >
         ${
           result.first_name.charAt(0).toUpperCase() +
           result.last_name.charAt(0).toUpperCase()
         }
        </div>
        <div class="font-roboto font-normal text-base leading-6">
          <div class="text-mineshaft-900">${
            result.first_name + " " + result.last_name
          }</div>
          <div class="text-mineshaft-600">${result.designation}</div>
        </div>
      </div>
      <div
        class="flex flex-row justify-between items-center font-roboto font-normal text-sm leading-6"
      >
        <div class="flex flex-col gap-1">
          <p class="text-mineshaft-900 leading-5">Employee ID</p>
          <p class="text-mineshaft-600 leading-6 text-base">${
            result.employee_code
          }</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-mineshaft-900 leading-5">Work email</p>
          <p class="text-mineshaft-600 leading-6 text-base">
            ${result.email}
          </p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-mineshaft-900">Phone Number</p>
          <p class="text-mineshaft-600 leading-6 text-base">
           ${result.mobile_number}
          </p>
        </div>
      </div>
    </div>
    <div id="selectedtemplate" class="flex mt-5">
   
    </div>
    <div class="mt-10 pt-5 border-t">
      <div class="">
        <div
          class="font-roboto text-mineshaft-900 font-semibold text-lg leading-5"
        >
          Sent Letters
        </div>
        <span
          class="font-robot text-mineshaft-600 text-sm font-normal leading-4"
          >Here you can find all the letters issued by the company.</span
        >
      </div>
      <div
        id="olduserletters"
        class="flex flex-row gap-5 overflow-x-scroll no-scrollbar mt-5"
      >
        <div>
          <div
            class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
          >
            <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
              <use xlink:href="./assets/icons/icon.svg#threedots"></use>
            </svg>

            <svg class="w-[260px] h-[150px]">
              <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
            </svg>
          </div>
          <div
            class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
          >
            <div class="text-base">Increment Letter</div>
            <div class="text-sm">Mar 26, 2023</div>
          </div>
        </div>
        <div>
          <div
            class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
          >
            <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
              <use xlink:href="./assets/icons/icon.svg#threedots"></use>
            </svg>

            <svg class="w-[260px] h-[150px]">
              <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
            </svg>
          </div>
          <div
            class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
          >
            <div class="text-base">Increment Letter</div>
            <div class="text-sm">Mar 26, 2023</div>
          </div>
        </div>
      </div>
    </div>`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
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
InsertNavbar();
const sendletters = document.getElementById("sendletters");
const recentsendletters = document.getElementById("recentsentletters");
const lettertemplates = document.getElementById("lettertemplates");
displayArea();
sendletters.addEventListener("click", function () {
  recentsendletters.classList = "cursor-pointer p-3 px-6";

  lettertemplates.classList = "cursor-pointer p-3 px-6";
  sendletters.classList =
    "cursor-pointer p-3 active text-blue-700 border-b-4 border-blue-700 px-6";
  displayArea();
});

recentsendletters.addEventListener("click", function () {
  recentsendletters.classList =
    "cursor-pointer p-3 active text-blue-700 border-b-4 border-blue-700 px-6";

  lettertemplates.classList = "cursor-pointer p-3 px-6";
  sendletters.classList = "cursor-pointer p-3 px-6";
  displayArea();
});

lettertemplates.addEventListener("click", function () {
  recentsendletters.classList = "cursor-pointer p-3 px-6";

  lettertemplates.classList =
    "cursor-pointer p-3 active text-blue-700 border-b-4 border-blue-700 px-6";
  sendletters.classList = "cursor-pointer p-3 px-6";
  displayArea();
});
function displayArea() {
  if (sendletters.classList.contains("active")) {
    if (document.getElementById("area")) {
      document.getElementById("area").remove();
      console.log("area removed");
    }
    document.getElementById(
      "sectiondetails"
    ).innerHTML = `  <div class="flex flex-col gap-4">
    <div
      class="flex flex-row text-mineshaft-900 justify-start items-start w-full rounded-lg text-2xl font-roboto font-semibold"
    >
      Send Letters
    </div>
    <div class="text-chicago-600 font-roboto text-sm leading-5">
      You can easily search for or select an employee by their name or
      employee ID to send a letter. Simply choose the desired letter
      from the options below, and all relevant data will be
      automatically fetched and filled into the letter. You can also
      preview it before sending it to the employee.
    </div>
  </div>
  <button
    id="generateLetter"
    type="button"
    class="text-link-water-600 text-base bg-link-water-100 hover:bg-link-water-300 focus:ring-4 p-1 w-1/6 h-12  rounded-md"
  >
    Generate Letter
  </button>`;
    console.log(document.getElementsByTagName("main"));
    // if(userId && templateId) {
    //   document.getElementById("generateLetter").classList
    // }
    const area = document.createElement("div");
    area.id = "area";
    area.innerHTML = ` <div id="selectionarea" class="w-full mt-5 flex flex-row gap-5">
    <div class="w-full flex flex-col">
      <div class="w-full flex flex-col">
        <label class="text-chicago-700 font-normal leading-5 mb-2"
          >To*</label
        >
        <button
          id="dropdownSearchButton"
          class="text-chicago-600 leading-5 bg-white w-full font-normal text-sm px-5 py-2.5 flex flex-row items-center"
          type="button"
        >
          <p class="flex-1">Select User</p>
  
          <svg
            class="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>
      <!-- Dropdown menu -->
      <div
        id="dropdownSearchx"
        class="z-10 hidden items-start bg-white rounded-lg shadow w-full"
      >
        <div class="p-3">
          <label for="input-group-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search user"
            />
          </div>
        </div>
        <ul
          class="max-h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700"
          id="search-user"
        ></ul>
      </div>
    </div>
    <div class="w-full flex flex-col">
      <div class="w-full flex flex-col">
        <label class="text-chicago-700 font-normal leading-5 mb-2"
          >Template*</label
        >
        <button
          class="text-chicago-600 leading-5 bg-white w-full font-normal text-sm px-5 py-2.5 flex flex-row items-center"
          type="button"
          id="dropdownUsersButton"
        >
          <p class="flex-1">Select Template</p>
  
          <svg
            class="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>
      <!-- Dropdown menu -->
      <div
        class="z-10 overflow-y-auto max-h-48 hidden items-start w-full bg-white divide-y divide-gray-100 rounded-lg shadow"
        id="dropdownUser"
      >
        <ul
          id="template_option"
          class="p-3 space-y-1 text-sm text-chicago-700"
          aria-labelledby="dropdownUsersButton"
        ></ul>
      </div>
    </div>
  </div>
  <div id="additionaldetails"></div>`;
    document.getElementsByTagName("main")[0].appendChild(area);
    var userId;
    var templateId;
    const make_user = (name, email, code, created_at, updated_at, id) => {
      return ` <li >
    <div class="flex items-center ps-2 rounded hover:bg-gray-100 ">
    
      <label   id=${id} class=" flex flex-row justify-between  items-center w-full py-2 ms-2 text-sm font-normal text-chicago-700 rounded ">${name}</label>
    </div>
  </li>`;
    };

    const make_template = (title, id) => {
      return `<li>
      <div
        class="flex items-center p-2 rounded hover:bg-gray-100 "
      >
       
        <label
        id=${id}
          for="checkbox-item-5"
          class="flex flex-row items-center justify-between w-full ms-2 text-sm font-normal text-chicago-700 rounded "
          >${title}</label
        >
      </div>
    </li>`;
    };

    async function getAllUsers() {
      const name = document.getElementById("search").value;
      console.log(name, "name is");
      document.getElementById("search-user").innerHTML = "";

      const result = await GetAllUsers(name);
      if (result.data) {
        result.data.map((item) => {
          console.log("name", item.first_name + item.last_name);
          document.getElementById("search-user").innerHTML += make_user(
            item.first_name + " " + item.last_name,
            item.email,
            item.employee_code,
            item.created_at,
            item.updated_at,
            item.id
          );
        });
      }
    }
    async function getAllTemplates() {
      const tempresult = await GetAllTemplates();
      document.getElementById("template_option").innerHTML = "";
      console.log(tempresult);
      tempresult.data.map((item) => {
        document.getElementById("template_option").innerHTML += make_template(
          item.title,
          item.id
        );
      });
    }
    getAllUsers();
    getAllTemplates();
    console.log(document.getElementById("template_option"));
    document.getElementById("search").addEventListener("input", () => {
      debounce(getAllUsers(), 250);
    });

    document
      .getElementById("template_option")
      .addEventListener("click", (event) => {
        console.log(event.target, "event");

        if (event.target.tagName === "LABEL") {
          console.log("event target", event.target);
          document
            .querySelectorAll("#template_option label")
            .forEach((label) => {
              label.innerHTML = label.textContent;
            });

          templateId = event.target.id;
          document.getElementById(
            "dropdownUsersButton"
          ).innerHTML = `<p class="flex-1">${event.target.textContent}</p>   <svg
        class="w-2.5 h-2.5 ms-3"
        
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />`;
          // set id to selected user
          const checkSymbol = document.createElement("div");
          checkSymbol.classList.add("check-symbol");
          checkSymbol.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
      <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
      </svg>`;
          event.target.appendChild(checkSymbol);
          getTemplateInfo(templateId);
          if (userId && templateId) {
            document.getElementById("generateLetter").className =
              "text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 p-1 w-1/6 h-12  rounded-md";
          }

          const selectedusersearchmodal =
            document.getElementById("dropdownUser");
          if (selectedusersearchmodal.classList.contains("hidden")) {
            selectedusersearchmodal.classList.remove("hidden");
          } else {
            selectedusersearchmodal.classList.add("hidden");
          }
          // console.log(id);
        }
      });
    // can click on parent element to get target elemnt of child
    document
      .getElementById("search-user")
      .addEventListener("click", (event) => {
        console.log(event.target, "event");
        if (event.target.tagName === "LABEL") {
          console.log("event target", event.target);
          userId = event.target.id;
          document.querySelectorAll("#search-user label").forEach((label) => {
            label.innerHTML = label.textContent;
          });
          document.getElementById(
            "dropdownSearchButton"
          ).innerHTML = `<p class="flex-1">${event.target.textContent}</p>   <svg
        class="w-2.5 h-2.5 ms-3"
        
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />`;

          // set id to selected user
          const checkSymbol = document.createElement("div");
          checkSymbol.classList.add("check-symbol");
          checkSymbol.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
      <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
      </svg>`;
          event.target.appendChild(checkSymbol);
          getUserInfoToDisplay(userId);
          if (userId && templateId) {
            document.getElementById("generateLetter").className =
              "text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 p-1 w-1/6 h-12  rounded-md";
          }
          const selectedusersearchmodal =
            document.getElementById("dropdownSearchx");
          if (selectedusersearchmodal.classList.contains("hidden")) {
            selectedusersearchmodal.classList.remove("hidden");
          } else {
            selectedusersearchmodal.classList.add("hidden");
          }
          // console.log(id);
        }
      });
    const dropDownBtn = document.getElementById("dropdownUsersButton");

    const dropDownMenu = document.getElementById("dropdownUser");
    dropDownBtn.addEventListener("click", (event) => {
      //event.stopPropagation();
      toggleDropDown();
    });
    const toggleDropDown = () => {
      dropDownMenu.classList.toggle("hidden");
    };
    const dropDownBtn2 = document.getElementById("dropdownSearchButton");

    const dropDownMenu2 = document.getElementById("dropdownSearch");
    dropDownBtn2.addEventListener("click", (event) => {
      //event.stopPropagation();
      toggleDropDown2();
    });
    const toggleDropDown2 = () => {
      dropDownMenu2.classList.toggle("hidden");
    };

    document.getElementById("generateLetter").addEventListener("click", () => {
      generateLetter();
    });
    const generateLetter = () => {
      console.log("on click");
      console.log("user id", userId);
      console.log("template id", templateId);
      window.location.href = `http://localhost:5555/template?templateId=${templateId}&userId=${userId}`;
    };
    document.addEventListener("DOMContentLoaded", async () => {});

    const selectuserbutton = document.getElementById("dropdownSearchButton");

    selectuserbutton.addEventListener("click", (event) => {
      const selectedusersearchmodal =
        document.getElementById("dropdownSearchx");
      if (selectedusersearchmodal.classList.contains("hidden")) {
        selectedusersearchmodal.classList.remove("hidden");
      } else {
        selectedusersearchmodal.classList.add("hidden");
      }
    });
  }

  if (recentsendletters.classList.contains("active")) {
    if (document.getElementById("area")) {
      document.getElementById("area").remove();
    }

    document.getElementById("sectiondetails").innerHTML = "";

    console.log(document.getElementsByTagName("main"));
    const area = document.createElement("div");
    area.id = "area";
    area.innerHTML = `<div id="insert-table"></div>`;

    document.getElementsByTagName("main")[0].appendChild(area);
    addTable();
    // fetchDoc(currentPage - 1, pageSize);

    // const sortButtons = document.querySelectorAll(".sort");
    // sortButtons.forEach((e, index) => {
    //   e.addEventListener("click", () => {
    //     console.log(index);
    //     window.event.preventDefault();
    //     sortTable(index, 0);
    //   });
    // });
  }
  if (lettertemplates.classList.contains("active")) {
    if (document.getElementById("area")) {
      document.getElementById("area").remove();
    }

    document.getElementById(
      "sectiondetails"
    ).innerHTML = `  <div class="flex flex-col gap-4">
    <div
      class="flex flex-row text-mineshaft-900 justify-start items-start w-full rounded-lg text-2xl font-roboto font-semibold"
    >
      Letter Templates
    </div>
    <div class="text-chicago-600 font-roboto text-sm leading-5">
    HR template categories are groups of similar HR letter templates. They help organize and make it easier to find the templates you need. On this page, you can see different categories, add new ones, change existing ones, and more.
    </div>
  </div>
  <button
    id="generateLetter"
    type="button"
    class="text-white font-roboto font-medium leading-5 text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 p-1 w-1/6 h-12 rounded-md inline-flex items-center gap-2 pl-4 "  >
  <svg width="14" height="14" viewBox="0 0 14 14 " class=ml-2 fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white"/>
</svg>

    Add New Letter
  </button>`;
    console.log(document.getElementsByTagName("main"));
    const area = document.createElement("div");
    area.id = "area";
    area.innerHTML = `<div class="mt-5 ">
    <div class="text-mineshaft-900 font-roboto font-semibold text-base leading-4">Draft Template
    </div><div class="flex flex-row mt-5 gap-5 no-scrollbar overflow-x-scroll "> 
    <div>
    <div
      class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
    >
      <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
        <use xlink:href="./assets/icons/icon.svg#threedots"></use>
      </svg>
  
      <svg class="w-[260px] h-[150px]">
        <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
      </svg>
    </div>
    <div
      class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
    >
      <div class="text-base">Increment Letter</div>
      <div class="text-sm">Mar 26, 2023</div>
    </div>
  </div>
  <div>
  <div
    class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
  >
    <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
      <use xlink:href="./assets/icons/icon.svg#threedots"></use>
    </svg>

    <svg class="w-[260px] h-[150px]">
      <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
    </svg>
  </div>
  <div
    class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
  >
    <div class="text-base">Increment Letter</div>
    <div class="text-sm">Mar 26, 2023</div>
  </div>
</div>
 <div>
    <div
      class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
    >
      <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
        <use xlink:href="./assets/icons/icon.svg#threedots"></use>
      </svg>
  
      <svg class="w-[260px] h-[150px]">
        <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
      </svg>
    </div>
    <div
      class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
    >
      <div class="text-base">Increment Letter</div>
      <div class="text-sm">Mar 26, 2023</div>
    </div>
  </div>
  <div>
  <div
    class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
  >
    <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
      <use xlink:href="./assets/icons/icon.svg#threedots"></use>
    </svg>

    <svg class="w-[260px] h-[150px]">
      <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
    </svg>
  </div>
  <div
    class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
  >
    <div class="text-base">Increment Letter</div>
    <div class="text-sm">Mar 26, 2023</div>
  </div>
</div>
<div>
<div
  class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
>
  <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
    <use xlink:href="./assets/icons/icon.svg#threedots"></use>
  </svg>

  <svg class="w-[260px] h-[150px]">
    <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
  </svg>
</div>
<div
  class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
>
  <div class="text-base">Increment Letter</div>
  <div class="text-sm">Mar 26, 2023</div>
</div>
</div>
<div>
<div
  class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
>
  <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
    <use xlink:href="./assets/icons/icon.svg#threedots"></use>
  </svg>

  <svg class="w-[260px] h-[150px]">
    <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
  </svg>
</div>
<div
  class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
>
  <div class="text-base">Increment Letter</div>
  <div class="text-sm">Mar 26, 2023</div>
</div>
</div>
   </div>
   <div class="text-mineshaft-900 font-roboto font-semibold text-base leading-4 mt-5">Draft Template
   </div><div class="flex flex-row mt-5 gap-5 no-scrollbar overflow-x-scroll "> 
   <div>
   <div
     class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
   >
     <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
       <use xlink:href="./assets/icons/icon.svg#threedots"></use>
     </svg>
 
     <svg class="w-[260px] h-[150px]">
       <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
     </svg>
   </div>
   <div
     class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
   >
     <div class="text-base">Increment Letter</div>
     <div class="text-sm">Mar 26, 2023</div>
   </div>
 </div>
 <div>
 <div
   class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
 >
   <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
     <use xlink:href="./assets/icons/icon.svg#threedots"></use>
   </svg>

   <svg class="w-[260px] h-[150px]">
     <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
   </svg>
 </div>
 <div
   class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
 >
   <div class="text-base">Increment Letter</div>
   <div class="text-sm">Mar 26, 2023</div>
 </div>
</div>
<div>
   <div
     class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
   >
     <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
       <use xlink:href="./assets/icons/icon.svg#threedots"></use>
     </svg>
 
     <svg class="w-[260px] h-[150px]">
       <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
     </svg>
   </div>
   <div
     class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
   >
     <div class="text-base">Increment Letter</div>
     <div class="text-sm">Mar 26, 2023</div>
   </div>
 </div>
 <div>
 <div
   class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
 >
   <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
     <use xlink:href="./assets/icons/icon.svg#threedots"></use>
   </svg>

   <svg class="w-[260px] h-[150px]">
     <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
   </svg>
 </div>
 <div
   class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
 >
   <div class="text-base">Increment Letter</div>
   <div class="text-sm">Mar 26, 2023</div>
 </div>
</div>
<div>
<div
 class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
>
 <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
   <use xlink:href="./assets/icons/icon.svg#threedots"></use>
 </svg>

 <svg class="w-[260px] h-[150px]">
   <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
 </svg>
</div>
<div
 class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
>
 <div class="text-base">Increment Letter</div>
 <div class="text-sm">Mar 26, 2023</div>
</div>
</div>
<div>
<div
 class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
>
 <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
   <use xlink:href="./assets/icons/icon.svg#threedots"></use>
 </svg>

 <svg class="w-[260px] h-[150px]">
   <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
 </svg>
</div>
<div
 class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
>
 <div class="text-base">Increment Letter</div>
 <div class="text-sm">Mar 26, 2023</div>
</div>
</div>
  </div>
  <div class="text-mineshaft-900 font-roboto font-semibold text-base leading-4 mt-5">Draft Template
  </div><div class="flex flex-row mt-5 gap-5 no-scrollbar overflow-x-scroll "> 
  <div>
  <div
    class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
  >
    <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
      <use xlink:href="./assets/icons/icon.svg#threedots"></use>
    </svg>

    <svg class="w-[260px] h-[150px]">
      <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
    </svg>
  </div>
  <div
    class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
  >
    <div class="text-base">Increment Letter</div>
    <div class="text-sm">Mar 26, 2023</div>
  </div>
</div>
<div>
<div
  class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
>
  <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
    <use xlink:href="./assets/icons/icon.svg#threedots"></use>
  </svg>

  <svg class="w-[260px] h-[150px]">
    <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
  </svg>
</div>
<div
  class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
>
  <div class="text-base">Increment Letter</div>
  <div class="text-sm">Mar 26, 2023</div>
</div>
</div>
<div>
  <div
    class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
  >
    <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
      <use xlink:href="./assets/icons/icon.svg#threedots"></use>
    </svg>

    <svg class="w-[260px] h-[150px]">
      <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
    </svg>
  </div>
  <div
    class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
  >
    <div class="text-base">Increment Letter</div>
    <div class="text-sm">Mar 26, 2023</div>
  </div>
</div>
<div>
<div
  class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
>
  <svg class="absolute top-0 right-0 w-4 h-8 mt-4">
    <use xlink:href="./assets/icons/icon.svg#threedots"></use>
  </svg>

  <svg class="w-[260px] h-[150px]">
    <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
  </svg>
</div>
<div
  class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
>
  <div class="text-base">Increment Letter</div>
  <div class="text-sm">Mar 26, 2023</div>
</div>
</div>
<div>
<div
class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
>
<svg class="absolute top-0 right-0 w-4 h-8 mt-4">
  <use xlink:href="./assets/icons/icon.svg#threedots"></use>
</svg>

<svg class="w-[260px] h-[150px]">
  <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
</svg>
</div>
<div
class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
>
<div class="text-base">Increment Letter</div>
<div class="text-sm">Mar 26, 2023</div>
</div>
</div>
<div>
<div
class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative"
>
<svg class="absolute top-0 right-0 w-4 h-8 mt-4">
  <use xlink:href="./assets/icons/icon.svg#threedots"></use>
</svg>

<svg class="w-[260px] h-[150px]">
  <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
</svg>
</div>
<div
class="bg-white rounded-b-lg p-1 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center"
>
<div class="text-base">Increment Letter</div>
<div class="text-sm">Mar 26, 2023</div>
</div>
</div>
 </div> </div>`;
    document.getElementsByTagName("main")[0].appendChild(area);
  }
}
