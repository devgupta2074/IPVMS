import { ForgetPasswordApiRequest } from "../api/forgetpassword.js";
import {
  API_CONSTANTS,
  LOGIN_CONSTANTS,
  ROUTES_CONSTANTS,
  TOAST_COLORS,
  TOAST_ICONS,
  VIEWS_CONSTANTS,
  HEADERS_CONSTANTS,
  TOAST_ERRORS,
} from "../utils/constants.js";
import { redirect, showNextPolicy } from "../utils/utils.js";
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
      API_CONSTANTS.BACKEND_BASE_URL_PROD + ROUTES_CONSTANTS.FORGET_PASSWORD
    );

    await ForgetPasswordApiRequest(email)
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

showNextPolicy();
setInterval(showNextPolicy, 3000);
