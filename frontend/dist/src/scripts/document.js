// let response = {
//     "success": true,
//     "message": "all user are",
//     "data": [
//         {
//             "fileName": "policy1",
//             "category": 'RE',
//             "updatedBy": "rithvik",
//             "updatedAt": "2024-01-22T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy2",
//             "category": 'IT',
//             "updatedBy": "dev",
//             "updatedAt": "2023-04-29T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy3",
//             "category": 'ABC',
//             "updatedBy": "archit",
//             "updatedAt": "2024-07-25T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy4",
//             "category": 'CBR',
//             "updatedBy": "tapasvi",
//             "updatedAt": "2014-02-20T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "yash",
//             "updatedAt": "2022-04-06T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "siraj",
//             "updatedAt": "2018-03-01T00:29:54.119Z"
//         },
//         {
//             "fileName": "policy5",
//             "category": 'hr',
//             "updatedBy": "sahil",
//             "updatedAt": "2013-04-10T00:29:54.119Z"
//         }

//     ]
// };

var maxPages = 10;
var pageSize = 5;
var currentPage = 1;
var totalItems;
var title = "";
var category = "";
var siblingCount = 1;

//modal
const docxModal = (id) => {
  return `
  <div id=${id} class="fixed w-full h-full z-50 inset-0 overflow-y-scroll">
  <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
    <!-- Background overlay -->
    <div class="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity" aria-hidden="true"></div>

    <!-- Modal content -->
    <div class="fixed inset-0  w-4/5 h-full pt-10 pb-10  m-auto overflow-hidden bg-white rounded-lg shadow-xl transform transition-all sm:my-8 overflow-y-scroll">
      <div class="absolute top-0 right-0 p-2">
        <button onclick="closeModal(${id})" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <div class="p-6 pt-0 text-center">
        <div id="render-docs" class=" w-full h-full overflow-y-scroll flex justify-center items-center"></div>
        <a href="#" onclick="closeModal(${id})" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
          Yes, I'm sure
        </a>
        <a href="#" onclick="closeModal(${id})" class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
          No, cancel
        </a>
      </div>
    </div>
  </div>
</div>

  `;
};

window.openModal = async function (modalId) {
  console.log(modalId, "modal id");
  document.getElementById(modalId).style.display = "block";
  document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
  await fetchAndRenderDoc(modalId);
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

const range = (start, end) => {
  let length = end - start + 1;
  let pages = Array.from({ length }, (_, i) => start + i);
  return pages;
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

const paginate = (totalItems, currentPage, pageSize, siblingCount) => {
  const totalPageCount = Math.ceil(totalItems / pageSize);
  console.log(totalPageCount, maxPages);
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

const docCard = (title, category, created_by, created_at, id) => {
  let date = new Date(created_at);
  // console.log(created_at);
  return `<tr class="bg-white">
  <td class="px-6 py-4">${id}</td>
  <td class="px-6 py-4">${title}</td>
        <td class="px-6 py-4">${category}</td>
        <td class="px-6 py-4">${created_by}</td>
        <td class="px-6 py-4">${date.toLocaleDateString("en-GB")}</td>
        <td onclick="openModal(${id})" class="px-6 py-4">View</td>
      </tr>`;
  //   .toLocaleDateString('en-GB')
};

const fetchDoc = async (currentPage, pageSize) => {
  document.getElementById("loading").style = "display:block";

  const response = await fetch(
    `http://localhost:3000/api/file/document?page=${currentPage}&size=${pageSize}&title=${title}`,
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
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "No data found";
      } else {
        totalItems = data?.data[0]?.total_count;
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "";
        document.getElementById("main-body").innerHTML = "";
        data.data.map((item) => {
          console.log(item);
          parentElement.innerHTML += docCard(
            item.title || "demo",
            item.category_name,
            item.created_by,
            item.created_at,
            item.id
          );

          document.getElementById("main-body").innerHTML += docxModal(item.id);
          document.getElementById(item.id).style.display = "none";
        });
      }
    });

  document.getElementById("loading").style = "display:none";
};
const fetchAndRenderDoc = async (modalId) => {
  const response = await fetch(
    `http://localhost:3000/api/file/getFile/${modalId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "response issss");
      const docData = data.data.data;
      document.getElementById(modalId).querySelector("#render-docs").innerHTML =
        "";
      document.getElementById(modalId).querySelector("#render-docs").innerHTML =
        docData;
    });
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

const search = async () => {
  const searchText = document.getElementById("search").value;

  console.log("search func");
  const response = await fetch(
    "http://ipvms-api.exitest.com/api/globalsearch/search",
    {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchString: searchText,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data);
      if (data.success == false) {
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "No data found";
      } else {
        totalItems = data?.count;
        console.log(totalItems);
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "";
        data.data.map((item) => {
          console.log(item);
          parentElement.innerHTML += docCard(
            item.title || item.document_title || "demo",
            item.category,
            item.created_by,
            item.created_at,
            item.id
          );
          // parentElement.innerHTML += docxModal(item.id);
          // document
          //   .getElementById(item.id)
          //   .querySelector("#render-docs").innerHTML = item.data;
        });
      }
    });
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

function getdate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-based
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  return date;
}

function sort(col, order) {
  // const table = document.getElementById('myTable');
  const tbody = document.getElementById("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const th = document.getElementsByTagName("th");
  if (order) {
    const a = th[col + 1].getElementsByTagName("a");
    a[0].setAttribute("onclick", `sort(${col}, ${!order})`);
    // .setAttribute('onclick', !order);
    console.log(order);
    if (col === 2) {
      rows.sort((rowA, rowB) => {
        let cellA = rowA.querySelectorAll("td")[col].textContent.trim();
        let cellB = rowB.querySelectorAll("td")[col].textContent.trim();
        cellA = getdate(cellA);
        cellB = getdate(cellB);
        return cellA - cellB;
      });
    } else {
      rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[col].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[col].textContent.trim();
        return cellA.localeCompare(cellB, "en", { numeric: true });
      });
    }
  } else {
    const a = th[col + 1].getElementsByTagName("a");
    a[0].setAttribute("onclick", `sort(${col}, ${!order})`);

    if (col === 2) {
      rows.sort((rowA, rowB) => {
        let cellA = rowA.querySelectorAll("td")[col].textContent.trim();
        let cellB = rowB.querySelectorAll("td")[col].textContent.trim();
        cellA = getdate(cellA);
        cellB = getdate(cellB);
        return cellB - cellA;
      });
    } else {
      rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[col].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[col].textContent.trim();
        return cellB.localeCompare(cellA, "en", { numeric: true });
      });
    }
  }

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  rows.forEach((row) => {
    tbody.appendChild(row);
  });
}
const handleFilter = async () => {
  const inpTitle = document.getElementById("doctitle");
  title = inpTitle.value;
  const inpcategory = document.getElementById("doccategory");
  category = inpcategory.value;
  console.log(category, title);
  fetchDoc(currentPage - 1, pageSize);
};
