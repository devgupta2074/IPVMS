import { API_CONSTANTS, ROUTES_CONSTANTS } from "../utils/constants.js";
import { makeRequest } from "./apiRequest.js";

const apiUrl = API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.LOGIN;
export async function LoginApiRequest(email, password) {
  const requestData = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: API_CONSTANTS.POST,
    headers: {
      //   'Authorization': 'Bearer <token>'
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
