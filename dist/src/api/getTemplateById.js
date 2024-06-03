import { API_CONSTANTS, ROUTES_CONSTANTS } from "../utils/constants.js";
import { makeRequest } from "./apiRequest.js";

const apiUrl =
  API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.GET_TEMPLATE_BY_ID;
export async function GetTemplateById(id) {
  const requestOptions = {
    method: API_CONSTANTS.GET,
    headers: {
      //   'Authorization': 'Bearer <token>'
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await makeRequest(apiUrl + "/" + id, requestOptions);
    console.log(response, "makerequest");

    return response.json();
  } catch (error) {
    console.log(error, "error");
    return error;
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
