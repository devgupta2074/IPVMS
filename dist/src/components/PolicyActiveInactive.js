import { ActivatePolicy } from "../api/activatePolicy.js";
import { DeactivatePolicy } from "../api/deactivatePolicy.js";
import { URL_CONSTANTS } from "../utils/constants.js";

export function makepolicyactive() {
  const userid = parseInt(localStorage.getItem("userid"));
  const modalid = parseInt(localStorage.getItem("modalId"));
  console.log("makepolicyactive");
  const policyactivemodal = `<div id="policyactivemodal" class="z-[6999] backdrop-blur-xl overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
  <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow ">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900">
              Making the Policy  Visible to Everyone
              </h3>
              <button id="closepolicyactivemodal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
          You are making this policy visibile to everyone. Make sure you review the policy before taking this step.
          
</div>
           
<div class="flex items-center p-4 md:p-5 border-t border-gray-200 bg-white rounded-b">
<button id="clickpolicyactive" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>

         </div>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            </div>
      </div>
  </div>
</div>`;
  const ell = document.createElement("div");
  ell.id = "policyinactiveactivemodal";
  ell.innerHTML = policyactivemodal;
  document.body.appendChild(ell);

  document
    .getElementById("clickpolicyactive")
    .addEventListener("click", async function () {
      const response = await ActivatePolicy(modalid, userid);
      console.log(response);
      window.location.href = URL_CONSTANTS.FRONTEND_BASE_URL + "/policy";
    });
  document
    .getElementById("closepolicyactivemodal")
    .addEventListener("click", function () {
      ell.remove();
    });
}

export function makepolicyinactive() {
  const modalid = parseInt(localStorage.getItem("modalId"));
  console.log("makepolicyinactive");
  const policyinactivemodal = `<div id="policyinactivemodal" class="z-[6999] backdrop-blur-xl overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow ">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900">
   Deactiving the policy
                  </h3>
                  <button id="closepolicyinactivemodal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <div class="p-4 md:p-5 space-y-4">

         You are hiding this policy from everyone. You can still access this policy from the draft section.
             
    </div>
               
                  <p class="text-base leading-relaxed text-gray-500 ">
                  
                  </p>

                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 bg-white rounded-b">
                  <button id="clickpolicyinactive" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
    
                           </div>


                           <div>
                        </div>
              </div>
              <!-- Modal footer -->
             
            
          </div>
      </div>
    </div>`;

  const ell = document.createElement("div");
  ell.id = "policyinactiveactivemodal";
  ell.innerHTML = policyinactivemodal;
  document.body.appendChild(ell);

  document
    .getElementById("clickpolicyinactive")
    .addEventListener("click", async function () {
      const response = await DeactivatePolicy(modalid);
      console.log(response);
      window.location.href = URL_CONSTANTS.FRONTEND_BASE_URL + "/policy";
    });
  document
    .getElementById("closepolicyinactivemodal")
    .addEventListener("click", function () {
      ell.remove();
    });
}
