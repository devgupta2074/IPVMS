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
  // await makeRequest(apiUrl, requestOptions)
  //   .then((data) => {
  //     console.log(data, "makerequest");
  //     return data;
  //   })
  //   .catch((error) => {
  //     // Handle errors
  //     console.error(error);
  //     return error;
  //   });
}

const getQueueLetters = () => {
  const email = "tarora@ex2india.com";
  const userId = "07d873df-f43a-4ddc-bdbe-045fbb589f7f";
  fetch("http://localhost:3000/api/document/getSendedDocument", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      ShareLink: email,
    }),
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("upload doc  is", data);
      //error upload doc
      //link and render
    })
    .catch((error) => {});
};

document.addEventListener("DOMContentLoaded", () => {
  getQueueLetters();
});

console.log("running");
