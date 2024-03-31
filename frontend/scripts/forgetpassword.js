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

async function ForgetPassword() {
  let email = document.getElementById("email").value;
  const contenttype = HEADERS_CONSTANTS.CONTENT_TYPE;
  console.log(
    API_CONSTANTS.BACKEND_BASE_URL + ROUTES_CONSTANTS.FORGET_PASSWORD
  );

  const response = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL + ROUTES_CONSTANTS.FORGET_PASSWORD,
    {
      method: API_CONSTANTS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data);

      if (data.success) {
        console.log(data);
        console.log(data.secretToken);

        // redirect(`?email=${email}` + VIEWS_CONSTANTS.EMAIL_SENT);
      } else {
        if (data.message === LOGIN_CONSTANTS.USER_NOT_FOUND) {
          console.log(data.message, TOAST_COLORS.ERROR, TOAST_ICONS.ERROR);
          launch_toast(data.message, TOAST_COLORS.ERROR, TOAST_ICONS.ERROR);
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
  console.log(document.getElementById("email").value);
  ForgetPassword();

  // Call the SignIn function when the button is clicked
  //   redirect("#login");
});
