import { fetchTable, resetVariables } from "./Table.js";


var amount = '';

export async function fetchCategories() {
  const response = await fetch(
    "http://localhost:5001/documents/count/category",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const arr = await response.json();

  addCategoryElements(arr);
  addSelectHighlight();
  moveLeft();
  moveRight();
}

function addCategoryElements(arr) {
  const categoryBar = document.getElementById("insert-categories");
  console.log("buisnsidbi", arr);
  categoryBar.innerHTML += `
  <div class="flex justify-between gap-4 bg-white rounded-md">
  <button id="move-left"  class='px-3 py-4'>
  <svg  class="h-4 w-4 m-1">
  <use
    xlink:href="/assets/icons/icon.svg#leftarrow-black"
  ></use>
</svg>
</button>
      <div id="category-row" class="flex flex-row gap-4 overflow-x-auto no-scrollbar">

<button id='' class ='min-w-36 py-4 text-sm font-medium text-[#1F2DE3] border-b-[3px] border-b-[#1F2DE3] hover:text-ship-cove-500 hover:border-b-[3px] hover:border-b-ship-cove-500'>All</button>      
</div>
<div class="py-4">
<button class=" rounded-full bg-ship-cove-200 h-8 p-1">
<svg id="plus" class="h-4 w-4 m-1">
<use
  xlink:href="/assets/icons/icon.svg#plusSymbol-black"
></use>
</svg>
</button>
</div>
<button id="move-right" class='px-3 py-4'>
<svg  class="h-4 w-4 m-1">
<use
  xlink:href="/assets/icons/icon.svg#rightarrow-black"
></use>
</svg>
</button>
</div>
      `;

  const categoryRow = document.getElementById("category-row");

  arr.forEach((element) => {
    if (element.id != null)
      categoryRow.innerHTML += `
    <button class =' min-w-36 py-2  text-sm font-medium hover:text-ship-cove-500 hover:border-b-[3px] hover:border-b-ship-cove-500 ' >${element.category}</button>
    `;
  });
}


function addSelectHighlight() {
  const category_buttons = document.querySelectorAll(
    "div#category-row > button"
  );

  category_buttons.forEach((e) => {
    e.addEventListener("click", () => {
      window.event.preventDefault();
      ``;
      removeClr(category_buttons);
      addClr(e);

      let category = e.textContent;
      // console.log(cat);
      if (category === "All") {
        category = "";
      }
      const tableType = {
        name: "policies",
        category: category,
        pagination: true,
      };
      resetVariables();
      fetchTable(tableType);
    });
  });
}

function removeClr(elements) {
  elements.forEach((e) => {
    e.classList.remove(
      "text-[#1F2DE3]",
      "border-b-[3px]",
      "border-b-[#1F2DE3]"
    );
  });
}

function addClr(e) {
  e.classList.add("text-[#1F2DE3]", "border-b-[3px]", "border-b-[#1F2DE3]");
}


var scrollInterval;

function moveRight() {
  // document.getElementById('move-right').addEventListener('mouseover', () => {
  //   amount = -100;
  //   scroll(amount);
  // });

  document.getElementById('move-right').addEventListener('mouseenter', function () {
    var scrollContent = document.getElementById('category-row');
    scrollInterval = setInterval(function () {
      scrollContent.scrollLeft += 3; // Adjust scrolling speed by changing the increment value
    }, 20); // Adjust scrolling speed by changing the interval value
  });
  document.getElementById('move-right').addEventListener('mouseleave', function () {
    clearInterval(scrollInterval);
  });

}

function moveLeft() {
  document.getElementById('move-left').addEventListener('mouseenter', function () {
    var scrollContent = document.getElementById('category-row');
    scrollInterval = setInterval(function () {
      scrollContent.scrollLeft -= 3; // Adjust scrolling speed by changing the increment value
    }, 20); // Adjust scrolling speed by changing the interval value
  });
  document.getElementById('move-left').addEventListener('mouseleave', function () {
    clearInterval(scrollInterval);
  });
}

