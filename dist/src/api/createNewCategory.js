import { API_CONSTANTS, ROUTES_CONSTANTS } from "../utils/constants.js";
import { makeRequest } from "./apiRequest.js";

const apiUrl =
  API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.CREATE_NEW_CATEGORY;
export async function createNewCategory(categoryName) {
  console.log(categoryName, "inside create new category");
  const requestData = {
    category: categoryName,
  };

  const requestOptions = {
    method: API_CONSTANTS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: requestData,
  };

  try {
    const response = await makeRequest(apiUrl, requestOptions);
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
