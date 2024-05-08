import { API_CONSTANTS, ROUTES_CONSTANTS } from "../utils/constants.js";
import { makeRequest } from "./apiRequest.js";

const apiUrl =
  API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.FORGET_PASSWORD;
export async function ForgetPasswordApiRequest(email) {
  const requestData = {
    email: email,
  };

  const requestOptions = {
    method: API_CONSTANTS.POST,
    headers: {
      //   'Authorization': 'Bearer <token>'
      "Content-Type": "application/json",
    },
    body: requestData,
  };

  const response = await makeRequest(apiUrl, requestOptions);
  console.log(response, "makerequest");

  return response.json();

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
