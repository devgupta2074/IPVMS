import { fetchCategories, removeHoverButttons } from "../components/Categories.js";
import { InsertNavbar } from "../components/Navbar.js";
import { fetchTable } from "../components/Table.js";

InsertNavbar();

document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode === 27) {
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
    let modals = document.getElementsByClassName("modal");
    Array.prototype.slice.call(modals).forEach((i) => {
      i.style.display = "none";
    });
  }
};

const tableType = {
  name: "",
  category: "",
  pagination: true,
};
document.addEventListener("DOMContentLoaded", async () => {

  fetchTable(tableType);
  await fetchCategories();
  // removeHoverButttons();
});

