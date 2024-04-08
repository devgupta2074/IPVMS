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
const emailerror = document.getElementById("emailerror");
async function ForgetPassword() {
  let email = document.getElementById("email").value;
  if (email.length == 0) {
    emailerror.innerHTML = "Please enter your email address";
    emailerror.classList.remove("hidden");
    setTimeout(() => {
      emailerror.classList.add("hidden");
    }, 3000);
  } else {
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

          redirect(VIEWS_CONSTANTS.EMAIL_SENT + `?email=${email}`);
        } else {
          if (data.message === LOGIN_CONSTANTS.USER_NOT_FOUND) {
            console.log(data.message, TOAST_COLORS.ERROR, TOAST_ICONS.ERROR);
            emailerror.innerHTML = "Please enter a valid email address";
            emailerror.classList.remove("hidden");
            setTimeout(() => {
              emailerror.classList.add("hidden");
            }, 3000);
          } else {
            emailerror.innerHTML = "Please enter a valid email address";
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
}
const submit = document.getElementById("submit");

// Add event listener to the button
submit.addEventListener("click", function (e) {
  console.log("click");
  console.log(document.getElementById("email").value);
  ForgetPassword();
  let email = document.getElementById("email").value;

  // Call the SignIn function when the button is clicked
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
