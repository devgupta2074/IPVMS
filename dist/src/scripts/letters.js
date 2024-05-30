import { UserInfoApiRequest } from "../api/dashboard.js";
import {
  GetAllTemplates,
  GetAllTemplatesByStatus,
} from "../api/getAllTemplates.js";
import { GetAllUsers } from "../api/getAllUsers.js";
import { addTable, sortTable, getdate } from "../components/TableGenerator.js";
import { addTable1 } from "../components/TableGenerator1.js";
import { InsertNavbar } from "../components/Navbar.js";
import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  style,
  TOAST_COLORS,
  TOAST_ERRORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";
import { debounce } from "../utils/debouncing.js";
import { docsstyle } from "../utils/docxstyle.js";
import { redirect, showNextPolicy } from "../utils/utils.js";
import { GetAllCategory } from "../api/getAllCategories.js";
import { DELETETEMPLATE } from "../api/deleteTemplate.js";
import { imageLoaded } from "./versioncontrol.js";

// global variables

// import { BulkUpload } from "./uploadpolicy1.js"; https://minio-endpoint.skilldify.ai/ipvms-dev/letter%20%282%291715594368336.pdf?X-Amz-Algo[%E2%80%A6]6a3f4f52bee565018c18fcf38d5704243e8a78ddf35ac50fb4db61b
function extractParentText(parentId) {
  const parentElement = document.getElementById(parentId);
  // console.log(parentId);
  let textContent = "";

  // Iterate over child nodes
  if (parentElement !== null && parentElement.childNodes.length > 0) {
    for (let i = 0; i < parentElement.childNodes.length; i++) {
      const childNode = parentElement.childNodes[i];
      // Check if the node is a text node
      if (childNode.nodeType === Node.TEXT_NODE) {
        textContent += childNode.textContent;
      }
    }
  } else {
    textContent = parentElement.textContent;
  }

  return textContent;
}
export function extractHtmlToJson(divElement) {
  const jsonOutput = {};
  // console.log(document.getElementsByClassName("docx-wrapper-1"));
  const htmlTags = divElement.getElementsByTagName("*");
  console.log(htmlTags, "html");

  for (let i = 0; i < htmlTags.length; i++) {
    const tag = htmlTags[i];
    const children = tag.children;
    const childrens = tag.parentElement.children;
    let position = -1; // Default position if tag is not found in its parent's children list

    // Find the position of the tag within its parent's children
    if (childrens) {
      for (let j = 0; j < childrens.length; j++) {
        if (childrens[j] === tag) {
          position = j;
          break;
        }
      }
    }

    // if (children.length === 0) {
    // Check if the tag has no children
    const tagId = tag.id;
    const isImgTag = tag.tagName.toLowerCase() === "img";
    const isLinkTag = tag.tagName.toLowerCase() === "a";

    jsonOutput[tagId] = {
      textContent: extractParentText(tag.id),
      textcontentcombined: tag.textContent,
      id: tagId,
      parentId: tag.parentElement.id || "root",
      style: tag.getAttribute("style") || "",
      isTagImg: isImgTag,
      isTagLink: isLinkTag,
      class: tag.className,
      src: isImgTag ? tag.getAttribute("src") : "",
      tagName: tag.tagName.toLowerCase(),
      position: position,
    };
  }

  return jsonOutput;
}
export const modalHtml = `<div id="container-html1" class="hidden">
<!--  this will be hidden for rendering docx  -->
</div>


<div
id="modalupload"
class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
>
<!-- Modal Content -->
<div class="bg-white rounded-lg shadow-lg h-[30rem]">
  <div class="flex flex-col items-center w-[40rem] p-6 gap-8 rounded-lg">
    <div class="flex flex-row justify-between items-center w-full">
      <div class="flex flex-col justify-between items-start h-14">
        <h2 class="text-xl font-semibold">Upload Files</h2>
        <p
          class="font-normal text-sm text-[#5D5D5D] hidden"
          id="upload-message"
        >
          Upload the required documents and select their respective fields
          in the dropdown.
        </p>
      </div>
      <button
        id="closeModalBtn"
        class="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
    <div
      class="flex w-full h-full flex-col gap-8 items-center"
      id="upload-content"
    >
      <label
        for="dropzone-file"
        class="flex items-center justify-center w-full p-6 rounded-md bg-[#EBF3FF80] border border-dashed border-[#0052F194]"
      >
        <div class="flex flex-col items-center justify-center gap-5">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.125 24.7504C2.86698e-05 25.8754 1.12503 13.5004 10.125 14.6254C6.75003 2.25036 25.875 2.25036 24.75 11.2504C36 7.87536 36 25.8754 25.875 24.7504M12.375 20.2504L18 15.7504M18 15.7504L23.625 20.2504M18 15.7504V32.6254"
              stroke="#1F2DE3"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="flex flex-col gap-2 justify-center items-center">
            <p class="font-normal text-base">
              <span>Drag & drop files</span>
              <span class="text-[#1F2DE3]">Browse</span>
            </p>
            <p class="text-[#333333] text-xs">Or</p>
            </div>
          <div
            class="w-full h-8 p-2 rounded-md bg-[#BED5FF] flex items-center justify-center text-[#5D5D5D] text-xs font-normal"
          >
            DOCS are supported
          </div>
        </div>
        <input
          id="dropzone-file"
          accept=".docx"
          type="file"
          class="hidden"
          multiple
        />
      </label>
    </div>
    <div class="w-full h-full flex justify-center items-center">
      <button
        id="uploadbtn"
        class="bg-[#1F2DE3] border rounded-md px-1 py-1 w-28 h-12 text-white font-medium text-base"
        disabled
      >
        Upload
      </button>
      <div class="text-red-600 hidden" id="upload-error">
        no file to upload
      </div>
    </div>
  </div>
</div>
</div>
</body>`;
var maxPages = 10;
var pageSize = 5;
var currentPage = 1;
var totalItems;
// const
//Employee Name = (title, category, created_by, created_at, id) => {
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

//       <button onclick="openLetter(${id})">
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
//  document.getElementById("loading").style = "display:block";
//   // if (category == "Select a category") {
//   //   category = "";
//   // }
//   const response = await fetch(
//     API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getpaginateddocuments?page=${currentPage}&size=${pageSize}`,
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
//           parentElement.innerHTML +=
//Employee Name(
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

