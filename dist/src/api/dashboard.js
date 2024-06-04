import { API_CONSTANTS, ROUTES_CONSTANTS } from "../utils/constants.js";
import { makeRequest } from "./apiRequest.js";

const apiUrl =
  API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.GET_USER_INFO;
export async function UserInfoApiRequest(token) {
  const requestOptions = {
    method: API_CONSTANTS.GET,
    headers: {
      //   'Authorization': 'Bearer <token>'
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await makeRequest(apiUrl, requestOptions);
    console.log(response, "makerequest");

    return response.json();
  } catch (error) {
    console.log(error, "error");
  }
}

const getQueueLetters = async () => {
  const email = localStorage.getItem("email");
  // this user id is of ipvms
  const userId = localStorage.getItem("userId");
  // from local storage

  const data = await axios.get(
    `http://localhost:5001/api/file/letter/${userId}`
  );
  const filteredData = data.data.data.filter((item) => {
    return item.status === "PENDING";
  });

  console.log("upload doc is", data);
  // error upload doc
  // link and render
  let queueLetterHtml = `<ul role="list" class="flex flex-col justify-between">`;

  if (filteredData && filteredData.length != 0) {
    filteredData.forEach((item) => {
      if (item.firstname === "New" && item.lastname === "User") {
        queueLetterHtml += `<li class="mt-4">
        <div role="button"
          class="flex items-center gap-3 transition duration-300 hover:border-gray-400 hover:bg-gray-50 hover:rounded-lg p-3">
          <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
            <span class="text-base font-medium text-[#333333] truncate">
              ${item?.name?.charAt(0)}
            </span>
          </div>
          <div class="flex-1">
            <p class="text-base font-medium text-[#333333] truncate">
              ${item?.name}
            </p>
          
            
          </div>
          <div class="flex justify-center items-center">
          <div class="flex justify-center items-center">
  <div class="bg-green-100 border border-green-500 text-green-500 text-xs font-semibold px-4 py-1 rounded-full transition-colors duration-300 hover:bg-green-500 hover:border-green-500 hover:text-white">
    New User
  </div>
</div>

        </div>
          `;
      } else {
        queueLetterHtml += `<li class="mt-4">
          <div role="button"
            class="flex items-center gap-3 transition duration-300 hover:border-gray-400 hover:bg-gray-50 hover:rounded-lg p-3">
            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
              <span class="text-base font-medium text-[#333333] truncate">
                ${item?.firstname?.charAt(0) + item?.lastname?.charAt(0)}
              </span>
            </div>
            <div class="flex-1">
              <p class="text-base font-medium text-[#333333] truncate">
                ${item?.firstname + " " + item?.lastname}
              </p>
            </div>`;
      }

      queueLetterHtml += `<div class="flex justify-center items-center">
          <div class="bg-[#FFF0E1] border border-[#F47960] text-[#F47960] text-xs font-semibold px-4 py-1 rounded-full transition-colors duration-300 hover:bg-[#F47960] hover:border-[#F47960] hover:text-white">
            Pending
          </div>
        </div>`;

      queueLetterHtml += `</div></li>`;
    });

    queueLetterHtml += `</ul>`;
    document.getElementById("queueLetter").innerHTML = queueLetterHtml;
  } else {
    document.getElementById("mainqueue").innerHTML = `
    <div class="flex items-center justify-start w-full mb-2">
    <h5
      class="text-xl font-semibold leading-none text-mineshaft-900"
    >
    Employee Queue Letter
    </h5>
  </div>
  <hr class="h-[1px] w-full  border-1 border-[#ECEEF3] bg-[#ECEEF3]" />
  <div class="flex flex-row p-7 gap-2 ">

    <svg id="boards" class="h-60 w-20">
        <use
          xlink:href="/assets/icons/icon.svg#emptyicon"
        ></use>
      </svg>
      <div class="font-roboto font-normal  text-base text-boulder-400 ">
      Oops! It seems there are no queue letter  at the moment.
      </div>
  </div>
    `;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getQueueLetters();
});
