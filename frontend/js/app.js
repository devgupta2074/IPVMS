"use strict";

(function () {
  function init() {
    var router = new Router([
      new Route("login", "login.html", true),
      new Route("dashboard", "dashboard.html"),
      new Route("signup", "signup.html"),
      new Route("forgetpassword", "forgetpassword.html"),
      new Route("emailsent", "emailsent.html"),
      new Route("resetpassword", "resetpassword.html"),
      new Route("resetsuccess", "resetsuccess.html"),
    ]);
    if (
      localStorage.getItem("token") === null &&
      window.location.hash === "#dashboard"
    ) {
      window.location.hash = "#login"; // Redirect to login page if token is not present
      window.location.reload();
    }
  }
  init();
})();

// UTILS FUNCTIONS

// AUTH JS

// At least one uppercase letter
// At least one lowercase letter
// At least one digit
// At least one special symbol
// should be more than 4 character
