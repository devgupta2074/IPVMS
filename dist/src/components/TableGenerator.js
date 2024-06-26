import { API_CONSTANTS } from "../utils/constants.js";

let maxPages = 5;
let pageSize = 5;
let currentPage = 1;
let totalItems;
let title = "";
let category = "";
let siblingCount = 1;
let totalPageCount;

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}


export const fetchTable = async () => {
  document.getElementById("loading").style = "display:block";

  const apiLink =
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
    `/api/file/getLetters?page=${currentPage - 1}&size=${pageSize}&name=&template=&status=PENDING,SIGNED`;

  const response = await fetch(apiLink, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success == false) {
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "No data found";
        maxPages = 10;
        pageSize = 7;
        currentPage = 1;
        totalItems = 0;
        siblingCount = 1;

        addPagination(currentPage);
        // addSearchbar();
      } else {
        console.log("jhishi", data.data);
        totalItems = data.data[0]?.total_count;
        const parentElement = document.getElementById("tbody");
        parentElement.innerHTML = "";
        const startItemIndex = (currentPage - 1) * pageSize + 1;

        data.data.map((item, index) => {
          index = index + startItemIndex;
          console.log('popooppoopopopopopopopoppopop', item);

          parentElement.innerHTML += docCard(
            index,
            item.id,
            item.employee_name,
            item.template_name,
            item.status,
            item.created_at,
            item.created_by_name,
            item.rname,
            item.filepath
          );
          console.log("id is", item.id);
          console.log("path is", item.filepath);
        });
        data.data.forEach((item) => {

          const pdfButton = parentElement.querySelector(`#pdf${item.id}`);
          const downloadButton = parentElement.querySelector(`#url${item.id}`);
          if (pdfButton) {
            pdfButton.addEventListener("click", () => {
              console.log("clicked path is", item.filepath);
              window.location.href = `/pdfViewer?:url=${item.filepath}`;
            });
          }

          if (downloadButton) {
            downloadButton.addEventListener("click", async () => {
              const result = await axios.get(
                API_CONSTANTS.BACKEND_BASE_URL_PROD +
                `/api/file/getLetterUrl/${item.filepath}`
              );
              console.log("url", result.data.url);
              window.location.href = result.data.url;
            });
          }
        });
        // addPagination();
        addPagination(currentPage);

      }
    });
  document.getElementById("loading").style = "display:none";
  return true;

};


const docCard = (
  indx,
  id,
  ename,
  tname,
  status,
  created_at,
  created_by,
  rname,
  filepath
) => {
  let date = new Date(created_at);
  date = date.toLocaleDateString("en-GB");
  created_at = date;
  if (ename === "New User") {
    return `
    
    <tr
    class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in last:rounded-b-md"
  >
    <td class="w-14">${indx}</td>
    <td class="w-32">${rname}</td>
    <td class="w-52">${truncateString(tname, 20)}</td>
    <td class="w-28">${status}</td>
    <td class="w-28">${created_at}</td>
    <td class="w-28">${created_by}</td>
    <td class="w-28">${created_at}</td>
    <td class="w-28">
      <div class="flex gap-5">
        <button type="buttonF" id="pdf${id}" >
          <svg id="view" class="h-6 w-6">
            <use
              xlink:href="/assets/icons/icon.svg#view"
            ></use>
          </svg>
        </button>
        <a class="hover:cursor-pointer" blank="#" id="url${id}" >
          <svg id="download" class="h-6 w-6">
            <use
              xlink:href="/assets/icons/icon.svg#download"
            ></use>
          </svg>
        </a>
      </div>
    </td>
  </tr>
        
        `;
  } else {
    return `
    
    <tr
    class="flex justify-around w-full py-2 bg-white border-b-[1px] border-b-[#ECEEF3] hover:bg-[#E9EDF6] transition duration-300 ease-out hover:ease-in last:rounded-b-md"
  >
    <td class="w-14">${indx}</td>
    <td class="w-32">${ename}</td>
    <td class="w-52">${truncateString(tname, 20)}</td>
    <td class="w-28">${status}</td>
    <td class="w-28">${created_at}</td>
    <td class="w-28">${created_by}</td>
    <td class="w-28">${created_at}</td>
    <td class="w-28">
      <div class="flex gap-5">
        <button type="buttonF" id="pdf${id}" >
          <svg id="view" class="h-6 w-6">
            <use
              xlink:href="/assets/icons/icon.svg#view"
            ></use>
          </svg>
        </button>
        <a class="hover:cursor-pointer" blank="#" id="url${id}" >
          <svg id="download" class="h-6 w-6">
            <use
              xlink:href="/assets/icons/icon.svg#download"
            ></use>
          </svg>
        </a>
      </div>
    </td>
  </tr>
        
        `;
  }

  //   .toLocaleDateString('en-GB')
};

