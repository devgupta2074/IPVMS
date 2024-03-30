"use strict";

(function () {
  function init() {
    var router = new Router([
      new Route("login", "login.html", true),
      new Route("dashboard", "dashboard.html"),
      new Route("signup", "signup.html"),
    ]);
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