//  document.getElementById("loading").style = "display:none";
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

    <svg class="w-[260px] h-[150px] cursor-pointer">
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
    API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/user/getUserInfo/${userId}`,
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

            <svg class="w-[260px] h-[150px] cursor-pointer">
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

            <svg class="w-[260px] h-[150px] cursor-pointer">
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
      console.log("lololololollololol");
      // document.getElementById("loading").style = "display:none";
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
    document.getElementById("loading").style = "display:none";
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
const draftLetters = document.getElementById("draftLetters");
const lettertemplates = document.getElementById("lettertemplates");
displayArea();

sendletters.addEventListener("click", function () {
  recentsendletters.classList = "cursor-pointer p-3 px-6";
  draftLetters.classList = "cursor-pointer p-3 px-6";

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
  draftLetters.classList = "cursor-pointer p-3 px-6";
  displayArea();
});
draftLetters.addEventListener("click", function () {
  draftLetters.classList =
    "cursor-pointer p-3 active text-blue-700 border-b-4 border-blue-700 px-6";
  recentsendletters.classList = "cursor-pointer p-3 px-6";
  lettertemplates.classList = "cursor-pointer p-3 px-6";
  sendletters.classList = "cursor-pointer p-3 px-6";

  displayArea();
});

lettertemplates.addEventListener("click", function () {
  recentsendletters.classList = "cursor-pointer p-3 px-6";
  lettertemplates.classList =
    "cursor-pointer p-3 active text-blue-700 border-b-4 border-blue-700 px-6";
  sendletters.classList = "cursor-pointer p-3 px-6";
  draftLetters.classList = "cursor-pointer p-3 px-6";
  displayArea();
});
async function displayArea() {
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
    disabled
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
    area.innerHTML = ` <div id="selectionarea" class="relative w-full mt-5 flex flex-row gap-5">
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
        class="z-10 absolute top-16  hidden items-start bg-white rounded-lg w-[49%]"
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
        >
       <li >
        <div class="flex items-center ps-2 rounded hover:bg-gray-100 ">
        
          <label id="newuser" class=" flex flex-row justify-between  items-center w-full py-2 ms-2 text-sm font-normal text-chicago-700 rounded ">New User</label>
        </div>
      </li>
        </ul>
        <div id="user_list">
        </div>
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
        class="z-10 absolute top-16 overflow-y-auto max-h-48 hidden items-start w-1/2 bg-white divide-y divide-gray-100 rounded-lg"
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

    const make_template = (title, id, mode, created_by) => {
      console.log(created_by, "ddddd");
      const userid = localStorage.getItem("userid");
      let x = "";
      if (mode === "STANDARD") {
        x = `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">DEFAULT</span>`;
      }
      if (mode === "CUSTOM") {
        x = `<span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">${mode}</span>`;
      }
      if (mode === "DRAFT") {
        x = `<span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"> ${mode}</span>
        `;
      }
      if (mode != "DRAFT") {
        return `<li>
      <div
        class="flex items-center p-2 rounded hover:bg-gray-100 "
      >
       
        <label
        id=${id}
          for="checkbox-item-5"
          class="flex flex-row items-center justify-between w-full ms-2 text-sm font-normal text-chicago-700 rounded "
          >${title} ${x} </label
        >
       
      </div>
    </li>`;
      } else {
        if (parseInt(userid) === created_by) {
          return `<li>
          <div
            class="flex items-center p-2 rounded hover:bg-gray-100 "
          >
           
            <label
            id=${id}
              for="checkbox-item-5"
              class="flex flex-row items-center justify-between w-full ms-2 text-sm font-normal text-chicago-700 rounded "
              >${title} ${x} </label
            >
           
          </div>
        </li>`;
        } else {
          return "";
        }
      }
    };

    async function getAllUsers() {
      const name = document.getElementById("search").value;
      console.log(name, "name is");
      document.getElementById("search-user").innerHTML = "";
      const result = await GetAllUsers(name);
      if (result.data) {
        document.getElementById("search-user").innerHTML = "";
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
      } else {
        document.getElementById("search-user").innerHTML = "";
        document.getElementById("search-user").innerHTML += ` <li >
        <div class="flex items-center ps-2 rounded hover:bg-gray-100 ">
        
          <label   id="newuser" class=" flex flex-row justify-between  items-center w-full py-2 ms-2 text-sm font-normal text-chicago-700 rounded ">New User</label>
        </div>
      </li>`;
      }
    }
    async function getAllTemplates() {
      const tempresult = await GetAllTemplates();
      document.getElementById("template_option").innerHTML = "";
      console.log(tempresult, "STANDARD TEMPLATES");
      tempresult.data.map((item) => {
        document.getElementById("template_option").innerHTML += make_template(
          item.title,
          item.id,
          item.mode,
          item.created_by
        );
      });
    }

    getAllTemplates();
    const getAllUserui = () => {
      document.getElementById("search-user").innerHTML += ` <li >
      <div class="flex items-center ps-2 rounded hover:bg-gray-100 ">
        <label   id="newuser" class=" flex flex-row justify-between  items-center w-full py-2 ms-2 text-sm font-normal text-chicago-700 rounded ">New User</label>
      </div>
    </li>`;
      getAllUsers();
    };
    console.log(document.getElementById("template_option"));
    document.getElementById("search").addEventListener("input", () => {
      document.getElementById("search-user").innerHTML += ` <li >
      <div class="flex items-center ps-2 rounded hover:bg-gray-100 ">
      
        <label   id="newuser" class=" flex flex-row justify-between  items-center w-full py-2 ms-2 text-sm font-normal text-chicago-700 rounded ">New User</label>
      </div>
    </li>`;
      debounce(getAllUserui(), 100);
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
            document.getElementById("generateLetter").disabled = false;
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

      window.location.href = `http://localhost:5555//template?templateId=${templateId}&userId=${userId}`;

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
    document.getElementById("loading").style = "display:block";
    console.log("oooooooooopppppppppppppppppp");
    if (document.getElementById("area")) {
      document.getElementById("area").remove();
    }

    document.getElementById("sectiondetails").innerHTML = "";

    console.log(document.getElementsByTagName("main"));
    const area = document.createElement("div");
    area.id = "area";
    area.innerHTML = `<div id="insert-table">
    
    </div>
    
    `;

    document.getElementsByTagName("main")[0].appendChild(area);
    await addTable();
    document.getElementById("loading").style = "display:none";
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
  if (draftLetters.classList.contains("active")) {
    document.getElementById("loading").style = "display:block";

    if (document.getElementById("area")) {
      document.getElementById("area").remove();
    }

    document.getElementById("sectiondetails").innerHTML = "";

    console.log(document.getElementsByTagName("main"));
    const area = document.createElement("div");
    area.id = "area";
    area.innerHTML = `<div id="insert-table"></div>`;

    document.getElementsByTagName("main")[0].appendChild(area);
    await addTable1();
    document.getElementById("loading").style = "display:none";

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
  <div class="flex flex-row gap-4 w-1/3  justify-end">
    
 <button id="uploadletter"      class=" inline-flex min-w-36 text-[#1F2DE3] p-2 gap-0 items-start h-10 text-sm " >  
  <svg id="upload" class="h-5 w-5 m-1">
    <use
      xlink:href="/assets/icons/icon.svg#upload"
    ></use>
  </svg>
  Upload Letter
</button>
  <button
    onclick="openlettereditor(${0})"
    type="button"
    class="flex min-w-48 text-white font-roboto font-medium leading-5 text-base bg-blue-700 hover:bg-blue-800 focus:ring-4  h-10   rounded-md  items-center gap-2 p-2"  >
  <svg width="14" height="14" viewBox="0 0 14 14 " class=ml-2 fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white"/>
</svg>

    Add New Template
  </button>
 </div>
 
  

 `;
    console.log(document.getElementsByTagName("main"));
    const area = document.createElement("div");
    area.id = "area";
    area.innerHTML = `<div class="mt-5 ">
    <div class="text-mineshaft-900 font-roboto font-semibold text-base leading-4">Default Template
    </div><div id="insert-default" class="flex flex-row mt-5 gap-5 no-scrollbar overflow-x-scroll "> 
    
  

   </div>
   <div class="text-mineshaft-900 font-roboto font-semibold text-base leading-4 mt-5">Custom Template
   </div><div id="insert-custom" class="flex flex-row mt-5 gap-5 no-scrollbar overflow-x-scroll "> 

</div>
  </div>
  <div class="text-mineshaft-900 font-roboto font-semibold text-base leading-4 mt-5">Draft Template
  </div><div id="insert-draft" class="flex flex-row mt-5 gap-5 no-scrollbar overflow-x-scroll ">


 </div> </div>`;
    let drafttemplates = [];
    let customtemplates = [];
    let defaulttemplates = [];

    async function getAllTemplates() {
      const tempresult = await GetAllTemplates();

      console.log(tempresult, "get all templates");

      tempresult.data.map((template) => {
        if (template.mode === "STANDARD") {
          defaulttemplates.push(template);
        } else if (
          template.mode === "DRAFT" &&
          parseInt(localStorage.getItem("userid")) == template.created_by
        ) {
          drafttemplates.push(template);
        } else if (template.mode === "CUSTOM") {
          customtemplates.push(template);
        }
      });

      const insertdefault = document.getElementById("insert-default");
      insertdefault.innerHTML = ``;
      defaulttemplates.forEach((template) => {
        const date = new Date(template.created_at);

        // Options for formatting
        const options = {
          year: "numeric",
          month: "short",
          day: "2-digit",
        };

        // Format the date
        const formattedDate = date.toLocaleDateString("en-US", options);

        // Replace comma for the desired format
        const formattedDateString = formattedDate.replace(",", "");
        insertdefault.innerHTML += `
        <div class="relative">
        <div class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative justify-center">
          <svg onclick='openLetterModal(${template.id})'  class="absolute cursor-pointer top-0 right-0 w-4 h-8 pt-4 pr-l">
            <use xlink:href="./assets/icons/icon.svg#threedots"></use>
          </svg>
          <svg onclick="openLetter(${template.id})" class="w-[260px] h-[150px] cursor-pointer">
            <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
          </svg>
        </div>
        <div 
          class="bg-white rounded-b-lg p-1 w-[292px] h-8 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center">
          <div class="text-base overflow-hidden text-ellipsis text-nowrap">${template.title}</div>
          <div class="text-sm overflow-hidden text-ellipsis text-nowrap">${formattedDateString}</div>
        </div>
        <div id="dropdown${template.id}" class="z-10 closethemodal hidden absolute top-0 right-0 mt-12 bg-white divide-gray-100 rounded-lg shadow w-44 h-32">
          <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
            <li>
              <a href="#" onclick="openlettereditor(${template.id})" class="block px-4 py-2 hover:bg-gray-100">Edit</a>
            </li>
            <li>
              <a href="#" onclick="deletetemplate(${template.id})" class="block px-4 py-2 hover:bg-gray-100">Delete</a>
            </li>
          </ul>
        </div>
      </div>

        `;
        window.openLetterModal = async function (id) {
          if (
            document
              .getElementById("dropdown" + id)
              .classList.contains("hidden")
          ) {
            document.getElementById("dropdown" + id).classList.remove("hidden");
          } else {
            document.getElementById("dropdown" + id).classList.add("hidden");
          }
        };
      });

      const customdefault = document.getElementById("insert-custom");
      customdefault.innerHTML = ``;
      customtemplates.forEach((template) => {
        const date = new Date(template.created_at);

        // Options for formatting
        const options = {
          year: "numeric",
          month: "short",
          day: "2-digit",
        };

        // Format the date
        const formattedDate = date.toLocaleDateString("en-US", options);

        // Replace comma for the desired format
        const formattedDateString = formattedDate.replace(",", "");
        customdefault.innerHTML += `
        <div class="relative">
        <div class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative justify-center">
          <svg onclick='openLetterModal(${template.id})' class="absolute top-0 right-0 w-4 h-8 pt-4 pr-l">
            <use xlink:href="./assets/icons/icon.svg#threedots"></use>
          </svg>
          <svg onclick="openLetter(${template.id})" class="w-[260px] h-[150px] cursor-pointer">
            <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
          </svg>
        </div>
        <div 
          class="bg-white rounded-b-lg p-1 w-[292px] h-8 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center">
          <div class="text-base overflow-hidden text-ellipsis text-nowrap">${template.title}</div>
          <div class="text-sm overflow-hidden text-ellipsis text-nowrap">${formattedDateString}</div>
        </div>
        <div id="dropdown${template.id}" class="z-10 closethemodal hidden absolute top-0 right-0 mt-12 bg-white divide-gray-100 rounded-lg shadow w-44 h-32">
          <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
            <li>
              <a href="#" onclick="openlettereditor(${template.id})" class="block px-4 py-2 hover:bg-gray-100">Edit</a>
            </li>
            <li>
              <a href="#" onclick="deletetemplate(${template.id})" class="block px-4 py-2 hover:bg-gray-100">Delete</a>
            </li>
          </ul>
        </div>
      </div>

        `;
        window.openLetterModal = async function (id) {
          if (
            document
              .getElementById("dropdown" + id)
              .classList.contains("hidden")
          ) {
            document.getElementById("dropdown" + id).classList.remove("hidden");
          } else {
            document.getElementById("dropdown" + id).classList.add("hidden");
          }
        };
      });
      const insertdraft = document.getElementById("insert-draft");
      insertdraft.innerHTML = ``;
      drafttemplates.forEach((template) => {
        const date = new Date(template.created_at);

        // Options for formatting
        const options = {
          year: "numeric",
          month: "short",
          day: "2-digit",
        };

        // Format the date
        const formattedDate = date.toLocaleDateString("en-US", options);

        // Replace comma for the desired format
        const formattedDateString = formattedDate.replace(",", "");
        insertdraft.innerHTML += `
        <div class="relative">
        <div class="bg-link-water-100 pr-4 pl-4 pt-4 pb-0 rounded-t-lg flex items-center relative justify-center">
          <svg onclick='openLetterModal(${template.id})' class="absolute top-0 right-0 w-4 h-8 pt-4 pr-l">
            <use xlink:href="./assets/icons/icon.svg#threedots"></use>
          </svg>
          <svg onclick="openLetter(${template.id})" class="w-[260px] h-[150px] cursor-pointer">
            <use xlink:href="./assets/icons/icon.svg#templateimage"></use>
          </svg>
        </div>
        <div 
          class="bg-white rounded-b-lg p-1 w-[292px] h-8 font-roboto font-medium text-mineshaft-900 leading-4 flex flex-row justify-around items-center">
          <div class="text-base overflow-hidden text-ellipsis text-nowrap">${template.title}</div>
          <div class="text-sm overflow-hidden text-ellipsis text-nowrap">${formattedDateString}</div>
        </div>
        <div id="dropdown${template.id}" class="z-10 closethemodal hidden absolute top-0 right-0 mt-12 bg-white divide-gray-100 rounded-lg shadow w-44 h-32">
          <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
            <li>
              <a href="#" onclick="openlettereditor(${template.id})" class="block px-4 py-2 hover:bg-gray-100">Edit</a>
            </li>
            <li>
              <a href="#" onclick="deletetemplate(${template.id})" class="block px-4 py-2 hover:bg-gray-100">Delete</a>
            </li>
          </ul>
        </div>
      </div>

        `;

        window.openLetterModal = async function (id) {
          if (
            document
              .getElementById("dropdown" + id)
              .classList.contains("hidden")
          ) {
            document.getElementById("dropdown" + id).classList.remove("hidden");
          } else {
            document.getElementById("dropdown" + id).classList.add("hidden");
          }
        };
      });
    }
    window.deletetemplate = async function (id) {
      // console.log("id: " + id);
      const response = await DELETETEMPLATE(id);
      if (response) {
        Toastify({
          text: "Template deleted success",
          duration: 3000,
          newWindow: true,
          className: "text-black",
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "white",
          },
        }).showToast();
        setTimeout(() => {
          document.getElementById("insert-default").innerHTML = "";
          document.getElementById("insert-custom").innerHTML = "";
          document.getElementById("insert-draft").innerHTML = "";
          location.reload();
        }, 2000);
      } else {
        Toastify({
          text: "some error occured",
          duration: 3000,
          newWindow: true,
          className: "text-red-500 font-bold",
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "white",
          },
        }).showToast();
        setTimeout(() => {
          document.getElementById("insert-default").innerHTML = "";
          document.getElementById("insert-custom").innerHTML = "";
          document.getElementById("insert-draft").innerHTML = "";
          location.reload();
        }, 2000);
      }
    };

    document.addEventListener("click", function (event) {
      console.log(event.target, event.target.tagName);
      const modals = document.getElementsByClassName("closethemodal");
      if (event.target.tagName === "use" || event.target.tagName === "svg") {
        console.log(event.target.tagName, event.target.tagName === "svg");
      } else {
        for (let i = 0; i < modals.length; i++) {
          const element = modals[i];

          if (element.classList.contains("hidden")) {
          } else {
            element.classList.add("hidden");
          }
        }
      }
    });

    function addEditorOpenCloseFeature() {
      window.openlettereditor = async function (modalId) {
        const res = await GetAllCategory();
        document.getElementById("sectiondetails").classList.add("hidden");
        document.getElementById("letters-tab").classList.add("hidden");
        document.getElementById("version-area").classList.remove("hidden");

        if (modalId == 0) {
          document.getElementById("onlyforblank").classList.remove("hidden");
          document.getElementById("version-area").classList.add("hidden");
          document.getElementById("create-template").classList.remove("hidden");
          document.getElementById("review").classList.add("hidden");
          document.getElementById("json").classList.add("hidden");
          document.getElementById("container-content-1").contentEditable = true;
          modalId = 37;

          // category = res?.data;
          // let categoryElement = `  <option selected>Select a category</option>`;
          // // let categoryElement = `
          // //   <select id="category" class="w-56 flex justify-center p-2  placeholder:text-right items-center  h-10 border border-[#5D5D5D33]  text-xs rounded placeholder:text-sm placeholder:text-[#5D5D5D4D] placeholder:opacity-30  placeholder:font-normal">
          // //     <option  class="flex justify-center items-center" selected>Choose Category</option>
          // //   `;

          // category?.map((item) => {
          //   categoryElement += `<option value=${item.id} id=${item.id}>${item.category}</option>`;
          // });
          // document.getElementById("category").innerHTML = categoryElement;
          // categoryElement += `
          // <p  id="caterror" class=" hidden text-red-500 text-xs font-light pt-1">Select a Category first</p>
          // `;
        }
        localStorage.setItem("modalId", modalId);
        console.log("fniefniefnir");
        let htmljson;

        // document.getElementById("policy-detail").classList.add("hidden");
        // document.getElementById("policy-table").classList.add("hidden");
        // document.getElementById("pagination-area").classList.add("hidden");
        document.getElementById("extralarge-modal").classList.remove("hidden");
        document.getElementById("area").classList.add("hidden");

        const response2 = await fetch(
          API_CONSTANTS.BACKEND_BASE_URL_PROD +
            `/api/file/getTemplateById/${modalId}`,
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
            localStorage.setItem("modalId", modalId);
            if (data.data.title !== "emptydocx.docx") {
              document.getElementById("doc_title").textContent =
                data.data.title;
            }

            // fetchVersionsDateWise(modalId);
            // Handle the response from the backend
            console.log(data.data, "fffffkbnjb ");
            document.getElementById("docx-wrapper-1").innerHTML =
              data.data[0].htmldata;
            htmljson = data.data[0].htmljson;
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
        document.getElementById("area").classList.remove("hidden");
        document.getElementById("sectiondetails").classList.remove("hidden");
        document.getElementById("letters-tab").classList.remove("hidden");
        if (
          !document.getElementById("onlyforblank").classList.contains("hidden")
        ) {
          document.getElementById("onlyforblank").classList.add("hidden");
          document.getElementById("json").textContent =
            "Save a Version as Draft";
          document.getElementById("version-area").classList.remove("hidden");
          document.getElementById("create-template").classList.add("hidden");
          document.getElementById("json").classList.remove("hidden");
        }
        document.getElementById("policy-detail").classList.remove("hidden");
        document.getElementById("policy-table").classList.remove("hidden");
        document.getElementById("pagination-area").classList.remove("hidden");
      };
      if (document.getElementById("create-template")) {
        document
          .getElementById("create-template")
          .addEventListener("click", async function () {
            document.getElementById("policyname-error").classList.add("hidden");
            // document
            //   .getElementById("policydescription-error")
            //   .classList.add("hidden");
            document
              .getElementById("policycategory-error")
              .classList.add("hidden");
            let policyname = document.getElementById("policy-name").value;
            // let policydescription =
            //   document.getElementById("policy-description").value;
            let policycategory = document.getElementById("category").value;
            console.log(policycategory, policyname);

            if (policyname !== "" && policycategory !== "Select a category") {
              // document.getElementById("policyname-error").classList.add("hidden");
              // document
              //   .getElementById("policydescription-error")
              //   .classList.add("hidden");
              // document
              //   .getElementById("policycategory-error")
              //   .classList.add("hidden");

              const blobToBase64 = (blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                return new Promise((resolve) => {
                  reader.onloadend = () => {
                    resolve(reader.result);
                  };
                });
              };

              async function convertImagesToBase64(divId) {
                // Find the div element
                var div = document.getElementById(divId);

                // Find all images within the div
                var images = div.getElementsByTagName("img");

                // Iterate over each image
                if (images.length > 0) {
                  for (var i = 0; i < images.length; i++) {
                    var img = images[i];

                    // Create a blob URL for the image
                    var blob = await fetch(img.src).then((response) =>
                      response.blob()
                    );

                    // Convert blob to base64
                    var base64 = await blobToBase64(blob);

                    img.src = base64;
                  }
                }
              }

              await convertImagesToBase64("container-content-1");
              const container = document.getElementById("container-content-1");
              var tags = container.querySelectorAll(".docx-wrapper *");
              // console.log(tags);
              var idCounter = 1;
              tags.forEach(function (tag) {
                if (!tag.id) {
                  tag.id = "id_" + idCounter;
                  idCounter++;
                }
              });
              const sections = container.getElementsByClassName("docx");
              console.log(sections);
              for (var i = 0; i < sections.length; i++) {
                console.log("section height chages");
                sections[i].setAttribute(
                  "style",
                  "padding: 20.15pt 59.15pt 72pt 72pt; width: 595pt; height: 842pt;"
                );
              }
              const containerdocx =
                container.getElementsByClassName("docx-wrapper")[0];
              const headers = containerdocx.getElementsByTagName("header");
              console.log(headers);
              // for (var i = 0; i < headers.length; i++) {
              //   console.log("section height chages");
              //   headers[i].setAttribute(
              //     "style",
              //     "margin-top: 19.3333px; height: 48px; margin-bottom:10px"
              //   );
              // }
              const articles = containerdocx.getElementsByTagName("article");
              console.log(articles);
              // for (var i = 0; i < articles.length; i++) {
              //   console.log("section height chages");
              //   articles[i].setAttribute("style", "margin-top: 48px; ");
              // }
              var containerContent = document.getElementById(
                "container-content-1"
              );

              let resHtml = document.getElementById("docx-wrapper-1").innerHTML;

              console.log("ggg", resHtml);
              // dummy value
              //   const categoryId = 1;
              const htmlJson = extractHtmlToJson(
                containerContent.getElementsByClassName("docx-wrapper")[0]
              );
              console.log(resHtml, htmlJson);

              const data = {
                htmlText: resHtml,
                htmljson: htmlJson,
                mode: policycategory,
                name: policyname,
              };
              const token = localStorage.getItem("token");
              console.log("token is ", token);
              // document
              //   .getElementById("container-html1")
              //   .getElementsByClassName("docx-wrapper")[0].id = "docx-wrapper";
              console.log(data);
              const axiosRequestArgs = {
                method: "post",
                url:
                  API_CONSTANTS.BACKEND_BASE_URL_PROD +
                  "/api/file/uploadTemplate",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                data: data,
              };
              axios(axiosRequestArgs).then((res) => {
                console.log(res.data);
              });

              console.log("results");
              window.closeEditor();
            } else {
              if (policyname == "") {
                document
                  .getElementById("policyname-error")
                  .classList.remove("hidden");
              }
              // if (policydescription == "") {
              //   document
              //     .getElementById("policydescription-error")
              //     .classList.remove("hidden");
              // }
              if (policycategory == "Select a category") {
                document
                  .getElementById("policycategory-error")
                  .classList.remove("hidden");
              }
            }
          });
      }
      function closereviewmodal() {
        document.getElementById("sendforreview").classList.add("hidden");
      }
      if (document.getElementById("review")) {
        document
          .getElementById("review")
          .addEventListener("click", async function () {
            document.getElementById("adminlist").innerHTML =
              "  <option selected>Select an Admin</option>";
            document.getElementById("sendforreview").classList.remove("hidden");
            const adminlist = await GetAdminList();
            console.log(adminlist, "Admin list");
            adminlist.map((item) => {
              console.log(item.email, "email");
              document.getElementById(
                "adminlist"
              ).innerHTML += `<option value=${item.id}>${
                item.first_name + " " + item.last_name
              }</option>`;
            });
          });
        if (document.getElementById("closerreview")) {
          document
            .getElementById("closereview")
            .addEventListener("click", closereviewmodal);
        }

        if (document.getElementById("sendreview")) {
          document
            .getElementById("sendreview")
            .addEventListener("click", async function () {
              console.log(document.getElementById("adminlist").value);
              if (
                document.getElementById("adminlist").value !== "Select an Admin"
              ) {
                document
                  .getElementById("admin-error")
                  .classList.remove("opacity-1");
                document
                  .getElementById("admin-error")
                  .classList.add("opacity-0");
                const response = await SetDocumentToApprove(
                  parseInt(document.getElementById("adminlist").value),
                  parseInt(localStorage.getItem("modalId")),
                  parseInt(localStorage.getItem("userid"))
                ).then(() => {
                  closereviewmodal();
                  document
                    .getElementById("sendforreview")
                    .classList.add("hidden");
                });
                console.log(response);
                if (response) {
                  document
                    .getElementById("sendforreview")
                    .classList.add("hidden");
                }
              } else {
                document
                  .getElementById("admin-error")
                  .classList.add("opacity-1");
                document
                  .getElementById("admin-error")
                  .classList.remove("opacity-0");
              }
            });
        }
      }
    }

    addEditorOpenCloseFeature();

    getAllTemplates();

    document.getElementsByTagName("main")[0].appendChild(area);

    let dropDownBtn = document.getElementById("uploadpolicy");
    console.log("Drop Down Btn", dropDownBtn);
    if (!dropDownBtn) {
      dropDownBtn = document.getElementById("uploadletter");
    }

    console.log("upload policy modal", dropDownBtn);
    const makeModal = () => {
      document.getElementById("modalcontainer").innerHTML += modalHtml;
      const closeModalBtn = document.getElementById("closeModalBtn");
      const modal = document.getElementById("modalupload");
      const showModalUpload = () => {
        modal.classList.remove("hidden");
      };

      const hideModal = () => {
        modal.classList.add("hidden");
      };

      dropDownBtn.addEventListener("click", () => {
        console.log(dropDownBtn, document.getElementById("modalcontainer"));
        showModalUpload();
        console.log("modal opened");
      });

      closeModalBtn.addEventListener("click", () => {
        hideModal();
      });
    };
    makeModal();
    class BulkUpload {
      constructor(
        concurrency,
        onUpdateEvent,
        onUploadComplete,
        lastProgressUpdated
      ) {
        this.queue = []; //contain all file object first
        this.uploadCompleted = false;
        this.lastProgressUpdated = lastProgressUpdated;
        this.onUpdateEvent = onUpdateEvent;
        this.completedqueue = new Map(); //success upload
        this.failedqueue = new Map(); //all failed
        this.concurrency = concurrency;
        this.progressPool = new Map();

        this.initiated = false;
        this.completedUploads = 0;
        this.onUploadComplete = onUploadComplete;
        // in progress

        this.inProgress = new Map();
        this.inQueue = new Map();

        // mapping from file name to status -> DRAFT,PROGRESS,COMPLETED ,FAILED-> progress percent,  //failed   // completed
        //return progress of some file so
      }
      //file->obj
      startUpload(file) {
        //file are the file obje from input
        // file->name,file,
        if (!this.initiated) {
          // if not inittaied  update queue
          //if file complete or fail-> in axios or xml request  update queue
          //update the  queue
          return this.updateQueue(file);
        }
        this.initiated = true;
        console.log("inittiaed");

        file.forEach((item, indx) => {
          const value = {
            status: "INQUEUE",
            id: this.getName(item, indx),
            file: item,
          };
          //PROGRESS ->upload ho rha he

          //size<concurreny

          if (this.queue.length < this.concurrency) {
            value.status = "PROGRESS";
            this.inProgress.set(value.id, value);
          } else {
            value.status = "INQUEUE";
            this.inQueue.set(value.id, value);
          }
          this.sendUpdateEvent();
          //send update event-> events such as update file  status and free of queue qill
          this.startInitialUploadFile();

          //when file queue.size dec
          //wait

          //upload file
        });
      }

      //axiosReqArgs ->object ->url,onCancel function etc,body
      onUpdateProgress(file, axiosRequestArgs) {
        axiosRequestArgs.onUploadProgress = ({ loaded, total }) => {
          loaded = isNaN(Number(loaded)) ? 0 : Number(loaded);
          total = isNaN(Number(total)) ? 0 : Number(total);
          file.uploadCount = Math.floor((loaded / total) * 100);
          console.log("file upload Count", file.uploadCount);
          if (typeof file?.lastProgressUpdated !== "number") {
            file.lastProgressUpdated = Date.now();
          }
          //send event callback after updating lastProgressUpload if frequency
          //is more than requested one
          if (
            typeof this.lastProgressUpdated === "number" &&
            Date.now() - file?.lastProgressUpdated >= this.lastProgressUpdated
          ) {
            this.sendUpdateEvent();
            file.lastProgressUpdated = Date.now();
          }
        };
      }

      startInitialUploadFile() {
        for (const file of this.inProgress) {
          this.uploadFile(file);
        }
      }

      uploadFile(file) {
        //file ->object to upload
        // status ->INQUEUE ,PROGRESS
        // something related to cancel the file obj
        // axiosRequestArgs.cancelToken = new axios.CancelToken((cancel) => {
        //   fileObj.cancel = cancel;
        // });
        // will make api call or xml request here
        // const formData = new FormData();
        // formData.append("file", file.file);
        try {
          const title = file.file.name;
          //file->name
          console.log(title);
          const htmlJson = "";

          let htmlData = "";
          console.log(file);
          console.log(
            document
              .getElementById(`${file.file.name}category`)
              .querySelector("select").value
          );

          let categoryId = document
            .getElementById(`${file.file.name}category`)
            .querySelector("select").value;
          const getFile = async () => {
            htmlData = await renderDocx(file.file, "container-html1");
            // console.log("html data is", htmlData);
            if (htmlData) {
              const blobToBase64 = (blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                return new Promise((resolve) => {
                  reader.onloadend = () => {
                    resolve(reader.result);
                  };
                });
              };

              async function convertImagesToBase64(divId) {
                // Find the div element
                var div = document.getElementById(divId);

                // Find all images within the div
                var images = div.getElementsByTagName("img");

                // Iterate over each image
                if (images.length > 0) {
                  for (var i = 0; i < images.length; i++) {
                    var img = images[i];

                    // Create a blob URL for the image
                    var blob = await fetch(img.src).then((response) =>
                      response.blob()
                    );

                    // Convert blob to base64
                    var base64 = await blobToBase64(blob);

                    img.src = base64;
                  }
                }
              }

              await convertImagesToBase64("container-html1");
              var tags = document
                .getElementById("container-html1")
                .querySelectorAll(".docx-wrapper *");
              // console.log(tags);
              var idCounter = 1;
              tags.forEach(function (tag) {
                if (!tag.id) {
                  tag.id = "id_" + idCounter;
                  idCounter++;
                }
              });
              const sections = document.getElementsByClassName("docx");
              console.log(sections);
              for (var i = 0; i < sections.length; i++) {
                const width = sections[i].clientWidth;
                console.log("section height chages");
                sections[i].setAttribute(
                  "style",
                  `padding: 20.15pt 59.15pt 72pt 72pt; width: 612pt; height: 792pt;`
                );
              }
              const containerdocx = document
                .getElementById("container-html1")
                .getElementsByClassName("docx-wrapper")[0];
              const headers = containerdocx.getElementsByTagName("header");
              console.log(headers);
              // for (var i = 0; i < headers.length; i++) {
              //   console.log("section height chages");
              //   headers[i].setAttribute(
              //     "style",
              //     "margin-top: 19.3333px; height: 48px; margin-bottom:10px"
              //   );
              // }
              const articles = containerdocx.getElementsByTagName("article");
              console.log(articles);
              // for (var i = 0; i < articles.length; i++) {
              //   console.log("section height chages");
              //   articles[i].setAttribute("style", "margin-top: 48px; ");
              // }

              var containerContent = document.getElementById("container-html1");

              // Get the div element with the class "dev" inside container-content
              var devDiv = containerContent.lastChild;
              htmlData = devDiv.innerHTML;

              console.log(devDiv, "ggg");
              // dummy value
              //   const categoryId = 1;
              const htmlJson = extractHtmlToJson(
                containerContent.getElementsByClassName("docx-wrapper")[0]
              );
              console.log(
                "title,htmlJson,categoryId",
                title,
                htmlJson,
                categoryId
              );
              if (categoryId == "DEFAULT") {
                categoryId = "STANDARD";
              }
              const data = {
                htmlText: htmlData,
                htmljson: htmlJson,
                mode: categoryId,
                name: title,
              };
              const token = localStorage.getItem("token");
              console.log("token is ", token);
              document
                .getElementById("container-html1")
                .getElementsByClassName("docx-wrapper")[0].id = "docx-wrapper";
              const axiosRequestArgs = {
                method: "post",
                url:
                  API_CONSTANTS.BACKEND_BASE_URL_PROD +
                  "/api/file/uploadTemplate",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                data: data,
              };

              this.onUpdateProgress(file, axiosRequestArgs);
              // axiosRequestArgs.cancelToken = new axios.CancelToken((cancel) => {
              //   file.cancel = cancel;
              // });
              axios(axiosRequestArgs)
                .then((res) => {
                  console.log(res.data);

                  this.inProgress.delete(file.id);
                  file.status = "SUCCESS";
                  file.uploadId = res.data.document.id;
                  console.log(res.data.document.id);
                  this.completedUploads += 1;
                  this.completedqueue.set(file.id, file);
                  this.sendUpdateEvent();
                  this.freeQueue();
                })
                .catch((error) => {
                  file.isCancelled = !!axios.isCancel(error);
                  this.uploadFail(file);
                });
            }
          };
          getFile();
        } catch (error) {
          this.uploadFail(file);
          //failed file upload
        }

        // reject
      }
      uploadFail(file) {
        file.status = "FAILED";
        this.inProgress.delete(file.id);
        this.failedqueue.set(file.id, file);
        this.sendUpdateEvent();
        this.freeQueue();
      }

      updateQueue(files) {
        this.uploadCompleted = false;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const value = {
            status: "INQUEUE",
            id: `${this.getName(file, i)}`,
            file,
          };
          value.status = "INQUEUE";
          this.inQueue.set(value.id, value);
          this.freeQueue();
        }
        this.sendUpdateEvent();
      }
      freeQueue() {
        // call -> upload success
        // start Upload call  this.initated update queue
        if (this.inQueue.size === 0) {
          this.sendUpdateEvent();
          if (!this.uploadCompleted) {
            this.onUploadComplete(this.completedqueue);
            this.uploadCompleted = true;
          }
          return;
        }
        if (this.inProgress.size === this.concurrency) {
          // no file can be added to upload or removed from queue
          return this.sendUpdateEvent();
        }

        for (let [_, file] of this.inQueue) {
          file.status = "P";
          this.inQueue.delete(file.id);
          this.inProgress.set(file.id, file);
          this.sendUpdateEvent();
          this.uploadFile(file);
          //we only what top of the queue that's why break the loop post every
          // iteration
          break;
        }
      }
      sendUpdateEvent() {
        this.onUpdateEvent({
          IN_PROGRESS: this.inProgress,
          IN_QUEUE: this.inQueue,
          COMPLETED_UPLOADS: this.completedqueue,
          FAILED_UPLOADS: this.failedqueue,
        });
      }

      getName(file, indx) {
        // same name upload->what to assume 1 2
        return file.name;
      }
    }
    // const sr = document.createElement("script");
    // sr.type = "module";
    // sr.src = "/scripts/uploadpolicy1.js";

    // document.getElementsByTagName("body")[0].appendChild(sr);

    console.log("bulkkk");
    const onUpdateEvent = ({
      IN_PROGRESS,
      IN_QUEUE,
      FAILED_UPLOADS,
      COMPLETED_UPLOADS,
    }) => {
      [
        ...IN_PROGRESS.values(),
        ...IN_QUEUE.values(),
        ...FAILED_UPLOADS.values(),
        ...COMPLETED_UPLOADS.values(),
      ].forEach((file) => {
        console.log(file, "file name");
        document.getElementById(`${file.file.name}status`).innerHTML =
          file.status === "FAILED"
            ? `<div class="text-black font-light text-xs flex justify-center items-center gap-2">Failed
              <svg
                    class="w-3 h-3"
                    fill="none"
                    class="text-red-500"
                    stroke="red"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>  
              </div>`
            : file.status === "SUCCESS"
            ? `<div class="flex gap-2">
              <p class="text-black text-xs font-light">Success</p>
              <svg aria-hidden="true" class="w-3 h-3 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Success</span>
              </div>
              `
            : `
              <div role="status">
                  <svg aria-hidden="true" class="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
              </div>`;
      });
    };
    const onUploadComplete = (args) => {
      console.log("all file uploaded success");
      // upload completed
      filesUploaded = args;
    };

    const handleUpload = async () => {
      const upload = new BulkUpload(2, onUpdateEvent, onUploadComplete, 100);
      // fileUploaded
      console.log(filesUploaded, "filesUploaded are");
      upload.startUpload(filesUploaded);
      // const resHtml = await renderDocx(file[0], "container-html1");

      // // dummy value
      // //   const categoryId = 1;
      // const htmlJson = "";
      // await CreatePolicy(resHtml, htmlJson, catId, title);
      // console.log("results");
    };

    // categoryElement.innerHTML = "";
    // const categoryId = document.getElementById("category");
    // categoryId.addEventListener("change", () => {
    //   catId = categoryId.options[categoryId.selectedIndex].id;
    // });

    // category.data.map((item) => {
    //   categoryElement.innerHTML += `<option id=${item.id}>${item.category}</option>`;
    // });
    var category = [];

    var filesUploaded = [];
    console.log("is it working");
    const afterinputhtml = (files, categoryElement) => {
      console.log(files, "fillll are");
      let html = `
    
      <label for="dropzone-file1" class="flex w-full bg-[#EBF3FF80]   border border-[#0052F194]  border-dashed h-14 justify-center gap-1 items-center rounded-md ">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.125 24.7504C2.86698e-05 25.8754 1.12503 13.5004 10.125 14.6254C6.75003 2.25036 25.875 2.25036 24.75 11.2504C36 7.87536 36 25.8754 25.875 24.7504M12.375 20.2504L18 15.7504M18 15.7504L23.625 20.2504M18 15.7504V32.6254" stroke="#1F2DE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                 <span class="font-medium text-[#1F2DE3] text-sm">Upload</span>
                <span class="font-medium text-[#333333] text-sm">or Drag and drop files here</span>
    <input
                    id="dropzone-file1"
                    accept=".docx"
                    type="file"
                    class="hidden"
                    multiple
    />
                  
    </label>
              
     <div id="file-list" class="w-full h-40 flex flex-col  overflow-y-auto    gap-4">`;

      files.map((item) => {
        html += `
        <div class="flex flex-row gap-3">
                <div
                  class="flex flex-row   justify-between bg-[#F7F7F7] w-96 px-4 py-5  rounded-md  h-10 items-center"
                >
                      <div class="flex font-normal text-[#5D5D5D] text-sm gap-3 flex-row ">
                        <span>
                          <svg
                            width="13"
                            height="18"
                            viewBox="0 0 13 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_1531_13314)">
                              <path
                                d="M12.8571 4.93013V16.8404C12.8571 17.4809 12.3448 18 11.7135 18H1.14366C0.511987 18 0 17.4809 0 16.8404V1.15959C0 0.519094 0.511987 0 1.14366 0H7.99495L12.8571 4.93013Z"
                                fill="#518EF8"
                              />
                              <path
                                d="M9.71577 9.03711H3.14111V9.77797H9.71577V9.03711Z"
                                fill="white"
                              />
                              <path
                                d="M9.71577 10.6914H3.14111V11.4321H9.71577V10.6914Z"
                                fill="white"
                              />
                              <path
                                d="M9.71577 12.3457H3.14111V13.0864H9.71577V12.3457Z"
                                fill="white"
                              />
                              <path
                                d="M7.81677 14H3.14111V14.7409H7.81677V14Z"
                                fill="white"
                              />
                              <path
                                d="M8.65833 4.8233L12.8571 6.57727V4.93041L10.4764 4.21777L8.65833 4.8233Z"
                                fill="#3A5BBC"
                              />
                              <path
                                d="M12.8572 4.93012H9.13861C8.50675 4.93012 7.995 4.41103 7.995 3.77053V0L12.8572 4.93012Z"
                                fill="#ACD1FC"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1531_13314">
                                <rect width="12.8571" height="18" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        ${item.name}
                      </div>
                      <div class="flex   flex-row" id="${item.name}status">
                        <p class="font-normal text-xs text-[#5D5D5D80] flex gap-2">
                          ${Math.round(item.size / 1024)}KB
                          <span class="hover:cursor-pointer" id="${
                            item.name
                          }removebtn"
                          
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.25 5.25H6.125V10.5H5.25V5.25Z"
                                fill="#5D5D5D"
                              />
                              <path
                                d="M7.875 5.25H8.75V10.5H7.875V5.25Z"
                                fill="#5D5D5D"
                              />
                              <path
                                d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z"
                                fill="#5D5D5D"
                              />
                              <path
                                d="M5.25 0.875H8.75V1.75H5.25V0.875Z"
                                fill="#5D5D5D"
                              />
                            </svg>
                          </span>
                        </p>
                        </div>
                        </div>
                        <div class="" id="${item.name}category">
                        ${categoryElement}
                        </div>
                        </div>
    
        
        `;
      });
      html += "</div>";
      return html;
    };

    const handleRemoveFile = (name, categoryElement) => {
      let arrfiles = filesUploaded;
      console.log(arrfiles, "in remove arr files are");
      if (arrfiles) {
        const indx = arrfiles.findIndex((item) => item.name == name);
        console.log("indx is in rem", indx);
        arrfiles.splice(indx, 1);
        filesUploaded = arrfiles;
        console.log("files uploaded after remove", filesUploaded);
        document.getElementById("file-list").innerHTML = "";
        filesUploaded.map((item) => {
          document.getElementById(
            "file-list"
          ).innerHTML += `<div class="flex flex-row gap-3">
      <div
        class="flex flex-row   justify-between bg-[#F7F7F7] w-96 px-4 py-5  rounded-md  h-10 items-center"
      >
            <div class="flex font-normal text-[#5D5D5D] text-sm gap-3 flex-row ">
              <span>
                <svg
                  width="13"
                  height="18"
                  viewBox="0 0 13 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1531_13314)">
                    <path
                      d="M12.8571 4.93013V16.8404C12.8571 17.4809 12.3448 18 11.7135 18H1.14366C0.511987 18 0 17.4809 0 16.8404V1.15959C0 0.519094 0.511987 0 1.14366 0H7.99495L12.8571 4.93013Z"
                      fill="#518EF8"
                    />
                    <path
                      d="M9.71577 9.03711H3.14111V9.77797H9.71577V9.03711Z"
                      fill="white"
                    />
                    <path
                      d="M9.71577 10.6914H3.14111V11.4321H9.71577V10.6914Z"
                      fill="white"
                    />
                    <path
                      d="M9.71577 12.3457H3.14111V13.0864H9.71577V12.3457Z"
                      fill="white"
                    />
                    <path
                      d="M7.81677 14H3.14111V14.7409H7.81677V14Z"
                      fill="white"
                    />
                    <path
                      d="M8.65833 4.8233L12.8571 6.57727V4.93041L10.4764 4.21777L8.65833 4.8233Z"
                      fill="#3A5BBC"
                    />
                    <path
                      d="M12.8572 4.93012H9.13861C8.50675 4.93012 7.995 4.41103 7.995 3.77053V0L12.8572 4.93012Z"
                      fill="#ACD1FC"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1531_13314">
                      <rect width="12.8571" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              ${item.name}
            </div>
            <div class="flex   flex-row" id="${item.name}status">
              <p class="font-normal text-xs text-[#5D5D5D80] flex gap-2">
                ${Math.round(item.size / 1024)}KB
                <span class="hover:cursor-pointer" id="${item.name}removebtn"
                
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.25 5.25H6.125V10.5H5.25V5.25Z"
                      fill="#5D5D5D"
                    />
                    <path
                      d="M7.875 5.25H8.75V10.5H7.875V5.25Z"
                      fill="#5D5D5D"
                    />
                    <path
                      d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z"
                      fill="#5D5D5D"
                    />
                    <path
                      d="M5.25 0.875H8.75V1.75H5.25V0.875Z"
                      fill="#5D5D5D"
                    />
                  </svg>
                </span>
              </p>
              </div>
              </div>
              <div class="" id="${item.name}category">
              ${categoryElement}
              </div>
              </div>`;
        });
        filesUploaded.map((item) => {
          document
            .getElementById(`${item.name}removebtn`)
            .addEventListener("click", () => {
              handleRemoveFile(item.name, categoryElement);
            });
        });
      }
    };
    const uploadFilesListUi = (categoryElement) => {
      const docUploadContent = document.getElementById("upload-content");
      document.getElementById("upload-message").classList.remove("hidden");
      docUploadContent.innerHTML = afterinputhtml(
        filesUploaded,
        categoryElement
      );
      var arrfiles = filesUploaded;
      arrfiles.map((item) => {
        document
          .getElementById(`${item.name}removebtn`)
          .addEventListener("click", () => {
            handleRemoveFile(item.name, categoryElement);
          });
      });
    };
    let categoryElement = `
    <select id="category" class="w-56 flex justify-center p-2  placeholder:text-right items-center  h-10 border border-[#5D5D5D33]  text-xs rounded placeholder:text-sm placeholder:text-[#5D5D5D4D] placeholder:opacity-30  placeholder:font-normal">
      <option  class="flex justify-center items-center" selected>Choose Category</option>
    `;
    async function insertallcategories() {
      const res = await GetAllCategory();
      category = ["DRAFT", "CUSTOM", "DEFAULT"];

      category?.map((item) => {
        categoryElement += `<option value=${item} id=${item}>${item}</option>`;
      });
      categoryElement += `</select>
      <p  id="caterror" class=" hidden text-red-500 text-xs font-light pt-1">Select a Category first</p>
      `;
    }

    insertallcategories();
    // const res = insertallcategories();
    // category = res?.data;

    // category?.map((item) => {
    //   categoryElement += `<option value=${item.id} id=${item.id}>${item.category}</option>`;
    // });
    // categoryElement += `</select>
    //   <p  id="caterror" class=" hidden text-red-500 text-xs font-light pt-1">Select a Category first</p>
    //   `;

    document
      .getElementById("dropzone-file")
      .addEventListener("change", (event) => {
        const files = event.target.files;
        console.log(files);
        filesUploaded = Array.from(files);
        console.log("files are", files);

        uploadFilesListUi(categoryElement);
        document.getElementById("uploadbtn").disabled = false;
        document
          .getElementById("dropzone-file1")
          .addEventListener("change", (event) => {
            let newFiles = event.target.files;
            newFiles = Array.from(newFiles);
            filesUploaded = filesUploaded.concat(newFiles);
            newFiles.map((item) => {
              document.getElementById(
                "file-list"
              ).innerHTML += `<div class="flex flex-row gap-3">
      <div
        class="flex flex-row   justify-between bg-[#F7F7F7] w-96 px-4 py-5  rounded-md  h-10 items-center"
      >
            <div class="flex font-normal text-[#5D5D5D] text-sm gap-3 flex-row ">
              <span>
                <svg
                  width="13"
                  height="18"
                  viewBox="0 0 13 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1531_13314)">
                    <path
                      d="M12.8571 4.93013V16.8404C12.8571 17.4809 12.3448 18 11.7135 18H1.14366C0.511987 18 0 17.4809 0 16.8404V1.15959C0 0.519094 0.511987 0 1.14366 0H7.99495L12.8571 4.93013Z"
                      fill="#518EF8"
                    />
                    <path
                      d="M9.71577 9.03711H3.14111V9.77797H9.71577V9.03711Z"
                      fill="white"
                    />
                    <path
                      d="M9.71577 10.6914H3.14111V11.4321H9.71577V10.6914Z"
                      fill="white"
                    />
                    <path
                      d="M9.71577 12.3457H3.14111V13.0864H9.71577V12.3457Z"
                      fill="white"
                    />
                    <path
                      d="M7.81677 14H3.14111V14.7409H7.81677V14Z"
                      fill="white"
                    />
                    <path
                      d="M8.65833 4.8233L12.8571 6.57727V4.93041L10.4764 4.21777L8.65833 4.8233Z"
                      fill="#3A5BBC"
                    />
                    <path
                      d="M12.8572 4.93012H9.13861C8.50675 4.93012 7.995 4.41103 7.995 3.77053V0L12.8572 4.93012Z"
                      fill="#ACD1FC"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1531_13314">
                      <rect width="12.8571" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              ${item.name}
            </div>
            <div class="flex   flex-row" id="${item.name}status">
              <p class="font-normal text-xs text-[#5D5D5D80] flex gap-2">
                ${Math.round(item.size / 1024)}KB
                <span class="hover:cursor-pointer" id="${item.name}removebtn"
                
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.25 5.25H6.125V10.5H5.25V5.25Z"
                      fill="#5D5D5D"
                    />
                    <path
                      d="M7.875 5.25H8.75V10.5H7.875V5.25Z"
                      fill="#5D5D5D"
                    />
                    <path
                      d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z"
                      fill="#5D5D5D"
                    />
                    <path
                      d="M5.25 0.875H8.75V1.75H5.25V0.875Z"
                      fill="#5D5D5D"
                    />
                  </svg>
                </span>
              </p>
              </div>
              </div>
              <div class="" id="${item.name}category">
              ${categoryElement}
              </div>
              </div>`;
            });
            filesUploaded.map((item) => {
              document
                .getElementById(`${item.name}removebtn`)
                .addEventListener("click", () => {
                  handleRemoveFile(item.name, categoryElement);
                });
            });
          });
      });

    console.log(category);

    document.getElementById("uploadbtn").addEventListener("click", () => {
      console.log("upload");
      if (filesUploaded.length === 0) {
        document.getElementById("uploadbtn").disabled = true;
        document.getElementById("upload-error").style = "display:block";
      } else {
        document.getElementById("upload-error").style = "display:hidden";

        console.log(category, "category");
        let flag = true;
        filesUploaded.map((item) => {
          console.log(
            document
              .getElementById(`${item.name}category`)
              .querySelector("select")
          );
          console.log(
            document
              .getElementById(`${item.name}category`)
              .querySelector("select").value
          );
          if (
            document
              .getElementById(`${item.name}category`)
              .querySelector("select").value == "Choose Category"
          ) {
            flag = false;
            document
              .getElementById(`${item.name}category`)
              .querySelector("p")
              .classList.remove("hidden");
          } else {
            document
              .getElementById(`${item.name}category`)
              .querySelector("p")
              .classList.add("hidden");
          }
        });
        if (flag) {
          document.getElementById("uploadbtn").classList.add("hidden");
          handleUpload();
        }
      }
    });
  }
}
//Employee Name
function addModalOpenCloseFeature() {
  window.openLetter = async function (modalId) {
    console.log(modalId, "modal id");
    const newel = document.createElement("div");
    newel.innerHTML = ` <div id=${modalId}  >
   <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20  sm:block sm:p-0 ">
     <!-- Background overlay -->
     <div  class="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity backdrop " aria-hidden="true"></div>
 
     <!-- Modal content -->
     <div class="fixed inset-0  w-3/5 m-auto  bg-link-water-100 rounded-lg shadow-xl  p-6 transform transition-all sm:my-8 overflow-y-scroll">
     
 
       <div id="printThis" class="p-6 pt-0  ">
        <div class="relative ">
        <button onclick="closeLetter(${modalId})"  type="button" class= " z-[8000] absolute top-0 right-0 p-1.5 m-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  ml-auto inline-flex items-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
         <div id="render-docs" class=" ">
         ${style}
         <div class='shaow-2xl bg-white' id='docx-wrapper'>
         </div>
         
           </div>
         
       
      
       </div>
     </div>
   </div>
 </div>`;
    document.getElementsByTagName("body")[0].appendChild(newel);

    document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
    window.addEventListener("beforeprint", (event) => {
      console.log("Before print");
      const contents = document
        .getElementById(modalId)
        .getElementsByClassName("docx-wrapper")[0].outerHTML;
      document.getElementById(modalId).innerHTML = contents;
    });

    document.addEventListener("click", function (event) {
      // console.log(modalId, "event", event.target);

      if (event.target.classList.contains("backdrop")) {
        window.closeLetter(modalId);
      }
    });

    await fetchAndRenderDoc(modalId);
  };

  window.closeLetter = function (modalId) {
    document.getElementById(modalId).remove();
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
  };
}
addModalOpenCloseFeature();
//
// letter modal feature

