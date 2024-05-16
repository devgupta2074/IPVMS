import { fetchTable, resetVariables } from "./Table.js";

var amount = "";

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
  addHoverScroll();
  addNewCategoryModal();
  addNewCategoryOpenClose();
  addCategorySubmit();


  // window.addEventListener('load', () => {
  //   removeHoverButttons();
  // });
  // removeHoverButttons();

}

async function addCategoryElements(arr) {
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
<div id="addCategory-btn" class="py-4">
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

  await arr.forEach((element) => {
    if (element.id != null)
      categoryRow.innerHTML += `
    <button class =' min-w-36 py-2  text-sm font-medium hover:text-ship-cove-500 hover:border-b-[3px] hover:border-b-ship-cove-500 ' >${element.category}</button>
    `;
  });

  return true;
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

function addHoverScroll() {
  moveLeft();
  moveRight();
}

function moveRight() {
  // document.getElementById('move-right').addEventListener('mouseover', () => {
  //   amount = -100;
  //   scroll(amount);
  // });

  document
    .getElementById("move-right")
    .addEventListener("mouseenter", function () {
      var scrollContent = document.getElementById("category-row");
      scrollInterval = setInterval(function () {
        scrollContent.scrollLeft += 3; // Adjust scrolling speed by changing the increment value
      }, 20); // Adjust scrolling speed by changing the interval value
    });
  document
    .getElementById("move-right")
    .addEventListener("mouseleave", function () {
      clearInterval(scrollInterval);
    });
}

function moveLeft() {
  document
    .getElementById("move-left")
    .addEventListener("mouseenter", function () {
      var scrollContent = document.getElementById("category-row");
      scrollInterval = setInterval(function () {
        scrollContent.scrollLeft -= 3; // Adjust scrolling speed by changing the increment value
      }, 20); // Adjust scrolling speed by changing the interval value
    });
  document
    .getElementById("move-left")
    .addEventListener("mouseleave", function () {
      clearInterval(scrollInterval);
    });
}

export function removeHoverButttons() {
  const categoryScroll = document.getElementById('category-row');
  const sectionWidth = document.getElementById('policy-detail');

  console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
  console.log('qqqqqqqqqqqqqqqqqqqqqqq', categoryScroll.scrollWidth, sectionWidth.offsetWidth);
  if (categoryScroll.scrollWidth < sectionWidth.offsetWidth) {
    document.getElementById('move-right').classList.add('hidden');
    document.getElementById('move-left').classList.add('hidden');
  }
}

// ADD new category
function addNewCategoryModal() {
  const categoryModal = document.createElement("div");
  categoryModal.id = "removemodal";
  categoryModal.innerHTML = ` 
    <div
    id="Categorymodal"
    class="modal fixed hidden inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-40"
  >
    <div
      class="modal-content mx-auto my-20 p-8 bg-white rounded-lg shadow-xl w-full max-w-xl"
    >
      <div class="modal-header flex items-center justify-between mb-4">
        <h1 class="modal-title text-xl font-medium text-gray-800">
          Add New Category
        </h1>
        <button
          id="closeButton"
          class="close-button text-gray-600 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <form id="categoryForm" class="">
        <div class="mb-4">
          <label
            for="categoryName"
            class="pt-2 block text-sm text-gray-700 capitalize"
            >Category name</label
          >
          <input
            id="categoryName"
            placeholder="IT policies"
            type="text"
            required
            class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
          />
        </div>
        <!-- <div class="mb-4">
            <label
              for="categoryName"
              class="pt-2 block text-sm text-gray-700 capitalize"
              >color</label
            >
            <input
              id="categoryName"
              placeholder="SVG"
              type="color"
              class="block  px-3  mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
          </div>
        <div class="mb-4">
          <label
            for="categoryName"
            class="pt-2 block text-sm text-gray-700 capitalize"
            >SVG</label
          >
          <input
            id="categoryName"
            placeholder="SVG"
            type="file"
            accept=".svg"
            class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
          />
        </div> -->
        <div id="status" class='h-1'>
        </div>
        <div class="flex justify-end">
          <button
            id="categorySubmit"
            type="button"
        
            class="invite-submit px-3 py-2 text-sm text-white capitalize transition-colors duration-200 bg-indigo-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50 hover:bg-indigo-600"
          >
            Add Category
          </button>
        </div>
      </div>
     
      </form>
    </div>
    `;
  document.getElementsByTagName("main")[0].appendChild(categoryModal);
  // console.log("clicked");
}
function addNewCategoryOpenClose() {
  let modal;

  const category_btn = document.getElementById("addCategory-btn");

  category_btn.addEventListener("click", () => {
    modal = document.getElementById("Categorymodal");
    modal.classList.remove("hidden");
  });
  let closeButton = document.getElementById("closeButton");
  const inputfield = document.getElementById("categoryForm");

  closeButton.addEventListener("click", function () {
    modal.classList.add("hidden");
    inputfield.reset();
  });
}

function addCategorySubmit() {
  const submitBtn = document.getElementById("categorySubmit");

  submitBtn.addEventListener("click", async () => {
    const categoryName = document.getElementById("categoryName").value;

    console.log(categoryName);

    const response = await fetch(
      "http://localhost:5001/api/categories/createNewCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: categoryName,
        }),
      }
    );

    console.log(response);
    if (response.ok === true) {
      document.getElementById("status").innerHTML = `
      <p id="success" class=" text-green-300" >Category created successfully.</p>
      `;

      setTimeout(() => {
        document.getElementById("status").innerHTML = `
       `;
      }, 2000);
    } else {
      document.getElementById(
        "status"
      ).innerHTML = `<p id="failed" class=" text-red-300">Failed to create new category.</p>
      `;
      setTimeout(() => {
        document.getElementById("status").innerHTML = `
        `;
      }, 2000);
    }
  });
}
