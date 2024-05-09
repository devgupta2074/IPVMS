import { fetchTable, resetVariables } from "./Table.js";




export async function fetchCategories() {


    const response = await fetch("http://127.0.0.1:5001/documents/count/category", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const arr = await response.json();

    addCategoryElements(arr);
    addSelectHighlight();
}


function addCategoryElements(arr) {
    const categoryBar = document.getElementById('insert-categories');
    console.log("buisnsidbi", arr);
    categoryBar.innerHTML += `
      <div id="category-row" class="flex flex-row gap-4 border-b-[1px] border-b-[#D4D9E2] overflow-x-auto scrollbar">

<button id='' class ='min-w-36 py-2 text-sm font-medium text-[#1F2DE3] border-b-[3px] border-b-[#1F2DE3]'>All</button>      
</div>
      `;

    const categoryRow = document.getElementById('category-row');

    arr.data.forEach(element => {

        if (element.id != null)
            categoryRow.innerHTML += `
    <button class =' min-w-36 py-2  text-sm font-medium' >${element.category}</button>
    `;
    });
}

function addSelectHighlight() {
    const category_buttons = document.querySelectorAll('div#category-row > button');

    category_buttons.forEach((e) => {
        e.addEventListener("click", () => {
            window.event.preventDefault(); ``;
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
                pagination: true
            };
            resetVariables();
            fetchTable(tableType);
        });
    });
}

function removeClr(elements) {

    elements.forEach((e) => {

        e.classList.remove("text-[#1F2DE3]", "border-b-[3px]", "border-b-[#1F2DE3]");
    });
}

function addClr(e) {
    e.classList.add("text-[#1F2DE3]", "border-b-[3px]", "border-b-[#1F2DE3]");
}