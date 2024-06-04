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
import { GetPolicyApprovalsByUserSent } from "../api/getPolicyApprovalUserSent.js";

var maxPages = 10;
var pageSize = 5;
var currentPage = 1;
var totalItems;
var title = "";
// var category = "";
var siblingCount = 1;
// const loading = document.getElementById('loading');
// loading.classList.remove('hidden');

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

console.log(userdata);
let name = document.getElementById("name");

console.log("hello from dashboard");

async function all_load() {
  console.log("koooooooooooooooooooooooooooooooooooooooookoooooooo");
  await fetchTable({ name: "recent" });
  await fetchCategory();
  await getPolicyApprovals();

  // loading.classList.add('hidden');
}

// loading.style = 'display: block;';
all_load();
// loading.style = 'display: none;';

async function getPolicyApprovals() {
  const response = await GetPolicyApprovalsByUserId(
    parseInt(localStorage.getItem("userid"))
  );
  const response2 = await GetPolicyApprovalsByUserSent(
    parseInt(localStorage.getItem("userid"))
  );
  console.log(response, "dev");
  document.getElementById("policyapproval").innerHTML = "";
  if (response.length == 0 && response2.length == 0) {
    document.getElementById("policyapproval2").innerHTML = ` 
     <div class="flex items-center justify-start w-full mb-2">
    <h5
      class="text-xl font-semibold leading-none text-mineshaft-900"
    >
      Policy Approval
    </h5>
  </div>
  <hr class="h-[1px] w-full  border-1 border-[#ECEEF3] bg-[#ECEEF3]" />
  <div class="flex flex-row p-7 gap-2 ">

    <svg id="boards" class="h-60 w-20">
        <use
          xlink:href="/assets/icons/icon.svg#emptyicon"
        ></use>
      </svg>
      <div class="font-roboto font-normal  text-base text-boulder-400 ">
      You don't have any pending policies for Approval
      </div>
  </div>`;
  } else {
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
          onClick="openPolicyReview(${approve.id}, ${approve.doc_id},${
        approve.request_by
      })"
            class=" text-white bg-[#3689F5] border border-[#DBDDDD] rounded-full text-xs font-semibold px-4 py-1 transition-colors duration-300 ">
            ${approve.status}
          </button>
        </div>
      </div>
      </li>`;
    });

    response2.map((approve) => {
      console.log(approve, "hello");
      if (approve.status === "VIEW") {
        approve.status = "WAITING";
      }
      document.getElementById("policyapproval").innerHTML += `
      <li class="mt-4">
      <div role="button"
        class="p-3 flex items-center justify-between transition duration-300 hover:border-gray-400 hover:bg-gray-50 hover:rounded-lg">
        <div>
          <p class="text-base font-medium text-[#333333] truncate">
            ${approve.title}
          </p>
          <span class="text-sm text-gray-500 truncate ">
            Sent To ${
              approve.sent_by_first_name + " " + approve.sent_by_last_name
            }
          </span>
        </div>
        <div class="flex justify-center items-center">
          <button
          id=${approve.id}
          onClick="openSentToModal('${approve.status}',${approve.id}, ${
        approve.doc_id
      },'${approve.reason}')"
            class=" text-white bg-[#3689F5] border border-[#DBDDDD] rounded-full text-xs font-semibold px-4 py-1 transition-colors duration-300 ">
            ${approve.status}
          </button>
          </div>
          </div>
          </li>`;
    });
  }

  return true;
}

window.openSentToModal = async function (status, id, doc_id, reason) {
  console.log(doc_id, id, status);

  if (status !== "REJECTED") {
    console.log("do nothing");
  } else {
    document.getElementById("reasonmodal").classList.remove("hidden");
    document.getElementById("reasondetails").innerText = reason;
    document
      .getElementById("closereason")
      .addEventListener("click", function () {
        document.getElementById("reasonmodal").classList.add("hidden");
        document.getElementById("reasondetails").innerText = "";
      });
  }
};
document.getElementById("closereview").addEventListener("click", function () {
  document.getElementById("rejectionmodal").classList.add("hidden");
});
window.openPolicyReview = async function (id, doc_id, sentbyid) {
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
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
      `/api/versioncontrol/getVersions?docId=${doc_id}`,
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
  localStorage.setItem("sentbyid", sentbyid);
  const response = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
      `/getLatestVersionbyDocIdandUserId?id=${doc_id}&user=${parseInt(
        sentbyid
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
        API_CONSTANTS.BACKEND_BASE_URL_PROD +
          `/api/approvePolicyApproval?id=${id}`,
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
            API_CONSTANTS.BACKEND_BASE_URL_PROD +
              `/api/versioncontrol/getVersions?docId=${doc_id}`,
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
            API_CONSTANTS.BACKEND_BASE_URL_PROD +
              `/getLatestVersionbyDocIdandUserId?id=${doc_id}&user=${parseInt(
                localStorage.getItem("sentbyid")
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
              document
                .querySelectorAll(".redhighlight")
                .forEach(function (element) {
                  element.classList.remove("redhighlight");
                });

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
                API_CONSTANTS.BACKEND_BASE_URL_PROD +
                  `/api/updatePolicyHtmlData`,
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
          // document.getElementById("toast-heading").innerText =
          //   "Policy Approved and Published";
          document.getElementById("toast-text").innerText =
            "You have approved and published the policy. You can now view the policy on the policy table";
          document.getElementById("toast-default").classList.remove("hidden");
          document.getElementById("extralarge-modal").classList.add("hidden");
          document.getElementById("dashboardarea").classList.remove("hidden");
          document.getElementById("dashboardlist").classList.remove("hidden");
          document.getElementById("dashboardtable").classList.remove("hidden");
          setTimeout(async () => {
            await getPolicyApprovals();
            document.getElementById("toast-default").classList.add("hidden");
          }, 2000);
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
        API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/rejectPolicyApproval`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            reason: reason,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("toast-default").classList.remove("hidden");
          document.getElementById("rejectionmodal").classList.add("hidden");
          document.getElementById("extralarge-modal").classList.add("hidden");
          document.getElementById("dashboardarea").classList.remove("hidden");
          document.getElementById("dashboardlist").classList.remove("hidden");
          document.getElementById("dashboardtable").classList.remove("hidden");
          setTimeout(async () => {
            await getPolicyApprovals();
            document.getElementById("toast-default").classList.add("hidden");
          }, 2000);
        });
    });
};
