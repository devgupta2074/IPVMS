import { redirect } from "../utils/utils.js";
import { emailValidation, passwordValidation } from "../utils/utils.js";

// async function SignIn() {
//   console.log("Signing in...");
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("password").value;

//   console.log("from webpage", email, password);
//   const response = await fetch("http://127.0.0.1:3000/api/user/loginUser", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response from the backend
//       console.log(data);
//       localStorage.setItem("token", data.token);
//       window.location.href = "#dashboard";
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

async function SignUp() {
  console.log("Sign Up");
  let Fname = document.getElementById("firstName").value;
  let Lname = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("c_password").value;

  if (confirm_password === password) {
    const emailcheck = emailValidation(email);
    console.log(emailcheck);
    const passwordcheck = passwordValidation(password);
    if (emailcheck.success && passwordcheck.success) {
      const response = await fetch(
        "http://127.0.0.1:3000/api/user/registerUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: Fname,
            lastName: Lname,
            email: email,
            password: password,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          console.log(data);
          redirect("#login");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      if (!emailcheck.success) {
        alert(emailcheck.error);
        launch_toast(emailcheck.error);
      } else {
        alert(passwordcheck.error);
      }
    }
  } else {
    alert("Passwords do not match");
  }
}

const signUpButton = document.getElementById("signupbutton");

// Add event listener to the button
signUpButton.addEventListener("click", function () {
  // Call the SignIn function when the button is clicked
  SignUp();
});

const tologin = document.getElementById("tologin");

// Add event listener to the button
tologin.addEventListener("click", function () {
  // Call the SignIn function when the button is clicked
  redirect("#login");
});
