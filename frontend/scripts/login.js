import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
} from "../js/constants.js";
import { launch_toast, redirect } from "../js/utils.js";

async function SignIn() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  console.log("from webpage", email, password);
  console.log(API_CONSTANTS.BACKEND_BASE_URL + ROUTES_CONSTANTS.LOGIN);
  const response = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL + ROUTES_CONSTANTS.LOGIN,
    {
      method: API_CONSTANTS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data);

      if (data.success) {
        console.log(data);
        launch_toast(data.message, TOAST_COLORS.SUCCESS, TOAST_ICONS.SUCCESS);
        localStorage.setItem(API_CONSTANTS.TOKEN, data.token);
        redirect(VIEWS_CONSTANTS.DASHBOARD);
      } else {
        if (data.error === LOGIN_CONSTANTS.INVALID_DOMAIN) {
          launch_toast(data.error, TOAST_COLORS.ERROR, TOAST_ICONS.ERROR);
        } else if (data.error == LOGIN_CONSTANTS.INVALID_EMAIL_FORMAT) {
          launch_toast(data.error, TOAST_COLORS.ERROR, TOAST_ICONS.SUCCESS);
        } else {
          launch_toast(data.error, TOAST_COLORS.ERROR, TOAST_ICONS.SUCCESS);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const signInButton = document.getElementById("loginbutton");

// Add event listener to the button
signInButton.addEventListener("click", function () {
  // Call the SignIn function when the button is clicked
  SignIn();
});

const tosignup = document.getElementById("tosignup");

// Add event listener to the button
tosignup.addEventListener("click", function () {
  // Call the SignIn function when the button is clicked
  redirect("#signup");
});