const fetchAndRenderDoc = async (modalId) => {
  const response = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
      `/api/file/getTemplateById/${modalId}`,
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
      const docData = data.data[0].htmldata;
      document
        .getElementById(modalId)
        .querySelector("#docx-wrapper").innerHTML = "";
      document
        .getElementById(modalId)
        .querySelector("#docx-wrapper").innerHTML = docData;
      const modal = document.getElementById(modalId);
    });
};
if (document.getElementById("savesdraft")) {
  document.getElementById("saveasdraft").addEventListener("click", async () => {
    const res = await saveAsDraft();
    setTimeout(() => {
      window.location.href = "http://localhost:5555/letters";
    }, 3000);
  });
}

const saveAsDraft = async () => {
  const htmlData1 = document.querySelector(".container-content-1").innerHTML;
  // console.log("html data is", htmlData1);
  try {
    console.log("name", recipientName);
    const res = await axios.post(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/saveLetter",
      {
        html_data: htmlData1,
        templateId: templateId,
        recipientId: recipientId,
        createdby: ipvmsuserId,
        email: recipientEmail,
        name: recipientName,
      }
    );
    if (res) {
      Toastify({
        text: "Letter save as draft success",
        duration: 3000,
        newWindow: true,
        className: "text-black",
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "white",
        },
      }).showToast();
    }
  } catch (error) {
    Toastify({
      text: "Some error occured",
      duration: 3000,
      newWindow: true,
      className: "text-red",
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "white",
      },
    }).showToast();
  }
};

