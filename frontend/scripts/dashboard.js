if (localStorage.getItem("token") === null) {
  window.location.hash = "#login"; // Redirect to login page if token is not present
  window.location.reload();
}
