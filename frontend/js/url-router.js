import { removeUnwantedScripts } from "./utils.js";

const urlPageTitle = "JS Single Page Application Router";

// create document click that watches the nav links only
// document.addEventListener("click", (e) => {
//   console.log("ffff");
//   e.preventDefault();
//   console.log("ffff");
//   const { target } = e;
//   if (!target.matches("nav a")) {
//     return;
//   }
//   console.log("ffff");
//   e.preventDefault();
//   urlRoute();
// });

// create an object that maps the url to the template, title, and description
const urlRoutes = {
  404: {
    template: "/frontend/views/404.html",
    title: "IPVMS | " + "Dashboard",
    description: "User Dashboard",
    js: "dashboard",
  },
  "/": {
    template: "/frontend/views/login.html",
    title: "Home | " + urlPageTitle,
    description: "This is the home page",
    js: "login",
  },
  "/resetpassword": {
    template: "/frontend/views/resetpassword.html",
    title: "About Us | " + urlPageTitle,
    description: "This is the about page",
  },
  "/dashboard": {
    template: "/frontend/views/dashboard.html",
    title: "IPVMS | " + "Dashboard",
    description: "User Dashboard",
    js: "dashboard",
  },
  "/signup": {
    template: "/frontend/views/signup.html",
    title: "Contact Us | " + urlPageTitle,
    description: "This is the contact page",
    js: "signup",
  },
  "/forgetpassword": {
    template: "/frontend/views/forgetpassword.html",
    title: "Contact Us | " + urlPageTitle,
    description: "This is the contact page",
    js: "forgetpassword",
  },
};

// create a function that watches the url and calls the urlLocationHandler
export const urlRoute = (url, e) => {
  // window.history.pushState(state, unused, target link);
  window.history.pushState(null, null, "/frontend/" + url);
  // window.history.pushState({}, "", url);

  urlLocationHandler();
};

// create a function that handles the url location
const urlLocationHandler = async () => {
  let location = window.location.pathname.substring("/frontend".length); // get the url path
  // if the path length is 0, set it to primary page route
  if (location.length == 0) {
    location = "/";
  }
  console.log(location);
  // get the route object from the urlRoutes object
  console.log(urlRoutes[location]);
  const route = urlRoutes[location] || urlRoutes["404"];
  // get the html from the template
  const html = await fetch(route.template).then((response) => response.text());
  // set the content of the content div to the html
  document.getElementById("content").innerHTML = html;
  // set the title of the document to the title of the route
  document.title = route.title;
  // set the description of the document to the description of the route
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
  const scriptName = urlRoutes[location].js; // Remove leading '/'

  const scriptUrl = `/frontend/scripts/${scriptName}.js`;
  var scriptElem = document.createElement("script");
  scriptElem.type = "module";
  scriptElem.src = scriptUrl;
  document.body.appendChild(scriptElem);
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();