const handleGeneratePdf = async () => {
  showLoading();
  var element = document.getElementById("container-content-1");
  var opt = {
    margin: 0,
    filename: "Contrato.pdf",
    image: {
      type: "",
      quality: 0.98,
    },
    html2canvas: {
      scale: 2,
      letterRendering: true,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: "avoid-all", after: "section" },
  };
  const pdfBlob = await html2pdf().from(element).output("blob");
  const formData = new FormData();
  let letterId;
  // console.log(email);
  const fileName = "pdfsend" + Date.now() + ".pdf";
  formData.append("file", pdfBlob, fileName);
  formData.append("userId", 20);
  formData.append("templateId", 23);
  formData.append("email", "tapasviarora2002@gmail.com");
  formData.append("html_data", element.innerHTML.toString());
  formData.append("letter_id", letterId);

  try {
    const response = await axios.post(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/uploadLetter",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    Toastify({
      text: "Letter send succesfully",
      duration: 3000,
      newWindow: true,
      className: "text-black",
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "white",
      },
    }).showToast();
    if (response.status == 200) {
      setTimeout(() => {
        window.location.href = "http://localhost:5555/letters";
      }, 3000);
    }
  } catch (error) {
    Toastify({
      text: "Some error occured",
      duration: 3000,
      newWindow: true,
      className: "text-black",
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "white",
      },
    }).showToast();
    setTimeout(() => {
      window.location.href = "http://localhost:5555/letters";
    }, 2000);
  } finally {
    removeLoading();
  }
};

