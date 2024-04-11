import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ERRORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
} from "../js/constants.js";
import { launch_toast, redirect } from "../js/utils.js";

async function SignIn() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  console.log("from webpage", email, password);
  if (email.length == 0) {
    launch_toast(
      TOAST_ERRORS.EMAIL_NOT_PRESENT,
      TOAST_COLORS.ERROR,
      TOAST_ICONS.ERROR
    );
  } else if (password.length == 0) {
    launch_toast(
      TOAST_ERRORS.PASSWORD_NOT_PRESENT,
      TOAST_COLORS.ERROR,
      TOAST_ICONS.ERROR
    );
  } else {
    console.log(API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.LOGIN);
    const response = await fetch(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.LOGIN,
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
            console.log("here1");
            launch_toast(data.error, TOAST_COLORS.ERROR, TOAST_ICONS.ERROR);
          } else if (data.error === TOAST_ERRORS.INVALID_EMAIL_FORMAT) {
            launch_toast(data.error, TOAST_COLORS.ERROR, TOAST_ICONS.ERROR);
          } else {
            console.log("here");
            launch_toast(
              TOAST_ERRORS.INVALID_CREDENTIALS,
              TOAST_COLORS.ERROR,
              TOAST_ICONS.ERROR
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

// const signInButton = document.getElementById("loginbutton");

// // Add event listener to the button
// signInButton.addEventListener("click", function () {
//   // Call the SignIn function when the button is clicked
//   SignIn();
// });

const eyeButton = document.getElementById("eye");
const tooltiptext = document.getElementById("password-tooltip");
let password = document.getElementById("password");
eyeButton.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  if (type === "text") {
    tooltiptext.textContent = "Hide Password";
    document
      .getElementById("eyesvg")
      .setAttribute("xlink:href", "./assets/icons/icon.svg#hideeye");
  } else {
    tooltiptext.textContent = "Show Password";
    document
      .getElementById("eyesvg")
      .setAttribute("xlink:href", "./assets/icons/icon.svg#eye");
  }
});

const trigger = document.getElementById("eye");
const tooltip = document.getElementById("tooltip");

// Show tooltip on mouseover
trigger.addEventListener("mouseover", () => {
  tooltip.classList.remove("hidden");
});

// Hide tooltip on mouseout
trigger.addEventListener("mouseout", () => {
  tooltip.classList.add("hidden");
});

// Position the tooltip relative to the trigger

const tosignup = document.getElementById("tosignup");

// Add event listener to the button
// tosignup.addEventListener("click", function () {
//   redirect(VIEWS_CONSTANTS.FORGET_PASSWORD);
// });

document.addEventListener("DOMContentLoaded", function (event) {
  // This function will run when the content of the page has loaded
  window.location.reload();
});
