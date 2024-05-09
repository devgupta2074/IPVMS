let maxPages = 4;
let pageSize = 1;
let currentPage = 1;
let totalItems;
let title = "";
let category = "";
let siblingCount = 1;

const paginate = (totalItems, currentPage, pageSize, siblingCount) => {
  const totalPageCount = Math.ceil(totalItems / pageSize);
  console.log(totalPageCount);
  const totalPageNumbers = siblingCount + 5;
  //first last current page  2 dots

  // Case 1  totaItems<maxPages
  if (totalPageCount <= maxPages) {
    return range(1, totalPageCount);
  }
  // Case 2
  //left  and right sibling index
  const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
  const rightSiblingIndex = Math.min(
    totalPageCount,
    currentPage + siblingCount
  );
  // are there dots
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = totalPageCount - rightSiblingIndex > 2;
  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;
  //No left dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    //1  sibling currentpage  sibling  .. last page
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);
    return [...leftRange, "DOTS", totalPageCount];
  }
  if (shouldShowLeftDots && !shouldShowRightDots) {
    //1  sibling currentpage  sibling  .. last page
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    return [firstPageIndex, "DOTS", ...rightRange];
  }
  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
  }
};

const range = (start, end) => {
  let length = end - start + 1;
  let pages = Array.from({ length }, (_, i) => start + i);
  return pages;
};

const fetchDoc = async (currentPage, pageSize) => {
  document.getElementById("loading").style = "display:block";
  const response = await fetch(
    `http://localhost:5001/api/file/document?page=${currentPage}&size=${pageSize}&title=${title}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data);
      if (data.success == false) {
        const parentElement = document.getElementById("containerdoc");
        parentElement.innerHTML = "No data found";
      } else {
        totalItems = data?.data[0]?.total_count;
        const parentElement = document.getElementById("containerdoc");
        parentElement.innerHTML = "";
        data.data.map((item) => {
          parentElement.innerHTML += docCard(
            item.title || "demo",
            item.created_by,
            item.created_At,
            item.description || "this is a demo fikle",
            item.id
          );
          parentElement.innerHTML += docxModal(item.id);
          document
            .getElementById(item.id)
            .querySelector("#render-docs").innerHTML = item.data;
        });
      }
    });

  document.getElementById("loading").style = "display:none";
};

document.addEventListener("DOMContentLoaded", async () => {
  await fetchDoc(currentPage - 1, pageSize);
  const paginationElement = document.getElementById("pagination-controller");
  const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
  console.log(arr);
  addPaginationElement(arr);
  document.getElementById(1 + "pagination").className =
    "bg-indigo-800 text-white relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
});

const addDocPageStatus = () => {
  const startItemIndex = (currentPage - 1) * pageSize + 1;
  const endItemIndex = Math.min(currentPage * pageSize, totalItems);
  const totalResults = totalItems;

  document.getElementById("doc-status").innerHTML = "";
  document.getElementById(
    "doc-status"
  ).innerHTML += `<p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">${startItemIndex}</span>
              to
              <span class="font-medium">${endItemIndex}</span>
              of
              <span class="font-medium">${totalResults}</span> results
</p>`;
};

const handlePagination = async (item) => {
  currentPage = item;
  const paginationElement = document.getElementById("pagination-controller");
  const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
  paginationElement.innerHTML = "";
  addPaginationElement(arr);
  document.getElementById(item + "pagination").className =
    "bg-indigo-800 text-white relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  await fetchDoc(currentPage - 1, pageSize);
};
const addPaginationElement = (arr) => {
  const paginationElement = document.getElementById("pagination-controller");
  arr.forEach((item) => {
    if (item === "DOTS") {
      paginationElement.innerHTML += `<h1 className="pagination-item dots no-decoration">&#8230;</h1>`;
    } else {
      paginationElement.innerHTML += `<button id="${item}pagination" onClick="handlePagination(${item})"  aria-current="page" class="relative z-10 inline-flex items-center text-black px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">${item}</a>`;
    }
  });
  addDocPageStatus();
};

const handleNextPage = async () => {
  currentPage++;

  if (currentPage > maxPages) {
    currentPage = maxPages;
    return;
  }
  handlePagination(currentPage);
};
const handlePrevPage = async () => {
  currentPage--;
  if (currentPage < 1) {
    currentPage = 1;
    return;
  }
  handlePagination(currentPage);
};

const handleFilter = async () => {
  const inpTitle = document.getElementById("doctitle");
  title = inpTitle.value;
  const inpcategory = document.getElementById("doccategory");
  category = inpcategory.value;
  fetchDoc(currentPage - 1, pageSize);
};

const docCard = (title, created_by, created_At, description, id) => {
  return `<div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
  <div class="p-6">
    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      ${title}
    </h5>
    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      ${description}
    </p>
  </div>
  <div class="p-6 pt-0">
    <button
    onclick="openModal(${id})"
      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button">
     View
    </button>
  </div>
</div>`;
};
const docxModal = (id) => {
  return `

<div id=${id} class="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full  w-4/5 m-auto px-2 mt-2 rounded-md  flex justify-center ">
    <div class="relative top-10 mx-auto  rounded-md bg-white">
        <div class="flex justify-end p-2">
            <button onclick="closeModal(${id})" type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>

        <div class="p-6 pt-0 text-center">
          <div id="render-docs" class=" flex justify-center items-center">
            
            </div>
            <a href="#"  onclick="closeModal(${id})"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                Yes, I'm sure
            </a>
            <a href="#" onclick="closeModal(${id})"
                class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                data-modal-toggle="delete-user-modal">
                No, cancel
            </a>
        </div>

    </div>
</div>
`;
};

window.openModal = function (modalId) {
  console.log(modalId, "modal id");
  document.getElementById(modalId).style.display = "block";
  document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
};

window.closeModal = function (modalId) {
  document.getElementById(modalId).style.display = "none";
  document
    .getElementsByTagName("body")[0]
    .classList.remove("overflow-y-hidden");
};

// Close all modals when press ESC
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
