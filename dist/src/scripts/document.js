import {
  fetchCategories,
  removeClr,
  removeHoverButttons,
} from "../components/Categories.js";
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

document.addEventListener("DOMContentLoaded", async () => {
  await fetchCategories().then(() => {
    let category = "";
    console.log(localStorage.getItem("category"));
    if (localStorage.getItem("category")) {
      category = localStorage.getItem("category");
      console.log(document.getElementById(category));
      if (document.getElementById(category)) {
        const category_buttons = document.querySelectorAll(
          "div#category-row > button"
        );
        removeClr(category_buttons);
        document
          .getElementById(category)
          .classList.add(
            "text-[#1F2DE3]",
            "border-b-[3px]",
            "border-b-[#1F2DE3]"
          );
      }

      localStorage.removeItem("category");
    }

    const tableType = {
      name: "",
      category: category,
      pagination: true,
    };
    fetchTable(tableType);
  });

  // removeHoverButttons();
});
