import { TOAST_COLORS } from "./constants.js";

export const emailValidation = (email) => {
  const check = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
  if (!check.test(email)) {
    return { error: "Invalid Email format", success: false };
  }
  const index = email.indexOf("@");
  const domain = email.slice(index + 1);
  if (domain !== "ex2india.com") {
    return { error: "Invalid Domain", success: false };
  }
  return { success: true };
};

export function launch_toast(message, color, icon) {
  var x = document.getElementById("toast");
  var y = document.getElementById("desc");
  var z = document.getElementById("toast_img"); // Assuming "icon" is the ID of the element where you want to display the icon.
  console.log(y);
  x.className = TOAST_COLORS.SHOW;

  x.style.backgroundColor = color;
  y.innerText = message;
  z.style.fontSize = TOAST_COLORS.ICON_SIZE;
  z.className = icon; // Assuming you're using Font Awesome for icons. Adjust this line based on your icon library or implementation.
  y.className = TOAST_COLORS.SHOW;
  setTimeout(function () {
    x.className = x.className.replace(TOAST_COLORS.SHOW, "");
    y.className = y.className.replace(TOAST_COLORS.SHOW, "");
  }, 5000);
}

// At least one uppercase letter
// At least one lowercase letter
// At least one digit
// At least one special symbol
// should be more than 4 character

export const passwordValidation = (password) => {
  if (!/[A-Z]/.test(password)) {
    return {
      error: "Password should contain at least one uppercase letter",
      success: false,
    };
  } else if (!/[a-z]/.test(password)) {
    return {
      error: "Password should contain at least one lowercase letter",
      success: false,
    };
  } else if (!/[0-9]/.test(password)) {
    return {
      error: "Password should contain at least one digit",
      success: false,
    };
  } else if (!/[^A-Za-z0-9]/.test(password)) {
    return {
      error: "Password should contain at least one special symbol",
      success: false,
    };
  } else if (password.length < 4) {
    return {
      error: "Password should be more than 4 character",
      success: false,
    };
  } else {
    return { success: true };
  }
};

export function redirect(url) {
  // console.log("ddd");
  // if (localStorage.getItem("token") === null && url === "#dashboard") {
  //   url = "/"; // Redirect to login page if token is not present
  // }
  console.log(window.location.href);
  window.location.href = "http://localhost:5555" + url;
}

const policyIds = ["policy1", "policy2", "policy3"];
let currentIndex = 0;

export function showNextPolicy() {
  if (currentIndex !== 0) {
    const currentPolicyId = policyIds[currentIndex - 1];
    const currentPolicyDiv = document.getElementById(currentPolicyId);
    currentPolicyDiv.classList.add("hidden");
    currentPolicyDiv.classList.remove("flex");
    currentPolicyDiv.style.opacity = "0";
    const currentPolicyIdx = policyIds[currentIndex];
    const currentPolicyDivx = document.getElementById(currentPolicyIdx);
    currentPolicyDivx.classList.remove("hidden");
    currentPolicyDivx.classList.add("flex");
    currentPolicyDivx.style.opacity = "1";
  } else {
    const currentPolicyId = policyIds[policyIds.length - 1];
    const currentPolicyDiv = document.getElementById(currentPolicyId);
    currentPolicyDiv.classList.add("hidden");
    currentPolicyDiv.classList.remove("flex");
    currentPolicyDiv.style.opacity = "0";
    const currentPolicyIdx = policyIds[currentIndex];
    const currentPolicyDivx = document.getElementById(currentPolicyIdx);
    currentPolicyDivx.classList.remove("hidden");
    currentPolicyDivx.classList.add("flex");
    currentPolicyDivx.style.opacity = "1";
  }

  // Add the necessary classes to show the div with a smooth transition

  // Increment the index or reset it if reached the end
  currentIndex = (currentIndex + 1) % policyIds.length;
}
