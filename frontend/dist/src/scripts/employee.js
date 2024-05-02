import { GetAllTemplates } from "../api/getAllTemplates.js";
import { GetAllUsers } from "../api/getAllUsers.js";
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
import { redirect, showNextPolicy } from "../utils/utils.js";

const make_user = (name, email, code, created_at, updated_at) => {
  return ` <li>
  <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
    <input id="checkbox-item-11" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
    <label for="checkbox-item-11" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">${name}</label>
  </div>
</li>`;
};
const make_template = (title) => {
  return `<li>
    <div
      class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
    >
      <input
        id="checkbox-item-6"
        type="checkbox"
        value=""
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label
        for="checkbox-item-6"
        class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
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
  if (result) {
    result.data.map((item) => {
      console.log("name", item.first_name + item.last_name);
      document.getElementById("search-user").innerHTML += make_user(
        item.first_name + item.last_name,
        item.email,
        item.employee_code,
        item.mobile_number,
        item.created_at,
        item.updated_at
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
      item.title
    );
  });
}
document.addEventListener("DOMContentLoaded", () => {
  getAllUsers();
  getAllTemplates();
});

// document.getElementById("search-user").addEventListener("click", () => {
//   getAllUsers();
// });

// use debounce hook
document.getElementById("search").addEventListener("input", () => {
  debounce(getAllUsers(), 250);
});