function addSortFeature() {
  const sortButtons = document.querySelectorAll(".sort");
  sortButtons.forEach((e, index) => {
    e.addEventListener("click", () => {
      // console.log(index);
      window.event.preventDefault();
      sortTable(index, 0);
    });
  });
}

// View Modal

function addModalOpenCloseFeature() {
  window.openModal = async function (modalId) {
    console.log(modalId, "modal id");
    document.getElementById(modalId).style.display = "block";
    document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
    window.addEventListener("beforeprint", (event) => {
      console.log("Before print");
      const contents = document
        .getElementById(modalId)
        .getElementsByClassName("docx-wrapper")[0].outerHTML;
      document.getElementById(modalId).innerHTML = contents;
    });
    await fetchAndRenderDoc(modalId);
  };

  window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = "none";
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
  };

  // document.addEventListener('click', (event) => {

  //   console.log(document.getElementById(modalId).style.display);
  //   if (document.getElementById(modalId).style.display === "block") {
  //     event.stopPropagation();
  //     document.getElementById(modalId).style.display = "none";
  //     document
  //       .getElementsByTagName("body")[0]
  //       .classList.remove("overflow-y-hidden");
  //   }
  // });
}

// Pagination

function addPagination(item) {
  const paginationElement = document.getElementById("pagination-controller");
  const arr = paginate(totalItems, currentPage, pageSize, siblingCount);
  paginationElement.innerHTML = "";
  console.log("............................................", arr);
  addPaginationElement(arr);
  const dot = document.getElementById(
    item + "pagination"
  ).className = `bg-white text-dodger-blue-500 rounded-md border-[1px] border-dodger-blue-500 relative z-10 inline-flex items-center  font-bold px-3  text-sm  focus:z-20 h-8`;
  addPrevAndNextfeature();
  handlePaginationOnClick();
}

const handleNextPage = async () => {
  console.log('ssssssssss', currentPage, maxPages);

  if (currentPage < totalPageCount) {
    currentPage++;
    console.log('ssssssssss', currentPage, maxPages, totalPageCount);

    handlePagination(currentPage);
  }
};
const handlePrevPage = async () => {
  currentPage--;
  if (currentPage < 1) {
    currentPage = 1;
    return;
  }
  handlePagination(currentPage);
};

const removepagination = () => {
  const paginationElement = document.getElementById("pagination-controller");
  paginationElement.innerHTML = "";
};

const range = (start, end) => {
  let length = end - start + 1;
  console.log(length);
  let pages = Array.from({ length }, (_, i) => start + i);
  console.log(pages);
  return pages;
};

const handlePagination = async (item) => {
  currentPage = item;
  addPagination(currentPage);
  // console.log("deeevv", tableType);
  await fetchTable();
};

const paginate = (totalItems, currentPage, pageSize, siblingCount) => {
  console.log(
    "totI",
    totalItems,
    "currentP",
    currentPage,
    "pagesize",
    pageSize,
    "sibc",
    siblingCount,
    "totalpage",
    totalPageCount
  );
  if (totalItems === 0) {
    return [1];
  }
  totalPageCount = Math.ceil(totalItems / pageSize);
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
  ).innerHTML += `<p class="text-sm text-gray-700 font-roboto">
                Showing
                <span class="font-medium font-roboto">${startItemIndex}</span>
                to
                <span class="font-medium font-roboto">${endItemIndex}</span>
                of
                <span class="font-medium font-roboto">${totalResults}</span> results
  </p>`;
};
const addPaginationElement = (arr) => {
  const paginationElement = document.getElementById("pagination-controller");
  arr.forEach((item) => {
    if (item === "DOTS") {
      paginationElement.innerHTML += `<h1 className="pagination-item dots no-decoration">&#8230;</h1>`;
    } else {
      paginationElement.innerHTML += `<button id="${item}pagination" onClick="handlePagination(${item})"  aria-current="page" class="relative bg-white h-8 font-bold rounded-md border-[1px] z-10 inline-flex items-center px-3 text-sm hover:bg-gray-50">${item}</a>`;
    }
  });
  addDocPageStatus();
};

function addPrevAndNextfeature() {
  document.getElementById("npage").addEventListener("click", handleNextPage);
  document.getElementById("ppage").addEventListener("click", handlePrevPage);
}

function handlePaginationOnClick() {
  const paginationButtons = document.querySelectorAll(
    "div#pagination_controller > button"
  );

  window.handlePagination = async function (Id) {
    handlePagination(Id);
  };
}

