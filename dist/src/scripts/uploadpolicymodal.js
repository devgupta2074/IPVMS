export const modalHtml = `<div id="container-html1" class="hidden">
<!--  this will be hidden for rendering docx  -->
</div>


<div
id="modal"
class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center backdrop"
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
      class="flex w-full h-full flex-col gap-8 items-center cursor-pointer"
      id="upload-content"
    >
      <label
        for="dropzone-file"
        class="flex items-center cursor-pointer justify-center w-full p-6 rounded-md bg-[#EBF3FF80] border border-dashed border-[#0052F194]"
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

let dropDownBtn = document.getElementById("uploadpolicy");
console.log("Drop Down Btn", dropDownBtn);
if (!dropDownBtn) {
  dropDownBtn = document.getElementById("uploadletter");
}

console.log("upload policy modal", dropDownBtn);
const makeModal = () => {
  document.getElementById("modalcontainer").innerHTML = modalHtml;
  const closeModalBtn = document.getElementById("closeModalBtn");
  const showModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    document.addEventListener("click", function (event) {
      // console.log("event", event.target);
      if (event.target.classList.contains("backdrop")) {
        console.log("hiddee modal");
        hideModal();
      }
    });
  };

  closeModalBtn.addEventListener("click", () => {
    hideModal();
  });
  const hideModal = () => {
    modal.classList.add("hidden");
  };

  dropDownBtn.addEventListener("click", () => {
    showModal();
    console.log("modal opened");
  });
};
makeModal();
