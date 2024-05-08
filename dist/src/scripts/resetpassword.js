import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
  HEADERS_CONSTANTS,
  TOAST_ERRORS,
  PASSWORD_CONSTANTS,
} from "../utils/constants.js";
import { redirect, showNextPolicy } from "../utils/utils.js";
let url = window.location.href;
const emailerror = document.getElementById("confirmpassworderror");
const passworderror = document.getElementById("passworderror");
// Parse the URL to extract the email parameter
let params = new URLSearchParams(url.split("?")[1]);
let token = params.get("token");
console.log(token);
if (!token) {
  // launch_toast(
  //   TOAST_ERRORS.LINK_IS_NOT_VALID,
  //   TOAST_COLORS.ERROR,
  //   TOAST_ICONS.ERROR
  // );
  console.log(TOAST_ERRORS.LINK_IS_NOT_VALID);
  console.log(TOAST_ERRORS.REDIRECTING);

  setTimeout(() => {
    redirect(VIEWS_CONSTANTS.LOGIN);
  }, 3000);
}
async function ResetPassword() {
  token = token.split("#")[0];

  // Log the token value to the console
  console.log(token);

  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  if (password.length === 0) {
    passworderror.innerHTML = "Please enter your password";
    passworderror.classList.remove("opacity-0");
    setTimeout(() => {
      passworderror.classList.add("opacity-0");
    }, 3000);
  }
  if (confirmPassword.length === 0) {
    emailerror.innerHTML = "Please enter confirmation password";
    emailerror.classList.remove("opacity-0");
    setTimeout(() => {
      emailerror.classList.add("opacity-0");
    }, 3000);
  }
  if (password !== confirmPassword) {
    emailerror.innerHTML = "Passwords do not match. Please Check!";
    emailerror.classList.remove("opacity-0");
    setTimeout(() => {
      emailerror.classList.add("opacity-0");
    }, 3000);
  }

  if (
    password.length !== 0 &&
    confirmPassword.length !== 0 &&
    password === confirmPassword
  ) {
    console.log(
      API_CONSTANTS.BACKEND_BASE_URL_PROD +
        ROUTES_CONSTANTS.RESET_PASSWORD +
        "/" +
        token
    );
    const response = await fetch(
      API_CONSTANTS.BACKEND_BASE_URL_PROD +
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
      .then((response) => {
        if (!response.ok) {
          // If response is not okay (status code other than 2xx), handle the error
          // redirect(VIEWS_CONSTANTS.LINK_NOT_VALID);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the backend
        console.log(data);

        if (data?.success) {
          console.log(data);

          // window.location.href =
          //   "http://127.0.0.1:5501/frontend/index.html" +
          //   VIEWS_CONSTANTS.RESET_SUCCESS;
          // window.location.replace(
          //   "http://127.0.0.1:5501/frontend/index.html" +
          //     VIEWS_CONSTANTS.RESET_SUCCESS
          // );
          // window.location.reload();
          redirect(VIEWS_CONSTANTS.RESET_SUCCESS);
        } else {
          if (data.message === "Token either expired or invalid") {
            redirect(VIEWS_CONSTANTS.LINK_NOT_VALID);
          } else if (data.error === PASSWORD_CONSTANTS.SYMBOL) {
            emailerror.innerHTML = PASSWORD_CONSTANTS.SYMBOL;
            emailerror.classList.remove("opacity-0");
            setTimeout(() => {
              emailerror.classList.add("opacity-0");
            }, 3000);
          } else if (data.error === PASSWORD_CONSTANTS.DIGIT) {
            emailerror.innerHTML = PASSWORD_CONSTANTS.DIGIT;
            emailerror.classList.remove("opacity-0");
            setTimeout(() => {
              emailerror.classList.add("opacity-0");
            }, 3000);
          } else if (data.error === PASSWORD_CONSTANTS.UPPER_CASE) {
            emailerror.innerHTML = PASSWORD_CONSTANTS.UPPER_CASE;
            emailerror.classList.remove("opacity-0");
            setTimeout(() => {
              emailerror.classList.add("opacity-0");
            }, 3000);
          } else {
            emailerror.innerHTML = "Please check your passwords";
            emailerror.classList.remove("opacity-0");
            setTimeout(() => {
              emailerror.classList.add("opacity-0");
            }, 3000);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
const submit = document.getElementById("submit");

// Add event listener to the button
submit.addEventListener("click", function (e) {
  console.log("click");

  ResetPassword();

  // Call the SignIn function when the button is clicked
  //   redirect("#login");
});

const tologin = document.getElementById("tologin");
tologin.addEventListener("click", function (e) {
  e.preventDefault();
  redirect(VIEWS_CONSTANTS.LOGIN);
});

showNextPolicy();
setInterval(showNextPolicy, 3000);
const eyeButton = document.getElementById("eye");
const tooltiptext = document.getElementById("password-tooltip");
let password = document.getElementById("password");
const eyeButton2 = document.getElementById("eye2");
const tooltiptext2 = document.getElementById("password-tooltip2");
let password2 = document.getElementById("confirm-password");
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

eyeButton2.addEventListener("click", function () {
  const type =
    password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type);

  if (type === "text") {
    tooltiptext2.textContent = "Hide Password";
    document
      .getElementById("eyesvg2")
      .setAttribute("xlink:href", "./assets/icons/icon.svg#hideeye");
  } else {
    tooltiptext2.textContent = "Show Password";
    document
      .getElementById("eyesvg2")
      .setAttribute("xlink:href", "./assets/icons/icon.svg#eye");
  }
});
const trigger2 = document.getElementById("eye2");
const tooltip2 = document.getElementById("tooltip2");
trigger2.addEventListener("mouseover", () => {
  tooltip2.classList.remove("hidden");
});
trigger2.addEventListener("mouseout", () => {
  tooltip2.classList.add("hidden");
});
