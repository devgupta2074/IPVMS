import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
  HEADERS_CONSTANTS,
} from "../js/constants.js";
import { launch_toast, redirect } from "../js/utils.js";

async function ResetPassword() {
  var url = window.location.href;

  // Parse the URL to extract the email parameter
  var params = new URLSearchParams(url.split("?")[1]);
  var token = params.get("token");
  token = token.split("#")[0];

  // Log the token value to the console
  console.log(token);

  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  const contenttype = HEADERS_CONSTANTS.CONTENT_TYPE;
  console.log(
    API_CONSTANTS.BACKEND_BASE_URL +
      ROUTES_CONSTANTS.RESET_PASSWORD +
      "/" +
      token
  );

  const response = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL +
      ROUTES_CONSTANTS.RESET_PASSWORD +
      "/" +
      token,
    {
      method: API_CONSTANTS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        confirmPassword: confirmPassword,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data);

      if (data.success) {
        console.log(data);

        redirect(VIEWS_CONSTANTS.RESET_SUCCESS);
      } else {
        if (data.message !== undefined) {
          launch_toast(data.message, TOAST_COLORS.ERROR, TOAST_ICONS.ERROR);
        } else {
          launch_toast(data.error, TOAST_COLORS.ERROR, TOAST_ICONS.ERROR);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
const tologin = document.getElementById("submit");

// Add event listener to the button
tologin.addEventListener("click", function (e) {
  console.log("click");

  ResetPassword();

  // Call the SignIn function when the button is clicked
  //   redirect("#login");
});