//loader
const showLoading = () => {
  const loading = document.createElement("div");
  loading.id = "loadingicon";
  loading.innerHTML = `<div id="loading"  >
<div id="overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.8); z-index: 1000;">
<div class="flex gap-2 justify-center items-center h-screen">
<div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
<div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
<div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
</div>
</div>  
</div>`;
  document.body.appendChild(loading);
};
const removeLoading = () => {
  const loadingElement = document.getElementById("loadingicon");
  if (loadingElement) {
    loadingElement.remove();
  }
};
var shouldBeSigned = false;
const handleSignSwiftCall = async () => {
  showLoading();
  var element = document.getElementById("container-content-1");
  console.log("elemenet is ", element);
  var opt = {
    margin: 0,
    filename: "Contrato.pdf",
    image: {
      type: "",
      quality: 0.98,
    },
    html2canvas: {
      scale: 2,
      letterRendering: true,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: "avoid-all", after: "section" },
  };
  let letterId;
  const pdfBlob = await html2pdf().from(element).output("blob");
  const formData = new FormData();
  const fileName = "pdfFile" + Date.now() + ".pdf";
  formData.append("file", pdfBlob, fileName);
  const fileUpload = await axios.post(
    API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/upload/letterpdf",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const ShareLink = fileUpload.data.url;
  if (ShareLink) {
    //draft->pending
    await axios.post(
      API_CONSTANTS.BACKEND_BASE_URL_PROD +
        "/api/file/upload/updateLetterStatus",
      {
        letterId: letterId,
        htmlData: element.innerHTML,
        recipientId: recipientId,
        createdBy: ipvmsuserId,
        templateId: templateId,
        email: recipientEmail,
        name: recipientName,
        fileName: fileName,
      }
    );
  }
  const email = localStorage.getItem("email");
  // const userId = "10200";
  if (fileUpload) {
    fetch("http://localhost:3000/api/users/findUser", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        if (data.status == 500) {
          removeLoading();
          console.log("first log in sign swift");
          document.getElementById("loginError").classList.remove("hidden");
          //error
          removeLoading();
        } else {
          console.log("data", data);
          fetch("http://localhost:3000/api/document/uploadDocument", {
            method: "POST",
            body: JSON.stringify({
              userId: data.user.customerId,
              ShareLink: ShareLink,
            }),
            mode: "cors",
          })
            .then((response) => response.json())
            .then((data) => {
              removeLoading();
              console.log("upload doc  is", data);
              //error upload doc
              if (data.status !== 201) {
                document
                  .getElementById("uploadError")
                  .classList.remove("hidden");
              } else {
                console.log("success");
                document
                  .getElementById("uploadSuccess")
                  .classList.remove("hidden");
                Toastify({
                  text: "Letter send succesfully",
                  duration: 3000,
                  newWindow: true,
                  className: "text-black",
                  gravity: "top", // `top` or `bottom`
                  position: "right", // `left`, `center` or `right`
                  stopOnFocus: true, // Prevents dismissing of toast on hover
                  style: {
                    background: "white",
                  },
                }).showToast();
                setTimeout(() => {
                  window.location.href = "http://localhost:5555/letters";
                }, 2000);
              }
            });
        }
      });
  }
};

