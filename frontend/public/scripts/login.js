import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ERRORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
} from "../js/constants.js";
import { launch_toast, redirect, showNextPolicy } from "../js/utils.js";

const emailerror = document.getElementById("emailerror");
const passworderror = document.getElementById("passworderror");

async function SignIn() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  console.log("from webpage", email, password);
  if (email.length == 0) {
    emailerror.innerHTML = "Please enter your email address";
    emailerror.classList.remove("opacity-0");
    setTimeout(() => {
      emailerror.classList.add("opacity-1");
    }, 3000);
  } else if (password.length == 0) {
    passworderror.innerHTML = "Please enter your password";
    passworderror.classList.remove("opacity-0");
    setTimeout(() => {
      passworderror.classList.add("opacity-0");
    }, 3000);
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
        // console.log(data);
        if (data.success) {
          console.log(data);
          // launch_toast(data.message, TOAST_COLORS.SUCCESS, TOAST_ICONS.SUCCESS);
          localStorage.setItem(API_CONSTANTS.TOKEN, data.token);
          redirect(VIEWS_CONSTANTS.DASHBOARD);
        } else {
          if (data.error === LOGIN_CONSTANTS.INVALID_DOMAIN) {
            emailerror.innerHTML = "Invalid email domain";
            emailerror.classList.remove("opacity-0");
            setTimeout(() => {
              emailerror.classList.add("opacity-0");
            }, 3000);
          } else if (data.error === TOAST_ERRORS.INVALID_EMAIL_FORMAT) {
            emailerror.innerHTML = "Invalid Email Format";
            emailerror.classList.remove("opacity-0");
            setTimeout(() => {
              emailerror.classList.add("opacity-0");
            }, 3000);
          } else {
            passworderror.innerHTML = "Invalid Credentials Please Check Again.";
            passworderror.classList.remove("opacity-0");
            setTimeout(() => {
              passworderror.classList.add("opacity-0");
            }, 3000);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

const signInButton = document.getElementById("signin");

signInButton.addEventListener("click", function () {
  SignIn();
});

// hide and show password and tooltip for the same
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
trigger.addEventListener("mouseover", () => {
  tooltip.classList.remove("hidden");
});
trigger.addEventListener("mouseout", () => {
  tooltip.classList.add("hidden");
});

// button to redirect to forgetpassword
const forgetpassword = document.getElementById("forgetpassword");
forgetpassword.addEventListener("click", function () {
  console.log("Forgot Password");

  redirect(VIEWS_CONSTANTS.FORGET_PASSWORD);
});

showNextPolicy();
setInterval(showNextPolicy, 3000);
