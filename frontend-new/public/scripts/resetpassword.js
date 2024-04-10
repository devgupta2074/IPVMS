import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
  HEADERS_CONSTANTS,
  TOAST_ERRORS,
} from "../js/constants.js";
import { launch_toast, redirect } from "../js/utils.js";
var url = window.location.href;
const emailerror = document.getElementById("confirmpassworderror");
const passworderror = document.getElementById("passworderror");
// Parse the URL to extract the email parameter
var params = new URLSearchParams(url.split("?")[1]);
var token = params.get("token");
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
    emailerror.innerHTML = "Please enter your email address";
    emailerror.classList.remove("hidden");
    setTimeout(() => {
      emailerror.classList.add("hidden");
    }, 3000);
  }

  if (confirmPassword.length === 0) {
    emailerror.innerHTML = "Please enter your email address";
    emailerror.classList.remove("hidden");
    setTimeout(() => {
      emailerror.classList.add("hidden");
    }, 3000);
  }

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
        if (data.message !== undefined) {
          emailerror.innerHTML = "Please Check your passwords";
          emailerror.classList.remove("hidden");
          setTimeout(() => {
            emailerror.classList.add("hidden");
          }, 3000);
        } else {
          emailerror.innerHTML = "Please check your passwords";
          emailerror.classList.remove("hidden");
          setTimeout(() => {
            emailerror.classList.add("hidden");
          }, 3000);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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

const policyIds = ["policy1", "policy2", "policy3"];
let currentIndex = 0;
function showNextPolicy() {
  if (currentIndex !== 0) {
    const currentPolicyId = policyIds[currentIndex - 1];
    const currentPolicyDiv = document.getElementById(currentPolicyId);
    currentPolicyDiv.classList.add("hidden");
    currentPolicyDiv.style.opacity = "0";
  }

  // Add the necessary classes to show the div with a smooth transition
  const currentPolicyIdx = policyIds[currentIndex];
  const currentPolicyDivx = document.getElementById(currentPolicyIdx);
  currentPolicyDivx.classList.remove("hidden");
  currentPolicyDivx.style.opacity = "1";

  // Increment the index or reset it if reached the end
  currentIndex = (currentIndex + 1) % policyIds.length;
}
showNextPolicy();
setInterval(showNextPolicy, 3000);