if (document.getElementById("sendButton")) {
  document.getElementById("sendButton").addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });
}

if (document.getElementsByClassName("close")[0]) {
  document
    .getElementsByClassName("close")[0]
    .addEventListener("click", function () {
      const modal = document.getElementById("confirmModal");
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.getElementById("loginError").classList.add("hidden");
      document.getElementById("uploadError").classList.add("hidden");

      const signMessage = document.getElementById("signMessage");
      signMessage.classList.remove("hidden");
    });
}
if (document.getElementById("cancelSend")) {
  document.getElementById("cancelSend").addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("uploadError").classList.add("hidden");
    document.getElementById("successError").classList.add("hidden");
    const signMessage = document.getElementById("signMessage");
    signMessage.classList.remove("hidden");
  });
}

if (document.getElementById("sendLetter")) {
  document.getElementById("sendLetter").addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");

    if (!shouldBeSigned) {
      handleGeneratePdf();
    } else {
      handleSignSwiftCall();
    }

    // window.location.href = "http://localhost:5555/letters";
  });
}
if (document.getElementById("signCheckbox")) {
  document
    .getElementById("signCheckbox")
    .addEventListener("change", function () {
      const signMessage = document.getElementById("signMessage");

      if (this.checked) {
        signMessage.classList.remove("hidden");
        shouldBeSigned = true;
      } else {
        signMessage.classList.add("hidden");
        shouldBeSigned = false;
      }
    });
}

// pdf generate function

window.onclick = function (event) {
  const modal = document.getElementById("confirmModal");
  if (event.target == modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("uploadError").classList.add("hidden");

    const signMessage = document.getElementById("signMessage");
    signMessage.classList.remove("hidden");
  }
};