export const resetVariables = () => {
  maxPages = 10;
  pageSize = 7;
  currentPage = 1;
  totalItems = 0;
  title = "";
  category = "";
  totalPageCount = 0;
};



export async function addTable() {
  const tableDiv = document.getElementById("insert-table");
  tableDiv.innerHTML = "";

  // console.log(tableDiv);

  tableDiv.innerHTML = `<table class="w-full mt-10 mb-5 text-left text-sm text-gray-500 bg-white font-roboto rounded-md">
  <thead class="bg-ship-cove-200 py-3 text-xs capitalize text-[#333333] flex rounded-t-md">
    <tr class="flex justify-around w-full">
      <th scope="col" class="w-14 font-normal">ID</th>
      <th scope="col" class="w-32">
        <div class="flex items-center font-normal">
         Employee Name
          <a href="#" class="sort" name="true">
            <svg id="sorticon" class="pl-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-52">
        <div class="flex items-center font-normal">
          Template
          <a href="#" class="sort" name="true">
            <svg id="sorticon" class="pl-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">
        <div class="flex items-center font-normal">
          Status
          <a href="#" class="sort" name="true">
            <svg id="sorticon" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">
        <div class="flex items-center font-normal">
          Created At
          <a href="#" class="sort" name="true">
            <svg id="sorticon" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">
        <div class="flex items-center font-normal">
          Generated By
          <a href="#" class="sort" name="true">
            <svg id="sorticon" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28">
        <div class="flex items-center font-normal">
          Generated On
          <a href="#" class="sort" name="true">
            <svg id="sorticon" class="px-2 h-4 w-6">
              <use
                xlink:href="/assets/icons/icon.svg#sorticon"
              ></use>
            </svg>
          </a>
        </div>
      </th>
      <th scope="col" class="w-28 font-normal ">Action</th>
    </tr>
  </thead>  
  <tbody id="tbody">
  
  </tbody>
</table>
      `;
  await fetchTable();
  addSortFeature();
  addModalOpenCloseFeature();
}

export function getdate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-based
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  return date;
}

export const sortTable = (col) => {
  // const table = document.getElementById('myTable');
  const tbody = document.getElementById("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const sort_th = document.querySelectorAll(".sort");
  const order = sort_th[col].getAttribute("name") === "true" ? true : false;
  // console.log(order, col);
  sort_th.forEach(e => {

    e.innerHTML = `
  <svg id="sorticon" class="px-2 h-4 w-6">
  <use
    xlink:href="/assets/icons/icon.svg#sorticon"
  ></use>
</svg>`;
  });

  if (order) {
    sort_th[col].setAttribute("name", `${!order}`);
    sort_th[col].innerHTML = `
    <svg  class="px-2 h-4 w-6" id="sort-arrow-down" width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.4" d="M4.68463 0.320312L8.00918 5.33029H1.36007L4.68463 0.320312Z" fill="#333333" fill-opacity="0.6"/>
    <path d="M4.82282 13.6807L1.49826 8.67068L8.14737 8.67068L4.82282 13.6807Z" fill="#111111"/>
</svg>
    
  `;
    if (col === 2 || col === 4) {
      rows.sort((rowA, rowB) => {
        let cellA = rowA.querySelectorAll("td")[col + 1].textContent.trim();
        let cellB = rowB.querySelectorAll("td")[col + 1].textContent.trim();
        cellA = getdate(cellA);
        cellB = getdate(cellB);
        // console.log(cellA);
        return cellA - cellB;
      });
    } else {
      rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[col + 1].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[col + 1].textContent.trim();
        return cellA.localeCompare(cellB, "en", { numeric: true });
      });
    }
  } else {
    sort_th[col].setAttribute("name", `${!order}`);
    sort_th[col].innerHTML = `
    <svg  class="px-2 h-4 w-6" id="sort-arrow-down" width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path  d="M4.68463 0.320312L8.00918 5.33029H1.36007L4.68463 0.320312Z" fill="#111111"/>
    <path opacity="0.4" d="M4.82282 13.6807L1.49826 8.67068L8.14737 8.67068L4.82282 13.6807Z" fill="#333333" fill-opacity="0.6"/>
</svg>
    
  `;

    if (col === 2 || col === 4) {
      rows.sort((rowA, rowB) => {
        let cellA = rowA.querySelectorAll("td")[col + 1].textContent.trim();
        let cellB = rowB.querySelectorAll("td")[col + 1].textContent.trim();
        cellA = getdate(cellA);
        cellB = getdate(cellB);
        // console.log(cellA);
        return cellB - cellA;
      });
    } else {
      rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[col + 1].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[col + 1].textContent.trim();
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
};
