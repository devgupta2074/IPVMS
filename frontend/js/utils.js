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
  setTimeout(function () {
    x.className = x.className.replace(TOAST_COLORS.SHOW, "");
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
  window.location.href = url;
}
