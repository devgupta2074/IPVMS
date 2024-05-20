import { API_CONSTANTS, ROUTES_CONSTANTS } from "../utils/constants.js";
import { makeRequest } from "./apiRequest.js";

const apiUrl =
  API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.SET_TO_APPROVE;
export async function SetDocumentToApprove(admin_id, doc_id, user_id) {
  console.log(admin_id, doc_id);
  const requestData = {
    admin_id: admin_id,
    doc_id: doc_id,
    user_id: user_id,
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
