import { UserInfoApiRequest } from "../api/dashboard.js";
import { GetAllTemplates } from "../api/getAllTemplates.js";
import { GetAllUsers } from "../api/getAllUsers.js";
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
document.addEventListener("DOMContentLoaded", async () => {
  await InsertNavbar();

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
  document.getElementById("search").addEventListener("input", () => {
    debounce(getAllUsers(), 250);
  });

  document
    .getElementById("template_option")
    .addEventListener("click", (event) => {
      console.log(event.target, "event");

      if (event.target.tagName === "LABEL") {
        console.log("event target", event.target);
        document.querySelectorAll("#template_option label").forEach((label) => {
          label.innerHTML = label.textContent;
        });

        templateId = event.target.id;
        // set id to selected user
        const checkSymbol = document.createElement("div");
        checkSymbol.classList.add("check-symbol");
        checkSymbol.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
      <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
      </svg>`;
        event.target.appendChild(checkSymbol);
        // console.log(id);
      }
    });
  // can click on parent element to get target elemnt of child
  document.getElementById("search-user").addEventListener("click", (event) => {
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
        style="margin-left: 530px"
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
});

const selectuserbutton = document.getElementById("dropdownSearchButton");

selectuserbutton.addEventListener("click", (event) => {
  const selectedusersearchmodal = document.getElementById("dropdownSearchx");
  if (selectedusersearchmodal.classList.contains("hidden")) {
    selectedusersearchmodal.classList.remove("hidden");
  } else {
    selectedusersearchmodal.classList.add("hidden");
  }
});
