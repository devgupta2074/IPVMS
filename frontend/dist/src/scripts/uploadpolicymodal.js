const modalHtml = `<div id="container-html1" class="hidden">
<!--  this will be hidden for rendering docx  -->
</div>


<div
id="modal"
class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
>
<!-- Modal Content -->
<div class="bg-white rounded-lg shadow-lg h-[30rem]">
  <div class="flex flex-col items-center w-[40rem] p-6 gap-8 rounded-lg">
    <div class="flex flex-row justify-between items-center w-full">
      <div class="flex flex-col justify-between items-start h-14">
        <h2 class="text-xl font-semibold">Upload Files</h2>
        <p
          class="font-normal text-sm text-[#5D5D5D] hidden"
          id="upload-message"
        >
          Upload the required documents and select their respective fields
          in the dropdown.
        </p>
      </div>
      <button
        id="closeModalBtn"
        class="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
    <div
      class="flex w-full h-full flex-col gap-8 items-center"
      id="upload-content"
    >
      <label
        for="dropzone-file"
        class="flex items-center justify-center w-full p-6 rounded-md bg-[#EBF3FF80] border border-dashed border-[#0052F194]"
      >
        <div class="flex flex-col items-center justify-center gap-5">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.125 24.7504C2.86698e-05 25.8754 1.12503 13.5004 10.125 14.6254C6.75003 2.25036 25.875 2.25036 24.75 11.2504C36 7.87536 36 25.8754 25.875 24.7504M12.375 20.2504L18 15.7504M18 15.7504L23.625 20.2504M18 15.7504V32.6254"
              stroke="#1F2DE3"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="flex flex-col gap-2 justify-center items-center">
            <p class="font-normal text-base">
              <span>Drag & drop files</span>
              <span class="text-[#1F2DE3]">Browse</span>
            </p>
            <p class="text-[#333333] text-xs">Or</p>
            <p
              class="text-[#333333] text-base flex items-center justify-center gap-1"
            >
              from Google Drive
              <span>
                <svg
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1531_13285)">
                    <path
                      d="M2.22423 15.409L3.08421 16.9418C3.26291 17.2645 3.51976 17.5181 3.82133 17.7025C4.68512 16.5711 5.28626 15.7029 5.62508 15.0979C5.96884 14.4839 6.39137 13.5234 6.89265 12.2167C5.54167 12.0331 4.51792 11.9414 3.8214 11.9414C3.15284 11.9414 2.12909 12.0331 0.75 12.2167C0.75 12.5739 0.83935 12.9312 1.01805 13.2539L2.22423 15.409Z"
                      fill="#0066DA"
                    />
                    <path
                      d="M17.1788 17.7025C17.4805 17.5181 17.7373 17.2645 17.916 16.9419L18.2734 16.308L19.9822 13.2539C20.1576 12.9382 20.25 12.5806 20.2502 12.2167C18.8631 12.0331 17.8412 11.9414 17.1845 11.9414C16.4787 11.9414 15.4567 12.0331 14.1187 12.2167C14.6141 13.5306 15.031 14.491 15.3696 15.0979C15.7111 15.7101 16.3141 16.5783 17.1788 17.7025Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M10.5001 5.76244C11.4995 4.51698 12.1882 3.55653 12.5663 2.88126C12.8707 2.33748 13.2058 1.46924 13.5714 0.276603C13.2699 0.0922009 12.9237 0 12.5663 0H8.43394C8.07654 0 7.73041 0.103755 7.42877 0.276603C7.89388 1.64445 8.2886 2.61794 8.61279 3.197C8.9711 3.83699 9.6002 4.6921 10.5001 5.76244Z"
                      fill="#00832D"
                    />
                    <path
                      d="M14.1075 12.2168H6.89266L3.82141 17.7026C4.1229 17.887 4.4691 17.9792 4.8265 17.9792H16.1737C16.5311 17.9792 16.8773 17.8755 17.1788 17.7026L14.1075 12.2168Z"
                      fill="#2684FC"
                    />
                    <path
                      d="M10.5001 5.76212L7.42883 0.276367C7.12719 0.460769 6.87033 0.714262 6.69163 1.037L1.01805 11.1789C0.842635 11.4946 0.750232 11.8522 0.75 12.2161H6.89265L10.5001 5.76212Z"
                      fill="#00AC47"
                    />
                    <path
                      d="M17.1454 6.10798L14.3085 1.037C14.1299 0.714262 13.8729 0.460769 13.5714 0.276367L10.5001 5.7622L14.1075 12.2162H20.239C20.239 11.8589 20.1497 11.5017 19.971 11.1789L17.1454 6.10798Z"
                      fill="#FFBA00"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1531_13285">
                      <rect
                        width="19.5"
                        height="18"
                        fill="white"
                        transform="translate(0.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </p>
          </div>
          <div
            class="w-full h-8 p-2 rounded-md bg-[#BED5FF] flex items-center justify-center text-[#5D5D5D] text-xs font-normal"
          >
            DOCS are supported
          </div>
        </div>
        <input
          id="dropzone-file"
          accept=".docx"
          type="file"
          class="hidden"
          multiple
        />
      </label>
    </div>
    <div class="w-full h-full flex justify-center items-center">
      <button
        id="uploadbtn"
        class="bg-[#1F2DE3] border rounded-md px-1 py-1 w-28 h-12 text-white font-medium text-base"
        disabled
      >
        Upload
      </button>
      <div class="text-red-600 hidden" id="upload-error">
        no file to upload
      </div>
    </div>
  </div>
</div>
</div>
</body>`;

const dropDownBtn = document.getElementById("uploadpolicy");

console.log("upload policy modal", dropDownBtn);
const makeModal = () => {
  document.getElementById("modalcontainer").innerHTML += modalHtml;
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("modal");
  const showModal = () => {
    modal.classList.remove("hidden");
  };

  const hideModal = () => {
    modal.classList.add("hidden");
  };

  dropDownBtn.addEventListener("click", () => {
    showModal();
    console.log("modal opened");
  });

  closeModalBtn.addEventListener("click", () => {
    hideModal();
  });
};
makeModal();
