import { LoginApiRequest } from "../api/login.js";
import { setupAccountApiRequest } from "../api/setupaccount.js";
import { makeRequest } from "../api/apiRequest.js";
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

  console.log(
    "lololololololoolol",
    firstName,
    lastName,
    email,
    password,
    cnfPassword,
    phone
  );

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
      .then(async (data) => {
        setupButton.removeAttribute("disabled", "");
        setupButton.setAttribute("enabled", "");
        setupButton.innerHTML = `Setup Account`;
        // console.log(data);
        data = await data.json();
        console.log(data);

        if (data?.success) {
          if (data.statusCode === 318) {
            passworderror.innerHTML =
              "Account is already setup for user. Try Logging In.";
            passworderror.classList.remove("opacity-0");
            setTimeout(() => {
              passworderror.classList.add("opacity-0");
              redirect(VIEWS_CONSTANTS.LOGIN);
            }, 5000);
          }
          // console.log(data);
          // launch_toast(data.message, TOAST_COLORS.SUCCESS, TOAST_ICONS.SUCCESS);
          localStorage.setItem(API_CONSTANTS.TOKEN, data.token);
          localStorage.setItem("email", data?.user?.email);
          localStorage.setItem("userId", data?.user?.id);

          redirect(VIEWS_CONSTANTS.LOGIN);
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

const token = localStorage.getItem("token");
console.log(token);
const apiUrl =
  API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.GET_USER_INFO;
async function UserInfoApiRequest(token) {
  const requestOptions = {
    method: API_CONSTANTS.GET,
    headers: {
      //   'Authorization': 'Bearer <token>'
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await makeRequest(apiUrl, requestOptions);
    console.log(response, "makerequest");

    return response.json();
  } catch (error) {
    console.log(error, "error");
  }
}

const user = await UserInfoApiRequest(token);
console.log(user.data.email);
document.getElementById("email").value = user.data.email;

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
