import { LoginApiRequest } from "../api/login.js";
import { setupAccountApiRequest } from "../api/setupaccount.js";
import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ERRORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";
import { redirect, showNextPolicy } from "../utils/utils.js";

showNextPolicy();
setInterval(showNextPolicy, 3000);


async function SetupAccount() {
  const setupButton = document.getElementById("setup-account");

  const phone = document.getElementById("pnumber").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const cnfPassword = document.getElementById("cnf-password").value;
  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;

  console.log("lololololololoolol", firstName, lastName, email, password, cnfPassword, phone);

  // console.log("from webpage", email, password);
  if (!phone || !firstName || !lastName) {
    passworderror.innerHTML = "Enter All the fields";
    passworderror.classList.remove("opacity-0");
    setTimeout(() => {
      passworderror.classList.add("opacity-0");
    }, 3000);
  } else if (email.length == 0) {
    passworderror.innerHTML = "Please enter your email address";
    passworderror.classList.remove("opacity-0");
    setTimeout(() => {
      passworderror.classList.add("opacity-0");
    }, 3000);
  } else if (password.length == 0) {
    passworderror.innerHTML = "Please enter your password";
    passworderror.classList.remove("opacity-0");
    setTimeout(() => {
      passworderror.classList.add("opacity-0");
    }, 3000);
  } else if (cnfPassword != password) {
    passworderror.innerHTML = "Passwords dont match try again.";
    passworderror.classList.remove("opacity-0");
    setTimeout(() => {
      passworderror.classList.add("opacity-0");
    }, 3000);
  } else {
    setupButton.removeAttribute("enabled", "");
    setupButton.setAttribute("disabled", "");
    setupButton.innerHTML = `  <svg  class="h-4 w-5  ">
  <use  xlink:href="/assets/icons/icon.svg#loader-white"></use>
</svg>`;

    // const response = await LoginApiRequest(email, password);
    // console.log(response, "he");
    await setupAccountApiRequest(firstName, lastName, email, password)
      .then((data) => {
        console.log(data);
        setupButton.removeAttribute("disabled", "");
        setupButton.setAttribute("enabled", "");
        setupButton.innerHTML = `Setup Account`;
        if (data?.success) {
          console.log(data);
          // launch_toast(data.message, TOAST_COLORS.SUCCESS, TOAST_ICONS.SUCCESS);
          localStorage.setItem(API_CONSTANTS.TOKEN, data.token);
          redirect(VIEWS_CONSTANTS.DASHBOARD);
        } else {
          if (data.error === TOAST_ERRORS.INVALID_EMAIL_FORMAT) {
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

const setupButton = document.getElementById("setup-account");
setupButton.addEventListener("click", function () {
  SetupAccount();
});

// hide and show password and tooltip for the same
// const eyeButton = document.getElementById("eye");
// const tooltiptext = document.getElementById("password-tooltip");
// let password = document.getElementById("password");
// eyeButton.addEventListener("click", function () {
//   const type =
//     password.getAttribute("type") === "password" ? "text" : "password";
//   password.setAttribute("type", type);

//   if (type === "text") {
//     tooltiptext.textContent = "Hide Password";
//     document
//       .getElementById("eyesvg")
//       .setAttribute("xlink:href", "./assets/icons/icon.svg#hideeye");
//   } else {
//     tooltiptext.textContent = "Show Password";
//     document
//       .getElementById("eyesvg")
//       .setAttribute("xlink:href", "./assets/icons/icon.svg#eye");
//   }
// });
// const trigger = document.getElementById("eye");
// const tooltip = document.getElementById("tooltip");
// trigger.addEventListener("mouseover", () => {
//   tooltip.classList.remove("hidden");
// });
// trigger.addEventListener("mouseout", () => {
//   tooltip.classList.add("hidden");
// });

// button to redirect to forgetpassword
