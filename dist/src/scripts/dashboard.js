import { UserInfoApiRequest } from "../api/dashboard.js";

import { InviteApiRequest } from "../api/invitation.js";
import { fetchCategory } from "../components/CategoryChart.js";
import { fetchTable } from "../components/Table.js";
import { InsertNavbar } from "../components/Navbar.js";
import {
  API_CONSTANTS,
  ROUTES_CONSTANTS,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";
import { docsstyle } from "../utils/docxstyle.js";

import { redirect } from "../utils/utils.js";
import { GetPolicyApprovalsByUserId } from "../api/getPolicyApprovalUserId.js";
import { GetDocumentById } from "../api/getDocumentById.js";
import {
  applyChangesFromV1toV2,
  applyChangesFromV1toV2withouthighlight,
} from "./versioncontrol.js";
import { extractHtmlToJson } from "./uploadpolicy1.js";
import { Gettest } from "../api/signsiwfttest.js";

var maxPages = 10;
var pageSize = 5;
var currentPage = 1;
var totalItems;
var title = "";
// var category = "";
var siblingCount = 1;

fetchTable({ name: "recent" });

InsertNavbar();

let userdata;
if (localStorage.getItem("token") === null) {
  redirect(VIEWS_CONSTANTS.LOGIN);
} else {
  const token = localStorage.getItem("token");
  console.log("token is", token);
  await UserInfoApiRequest(token).then(async (data) => {
    // Handle the response from the backend
    console.log(data, "d");
    if (data.statusCode == 401) {
      redirect(VIEWS_CONSTANTS.LOGIN);
    } else {
      userdata = data;
    }
  });
}
fetchCategory();

console.log(userdata);
let name = document.getElementById("name");
// let dropdownname = document.getElementById("dropdownname");
// let dropdownemail = document.getElementById("dropdownemail");

// console.log(userdata, "userdata");
// dropdownemail.textContent = userdata.data?.email;
// name.textContent = userdata.data.first_name + " " + userdata.data.last_name;
// dropdownname.textContent =
//   userdata.data.first_name + " " + userdata.data.last_name;

async function getPolicyApprovals() {
  const response = await GetPolicyApprovalsByUserId(
    parseInt(localStorage.getItem("userid"))
  );
  console.log(response, "dev");
  document.getElementById("policyapproval").innerHTML = "";
  response.map((approve) => {
    console.log(approve, "hello");
    document.getElementById("policyapproval").innerHTML += `
    <li class="mt-4">
    <div role="button"
      class="p-3 flex items-center justify-between transition duration-300 hover:border-gray-400 hover:bg-gray-50 hover:rounded-lg">
      <div>
        <p class="text-base font-medium text-[#333333] truncate">
          ${approve.title}
        </p>
        <span class="text-sm text-gray-500 truncate ">
          Sent by ${
            approve.sent_by_first_name + " " + approve.sent_by_last_name
          }
        </span>
      </div>
      <div class="flex justify-center items-center">
        <button
        id=${approve.id}
        onClick="openPolicyReview(${approve.id}, ${approve.doc_id})"
          class=" text-white bg-[#3689F5] border border-[#DBDDDD] rounded-full text-xs font-semibold px-4 py-1 transition-colors duration-300 ">
          ${approve.status}
        </button>
      </div>
    </div>
    </li>`;
  });
}
getPolicyApprovals();

window.openPolicyReview = async function (id, doc_id) {
  console.log(doc_id, id);
  document.getElementById("extralarge-modal").classList.remove("hidden");
  document.getElementById("dashboardarea").classList.add("hidden");
  document.getElementById("dashboardlist").classList.add("hidden");
  document.getElementById("dashboardtable").classList.add("hidden");
  const documentdata = await GetDocumentById(doc_id);
  console.log(documentdata);
  document.getElementById("docx-wrapper-1").innerHTML = documentdata.data.data;
  document.getElementById("doc_title").textContent = documentdata.data.title;
  const htmljson = documentdata.data.htmljson;

  const firstv = await fetch(
    `http://localhost:5001/api/versioncontrol/getVersions?docId=${doc_id}`,
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

  const response = await fetch(
    `http://localhost:5001/getLatestVersionbyDocIdandUserId?id=${doc_id}&user=${parseInt(
      localStorage.getItem("userid")
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      console.log(data, "latest version ");
      const divElement = "";
      const v1 = htmljson;
      const v2 = data[0].delta;
      console.log(divElement, v1, v2, firstv);
      applyChangesFromV1toV2(divElement, v1, v2, firstv);
    });

  document.getElementById("reject").addEventListener("click", function () {
    document.getElementById("rejectionmodal").classList.remove("hidden");
  });
  document
    .getElementById("approve")
    .addEventListener("click", async function () {
      const response = await fetch(
        `http://localhost:5001/api/approvePolicyApproval?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          const documentdata = await GetDocumentById(doc_id);
          console.log(documentdata);
          document.getElementById("docx-wrapper-1").innerHTML =
            documentdata.data.data;
          document.getElementById("doc_title").textContent =
            documentdata.data.title;
          const htmljson = documentdata.data.htmljson;

          const firstv = await fetch(
            `http://localhost:5001/api/versioncontrol/getVersions?docId=${doc_id}`,
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

          const response = await fetch(
            `http://localhost:5001/getLatestVersionbyDocIdandUserId?id=${doc_id}&user=${parseInt(
              localStorage.getItem("userid")
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then(async (data) => {
              console.log(data);
              console.log(data, "latest version ");
              const divElement = "";
              const v1 = htmljson;
              const v2 = data[0].delta;
              console.log(divElement, v1, v2, firstv);
              applyChangesFromV1toV2withouthighlight(
                divElement,
                v1,
                v2,
                firstv
              );

              const htmlJson = extractHtmlToJson(
                document
                  .getElementById("docx-wrapper-1")
                  .getElementsByClassName("docx-wrapper")[0]
              );

              console.log(
                document
                  .getElementById("docx-wrapper-1")
                  .getElementsByClassName("docx-wrapper")[0],
                htmlJson,
                "devvv"
              );

              const response = await fetch(
                `http://localhost:5001/api/updatePolicyHtmlData`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: doc_id,
                    htmldata: document
                      .getElementById("docx-wrapper-1")
                      .getElementsByClassName("docx-wrapper")[0].innerHTML,
                    htmlJson: htmlJson,
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => {});
            });

          document.getElementById("extralarge-modal").classList.add("hidden");
          document.getElementById("dashboardarea").classList.remove("hidden");
          document.getElementById("dashboardlist").classList.remove("hidden");
          document.getElementById("dashboardtable").classList.remove("hidden");
        });
    });
  document
    .getElementById("back-request")
    .addEventListener("click", function () {
      document.getElementById("extralarge-modal").classList.add("hidden");
      document.getElementById("dashboardarea").classList.remove("hidden");
      document.getElementById("dashboardlist").classList.remove("hidden");
      document.getElementById("dashboardtable").classList.remove("hidden");
    });
  document
    .getElementById("rejectbutton")
    .addEventListener("click", async function () {
      console.log({
        id: doc_id,
        reason: document.getElementById("message").value,
      });
      const reason = document.getElementById("message").value;
      const response = await fetch(
        `http://localhost:5001/api/rejectPolicyApproval`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: doc_id,
            reason: reason,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("rejectionmodal").classList.add("hidden");
          document.getElementById("extralarge-modal").classList.add("hidden");
          document.getElementById("dashboardarea").classList.remove("hidden");
          document.getElementById("dashboardlist").classList.remove("hidden");
          document.getElementById("dashboardtable").classList.remove("hidden");
        });
    });
};
