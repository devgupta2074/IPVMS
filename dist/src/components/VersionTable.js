import {
  applyChangesFromV1toV2,
  createversion,
} from "../scripts/versioncontrol.js";
import { API_CONSTANTS } from "../utils/constants.js";
import { letterColorMapping } from "../utils/letterstyle.js";

async function ChangeVersion(docid, id) {
  console.log("hello world dev");
  console.log(id, "change version");
  if (
    localStorage.getItem("versionid") &&
    document.getElementById(localStorage.getItem("versionid"))
  ) {
    document
      .getElementById(localStorage.getItem("versionid"))
      .classList.remove("bg-zircon-100");
  }
  localStorage.setItem("versionid", id);
  console.log(document.getElementById(id), id);
  document.getElementById(id).classList.add("bg-zircon-100");
  document.getElementById("container-content-1").contentEditable = false;
  const htmljson = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getFile/${docid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      // console.log(data.data.data);
      document.getElementById("docx-wrapper-1").innerHTML = data.data.data;
      const htmljson = data.data.htmljson;
      return htmljson;
    });
  const firstv = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
      `/api/versioncontrol/getVersions?docId=${docid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.data[0], "firtv");
      return data.data[0].delta;
    });
  const response = fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD + `/getVersionbyID?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const divElement = "";
      const v1 = htmljson;
      const v2 = data[0].delta;
      console.log(divElement, v1, v2, firstv);
      applyChangesFromV1toV2(divElement, v1, v2, firstv);
    });
}
function openDash(id) {
  console.log(id, "sss");
  const dash = document.getElementById(id);
  if (dash.classList.contains("hidden")) {
    dash.classList.remove("hidden");
  } else {
    dash.classList.add("hidden");
  }
}
let runonetimeonly = true;
export const fetchVersionsDateWise = async (id) => {
  const y = [];
  const docid = id;
  console.log(id, docid);
  const response = fetch(
    "https://ipvms-tapasvis-projects.vercel.app" +
      `/getversions/datewise?docId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then(async (data) => {
      let runonetimeonly = true;
      console.log("data datewise", data);
      if (data.length == 0 && runonetimeonly && id !== 236) {
        console.log("first verion not  there");
        runonetimeonly = false;

        await createversion().then((createVersionData) => {
          console.log(createVersionData, "dev");
          const response = fetch(
            API_CONSTANTS.BACKEND_BASE_URL_PROD +
              "/api/versioncontrol/createDocumentVersion",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                version_number: createVersionData.version_number,
                doc_id: createVersionData.doc_id,
                delta: createVersionData.delta,
                created_by: createVersionData.created_by,
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from the backend
              Toastify({
                text: "Policy version created successfully",
                duration: 3000,
                newWindow: true,
                className: "text-black",
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "white",
                },
              }).showToast();
              console.log(data);
              localStorage.setItem("version", createVersionData.version_number);
              fetchVersionsDateWise(createVersionData.doc_id);
            });
        });

        // fetchVersionsDateWise(id);
      }

      // Parse each element into an array
      data.forEach((element) => {
        const arrayOfArrays = element.grouped_values
          .slice(1, -1)
          .split("], [")
          .map((item) => item.split(","));
        console.log(arrayOfArrays);

        // Step 1: Split the string into an array of arrays
        const result = arrayOfArrays.map((subArray) => {
          const id = parseInt(subArray[0]);
          const version_number = parseFloat(subArray[1]);
          const doc_id = parseInt(subArray[2]); // Access JSON value

          return {
            id,
            version_number,
            doc_id,
            time: subArray[3].split(" ")[1].split(":").slice(0, 2).join(":"),
            created_by: subArray[4],
          };
        });
        console.log("data datewise", result);
        y.push({ date: element.datew, version: result });
      });

      console.log("data datewise", y);

      const versiontable = document.getElementById("version-table");
      versiontable.innerHTML = `
          <li class="mb-1 ms-4 p-4 bg-zircon-100">
          <svg class=" absolute mt-2  -start-[0.25rem]  " width="10" height="10" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.5" cy="3.5" r="2.5" fill="white" stroke="black"/>
            </svg>
            
           
           <div class="flex flex-row items-center gap-2 w-full">
            <p class=" text-base font-normal text-gray-500   ">
            Current Version
              </p>
            
           </div>
           
            
        </li>`;
      y.map((item) => {
        console.log(item);

        var dateObject = new Date(item.date);

        // Get the day, month, and year
        var day = dateObject.getDate();
        var month = dateObject.getMonth() + 1; // January is 0, so we add 1
        var year = dateObject.getFullYear();

        // Pad day and month with leading zeros if necessary
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        // Format the date into "dd-mm-yyyy" format
        var formattedDate = day + "-" + month + "-" + year;
        versiontable.innerHTML += `
            <li class="mb-1 ms-4  ">
            <svg class=" absolute mt-2  -start-[0.25rem] open-dash-svg  " width="10" height="10" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="3.5" cy="3.5" r="2.5" fill="white" stroke="black"/>
              </svg>
              
                 <div class="flex flex-row items-center gap-6 w-full p-4 hover:bg-gallery-100">
              <p class=" text-base font-normal text-gray-500    ">
                ${formattedDate}
               
                </p>
                <button class="open-dash-btn" data-day="${day}" data-month="${month}">
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.9097 0.583008C10.4346 0.583008 10.6974 1.24544 10.3263 1.63286L5.91657 6.23622C5.6865 6.47638 5.3135 6.47638 5.08343 6.23622L0.673729 1.63286C0.302607 1.24544 0.565451 0.583008 1.0903 0.583008L9.9097 0.583008Z" fill="#52525B"/>
                </svg></button>
               
                
             </div>
             
              <ol class="hidden" id="${day}-${month}">
              
            </ol>
              
          </li>
            `;

        const dayversions = document.getElementById(`${day}-${month}`);
        dayversions.innerHTML = ``;
        item.version.map((version) => {
          console.log(version, "ffffk");
          dayversions.innerHTML += `
          <li id=${
            version.id
          }  class="m-2 hover:bg-gallery-100 p-4 version-id-button cursor-pointer">
         
            
            <time class="mb-1 text-base font-normal leading-none text-gray-400 ">${
              version.time
            }</time>
           <div class="flex flex-row items-center  gap-1 w-full ">
            <p class=" text-base font-normal text-gray-500   ">
            <p class="bg-[${
              letterColorMapping[version.created_by.charAt(0).toLowerCase()]
            }] rounded-full w-5 h-5 flex items-center justify-center">
             ${version.created_by.charAt(0).toUpperCase()}
             </p>
           
              </p>
              <p>
               ${version.created_by}
              </p>
           </div>
           
            
        </li>
`;
        });

        const openDashButtons = document.querySelectorAll(".open-dash-btn");
        openDashButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const day = button.dataset.day;
            const month = button.dataset.month;
            openDash(`${day}-${month}`);
          });
        });
        const versionIdButtons =
          document.querySelectorAll(".version-id-button");
        versionIdButtons.forEach((button) => {
          button.addEventListener("click", () => {
            ChangeVersion(docid, button.id);
          });
        });
      });
    });
};
