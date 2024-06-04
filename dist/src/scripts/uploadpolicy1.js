import { GetAllCategory } from "../api/getAllCategories.js";
import { API_CONSTANTS } from "../utils/constants.js";
import { modalHtml } from "./uploadpolicymodal.js";
import {
  assignIDsToElements,
  handleChanges,
  removeEmptyPages,
} from "./versioncontrol.js";

var uploadfiles;
var category = [];
var filesUploaded = [];

const afterinputhtml = (files, categoryElement) => {
  console.log(files, "fillll are");
  let html = `

  <label for="dropzone-file1" class="flex w-full bg-[#EBF3FF80]   border border-[#0052F194]  border-dashed h-14 justify-center gap-1 items-center rounded-md ">
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.125 24.7504C2.86698e-05 25.8754 1.12503 13.5004 10.125 14.6254C6.75003 2.25036 25.875 2.25036 24.75 11.2504C36 7.87536 36 25.8754 25.875 24.7504M12.375 20.2504L18 15.7504M18 15.7504L23.625 20.2504M18 15.7504V32.6254" stroke="#1F2DE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
             <span class="font-medium text-[#1F2DE3] text-sm">Upload</span>
            <span class="font-medium text-[#333333] text-sm">or Drag and drop files here</span>
<input
                id="dropzone-file1"
                accept=".docx"
                type="file"
                class="hidden"
                multiple
/>
              
</label>
          
 <div id="file-list" class="w-full h-40 flex flex-col  overflow-y-auto    gap-4">`;

  files.map((item) => {
    html += `
    <div class="flex flex-row gap-3">
            <div
              class="flex flex-row   justify-between bg-[#F7F7F7] w-96 px-4 py-5  rounded-md  h-10 items-center"
            >
                  <div class="flex font-normal text-[#5D5D5D] text-sm gap-3 flex-row ">
                    <span>
                      <svg
                        width="13"
                        height="18"
                        viewBox="0 0 13 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1531_13314)">
                          <path
                            d="M12.8571 4.93013V16.8404C12.8571 17.4809 12.3448 18 11.7135 18H1.14366C0.511987 18 0 17.4809 0 16.8404V1.15959C0 0.519094 0.511987 0 1.14366 0H7.99495L12.8571 4.93013Z"
                            fill="#518EF8"
                          />
                          <path
                            d="M9.71577 9.03711H3.14111V9.77797H9.71577V9.03711Z"
                            fill="white"
                          />
                          <path
                            d="M9.71577 10.6914H3.14111V11.4321H9.71577V10.6914Z"
                            fill="white"
                          />
                          <path
                            d="M9.71577 12.3457H3.14111V13.0864H9.71577V12.3457Z"
                            fill="white"
                          />
                          <path
                            d="M7.81677 14H3.14111V14.7409H7.81677V14Z"
                            fill="white"
                          />
                          <path
                            d="M8.65833 4.8233L12.8571 6.57727V4.93041L10.4764 4.21777L8.65833 4.8233Z"
                            fill="#3A5BBC"
                          />
                          <path
                            d="M12.8572 4.93012H9.13861C8.50675 4.93012 7.995 4.41103 7.995 3.77053V0L12.8572 4.93012Z"
                            fill="#ACD1FC"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1531_13314">
                            <rect width="12.8571" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    ${item.name}
                  </div>
                  <div class="flex   flex-row" id="${item.name}status">
                    <p class="font-normal text-xs text-[#5D5D5D80] flex gap-2">
                      ${Math.round(item.size / 1024)}KB
                      <span class="hover:cursor-pointer" id="${
                        item.name
                      }removebtn"
                      
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.25 5.25H6.125V10.5H5.25V5.25Z"
                            fill="#5D5D5D"
                          />
                          <path
                            d="M7.875 5.25H8.75V10.5H7.875V5.25Z"
                            fill="#5D5D5D"
                          />
                          <path
                            d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z"
                            fill="#5D5D5D"
                          />
                          <path
                            d="M5.25 0.875H8.75V1.75H5.25V0.875Z"
                            fill="#5D5D5D"
                          />
                        </svg>
                      </span>
                    </p>
                    </div>
                    </div>
                    <div class="" id="${item.name}category">
                    ${categoryElement}
                    </div>
                    </div>

    
    `;
  });
  html += "</div>";
  return html;
};

const handleRemoveFile = (name, categoryElement) => {
  let arrfiles = filesUploaded;
  console.log(arrfiles, "in remove arr files are");
  if (arrfiles) {
    const indx = arrfiles.findIndex((item) => item.name == name);
    console.log("indx is in rem", indx);
    arrfiles.splice(indx, 1);
    filesUploaded = arrfiles;
    console.log("files uploaded after remove", filesUploaded);
    document.getElementById("file-list").innerHTML = "";
    filesUploaded.map((item) => {
      document.getElementById(
        "file-list"
      ).innerHTML += `<div class="flex flex-row gap-3">
  <div
    class="flex flex-row   justify-between bg-[#F7F7F7] w-96 px-4 py-5  rounded-md  h-10 items-center"
  >
        <div class="flex font-normal text-[#5D5D5D] text-sm gap-3 flex-row ">
          <span>
            <svg
              width="13"
              height="18"
              viewBox="0 0 13 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1531_13314)">
                <path
                  d="M12.8571 4.93013V16.8404C12.8571 17.4809 12.3448 18 11.7135 18H1.14366C0.511987 18 0 17.4809 0 16.8404V1.15959C0 0.519094 0.511987 0 1.14366 0H7.99495L12.8571 4.93013Z"
                  fill="#518EF8"
                />
                <path
                  d="M9.71577 9.03711H3.14111V9.77797H9.71577V9.03711Z"
                  fill="white"
                />
                <path
                  d="M9.71577 10.6914H3.14111V11.4321H9.71577V10.6914Z"
                  fill="white"
                />
                <path
                  d="M9.71577 12.3457H3.14111V13.0864H9.71577V12.3457Z"
                  fill="white"
                />
                <path
                  d="M7.81677 14H3.14111V14.7409H7.81677V14Z"
                  fill="white"
                />
                <path
                  d="M8.65833 4.8233L12.8571 6.57727V4.93041L10.4764 4.21777L8.65833 4.8233Z"
                  fill="#3A5BBC"
                />
                <path
                  d="M12.8572 4.93012H9.13861C8.50675 4.93012 7.995 4.41103 7.995 3.77053V0L12.8572 4.93012Z"
                  fill="#ACD1FC"
                />
              </g>
              <defs>
                <clipPath id="clip0_1531_13314">
                  <rect width="12.8571" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          ${item.name}
        </div>
        <div class="flex   flex-row" id="${item.name}status">
          <p class="font-normal text-xs text-[#5D5D5D80] flex gap-2">
            ${Math.round(item.size / 1024)}KB
            <span class="hover:cursor-pointer" id="${item.name}removebtn"
            
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.25 5.25H6.125V10.5H5.25V5.25Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M7.875 5.25H8.75V10.5H7.875V5.25Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M5.25 0.875H8.75V1.75H5.25V0.875Z"
                  fill="#5D5D5D"
                />
              </svg>
            </span>
          </p>
          </div>
          </div>
          <div class="" id="${item.name}category">
          ${categoryElement}
          </div>
          </div>`;
    });
    filesUploaded.map((item) => {
      document
        .getElementById(`${item.name}removebtn`)
        .addEventListener("click", () => {
          handleRemoveFile(item.name, categoryElement);
        });
    });
  }
};
const uploadFilesListUi = (categoryElement) => {
  const docUploadContent = document.getElementById("upload-content");
  document.getElementById("upload-message").classList.remove("hidden");
  docUploadContent.innerHTML = afterinputhtml(filesUploaded, categoryElement);
  var arrfiles = filesUploaded;
  arrfiles.map((item) => {
    document
      .getElementById(`${item.name}removebtn`)
      .addEventListener("click", () => {
        handleRemoveFile(item.name, categoryElement);
      });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const res = await GetAllCategory();
  category = res?.data;
  let categoryElement = `
    <select id="category" class="w-56 flex justify-center p-2  placeholder:text-right items-center  h-10 border border-[#5D5D5D33]  text-xs rounded placeholder:text-sm placeholder:text-[#5D5D5D4D] placeholder:opacity-30  placeholder:font-normal">
      <option  class="flex justify-center items-center" selected>Choose Category</option>
    `;

  category?.map((item) => {
    categoryElement += `<option value=${item.id} id=${item.id}>${item.category}</option>`;
  });
  categoryElement += `</select>
  <p  id="caterror" class=" hidden text-red-500 text-xs font-light pt-1">Select a Category first</p>
  `;
  if (document.getElementById("dropzone-file")) {
    document
      .getElementById("dropzone-file")
      .addEventListener("change", (event) => {
        const files = event.target.files;
        console.log(files);
        filesUploaded = Array.from(files);
        console.log("files are", files);
        uploadFilesListUi(categoryElement);
        document.getElementById("uploadbtn").disabled = false;
        document
          .getElementById("dropzone-file1")
          .addEventListener("change", (event) => {
            let newFiles = event.target.files;
            newFiles = Array.from(newFiles);
            filesUploaded = filesUploaded.concat(newFiles);
            newFiles.map((item) => {
              document.getElementById(
                "file-list"
              ).innerHTML += `<div class="flex flex-row gap-3">
  <div
    class="flex flex-row   justify-between bg-[#F7F7F7] w-96 px-4 py-5  rounded-md  h-10 items-center"
  >
        <div class="flex font-normal text-[#5D5D5D] text-sm gap-3 flex-row ">
          <span>
            <svg
              width="13"
              height="18"
              viewBox="0 0 13 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1531_13314)">
                <path
                  d="M12.8571 4.93013V16.8404C12.8571 17.4809 12.3448 18 11.7135 18H1.14366C0.511987 18 0 17.4809 0 16.8404V1.15959C0 0.519094 0.511987 0 1.14366 0H7.99495L12.8571 4.93013Z"
                  fill="#518EF8"
                />
                <path
                  d="M9.71577 9.03711H3.14111V9.77797H9.71577V9.03711Z"
                  fill="white"
                />
                <path
                  d="M9.71577 10.6914H3.14111V11.4321H9.71577V10.6914Z"
                  fill="white"
                />
                <path
                  d="M9.71577 12.3457H3.14111V13.0864H9.71577V12.3457Z"
                  fill="white"
                />
                <path
                  d="M7.81677 14H3.14111V14.7409H7.81677V14Z"
                  fill="white"
                />
                <path
                  d="M8.65833 4.8233L12.8571 6.57727V4.93041L10.4764 4.21777L8.65833 4.8233Z"
                  fill="#3A5BBC"
                />
                <path
                  d="M12.8572 4.93012H9.13861C8.50675 4.93012 7.995 4.41103 7.995 3.77053V0L12.8572 4.93012Z"
                  fill="#ACD1FC"
                />
              </g>
              <defs>
                <clipPath id="clip0_1531_13314">
                  <rect width="12.8571" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          ${item.name}
        </div>
        <div class="flex   flex-row" id="${item.name}status">
          <p class="font-normal text-xs text-[#5D5D5D80] flex gap-2">
            ${Math.round(item.size / 1024)}KB
            <span class="hover:cursor-pointer" id="${item.name}removebtn"
            
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.25 5.25H6.125V10.5H5.25V5.25Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M7.875 5.25H8.75V10.5H7.875V5.25Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M5.25 0.875H8.75V1.75H5.25V0.875Z"
                  fill="#5D5D5D"
                />
              </svg>
            </span>
          </p>
          </div>
          </div>
          <div class="" id="${item.name}category">
          ${categoryElement}
          </div>
          </div>`;
            });
            filesUploaded.map((item) => {
              document
                .getElementById(`${item.name}removebtn`)
                .addEventListener("click", () => {
                  handleRemoveFile(item.name, categoryElement);
                });
            });
          });
      });

    console.log(category);
  }
});

/// bulk upload logic

function extractParentText(parentId) {
  const parentElement = document.getElementById(parentId);
  // console.log(parentId);
  let textContent = "";

  // Iterate over child nodes
  if (parentElement !== null && parentElement.childNodes.length > 0) {
    for (let i = 0; i < parentElement.childNodes.length; i++) {
      const childNode = parentElement.childNodes[i];
      // Check if the node is a text node
      if (childNode.nodeType === Node.TEXT_NODE) {
        textContent += childNode.textContent;
      }
    }
  } else {
    if (parentElement) {
      textContent = parentElement.textContent;
    }
  }

  return textContent;
}
export function extractHtmlToJson(divElement) {
  const jsonOutput = {};
  // console.log(document.getElementsByClassName("docx-wrapper-1"));
  const htmlTags = divElement.getElementsByTagName("*");
  console.log(htmlTags, "html");

  for (let i = 0; i < htmlTags.length; i++) {
    const tag = htmlTags[i];
    const children = tag.children;
    const childrens = tag.parentElement.children;
    let position = -1; // Default position if tag is not found in its parent's children list

    // Find the position of the tag within its parent's children
    if (childrens) {
      for (let j = 0; j < childrens.length; j++) {
        if (childrens[j] === tag) {
          position = j;
          break;
        }
      }
    }

    // if (children.length === 0) {
    // Check if the tag has no children
    const tagId = tag.id;
    const isImgTag = tag.tagName.toLowerCase() === "img";
    const isLinkTag = tag.tagName.toLowerCase() === "a";

    jsonOutput[tagId] = {
      textContent: extractParentText(tag.id),
      textcontentcombined: tag.textContent,
      id: tagId,
      parentId: tag.parentElement.id || "root",
      style: tag.getAttribute("style") || "",
      isTagImg: isImgTag,
      isTagLink: isLinkTag,
      class: tag.className,
      src: isImgTag ? tag.getAttribute("src") : "",
      tagName: tag.tagName.toLowerCase(),
      position: position,
    };
  }

  return jsonOutput;
}

export class BulkUpload {
  constructor(
    concurrency,
    onUpdateEvent,
    onUploadComplete,
    lastProgressUpdated
  ) {
    this.queue = []; //contain all file object first
    this.uploadCompleted = false;
    this.lastProgressUpdated = lastProgressUpdated;
    this.onUpdateEvent = onUpdateEvent;
    this.completedqueue = new Map(); //success upload
    this.failedqueue = new Map(); //all failed
    this.concurrency = concurrency;
    this.progressPool = new Map();

    this.initiated = false;
    this.completedUploads = 0;
    this.onUploadComplete = onUploadComplete;
    // in progress

    this.inProgress = new Map();
    this.inQueue = new Map();

    // mapping from file name to status -> DRAFT,PROGRESS,COMPLETED ,FAILED-> progress percent,  //failed   // completed
    //return progress of some file so
  }
  //file->obj
  startUpload(file) {
    //file are the file obje from input
    // file->name,file,
    if (!this.initiated) {
      // if not inittaied  update queue
      //if file complete or fail-> in axios or xml request  update queue
      //update the  queue
      return this.updateQueue(file);
    }
    this.initiated = true;
    console.log("inittiaed");

    file.forEach((item, indx) => {
      const value = {
        status: "INQUEUE",
        id: this.getName(item, indx),
        file: item,
      };
      //PROGRESS ->upload ho rha he

      //size<concurreny

      if (this.queue.length < this.concurrency) {
        value.status = "PROGRESS";
        this.inProgress.set(value.id, value);
      } else {
        value.status = "INQUEUE";
        this.inQueue.set(value.id, value);
      }
      this.sendUpdateEvent();
      //send update event-> events such as update file  status and free of queue qill
      this.startInitialUploadFile();

      //when file queue.size dec
      //wait

      //upload file
    });
  }

  //axiosReqArgs ->object ->url,onCancel function etc,body
  onUpdateProgress(file, axiosRequestArgs) {
    axiosRequestArgs.onUploadProgress = ({ loaded, total }) => {
      loaded = isNaN(Number(loaded)) ? 0 : Number(loaded);
      total = isNaN(Number(total)) ? 0 : Number(total);
      file.uploadCount = Math.floor((loaded / total) * 100);
      console.log("file upload Count", file.uploadCount);
      if (typeof file?.lastProgressUpdated !== "number") {
        file.lastProgressUpdated = Date.now();
      }
      //send event callback after updating lastProgressUpload if frequency
      //is more than requested one
      if (
        typeof this.lastProgressUpdated === "number" &&
        Date.now() - file?.lastProgressUpdated >= this.lastProgressUpdated
      ) {
        this.sendUpdateEvent();
        file.lastProgressUpdated = Date.now();
      }
    };
  }

  startInitialUploadFile() {
    for (const file of this.inProgress) {
      this.uploadFile(file);
    }
  }

  uploadFile(file) {
    //file ->object to upload
    // status ->INQUEUE ,PROGRESS
    // something related to cancel the file obj
    // axiosRequestArgs.cancelToken = new axios.CancelToken((cancel) => {
    //   fileObj.cancel = cancel;
    // });
    // will make api call or xml request here
    // const formData = new FormData();
    // formData.append("file", file.file);
    try {
      const title = file.file.name;
      //file->name
      console.log(title);
      const htmlJson = "";

      let htmlData = "";
      console.log(file);
      console.log(
        document
          .getElementById(`${file.file.name}category`)
          .querySelector("select").value
      );

      const categoryId = document
        .getElementById(`${file.file.name}category`)
        .querySelector("select").value;
      const getFile = async () => {
        htmlData = await renderDocx(file.file, "container-html1");
        console.log(htmlData, "DDD");
        // console.log("html data is", htmlData);
        if (htmlData) {
          const blobToBase64 = (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            return new Promise((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });
          };

          async function convertImagesToBase64(divId) {
            // Find the div element
            var div = document.getElementById(divId);

            // Find all images within the div
            var images = div.getElementsByTagName("img");

            // Iterate over each image
            if (images.length > 0) {
              for (var i = 0; i < images.length; i++) {
                var img = images[i];

                // Create a blob URL for the image
                var blob = await fetch(img.src).then((response) =>
                  response.blob()
                );

                // Convert blob to base64
                var base64 = await blobToBase64(blob);

                img.src = base64;
              }
            }
          }

          await convertImagesToBase64("container-html1");
          var tags = document
            .getElementById("container-html1")
            .querySelectorAll(".docx-wrapper *");
          // console.log(tags);
          var idCounter = 1;
          tags.forEach(function (tag) {
            if (!tag.id) {
              tag.id = "id_" + idCounter;
              idCounter++;
            }
          });
          const sections = document.getElementsByClassName("docx");
          console.log(sections);
          for (var i = 0; i < sections.length; i++) {
            const width = sections[i].clientWidth;
            console.log("section height chages");
            sections[i].setAttribute(
              "style",
              `padding: 20.15pt 59.15pt 72pt 72pt; width: 612pt; height: 792pt;`
            );
          }
          const containerdocx = document
            .getElementById("container-html1")
            .getElementsByClassName("docx-wrapper")[0];
          const headers = containerdocx.getElementsByTagName("header");
          console.log(headers);
          // for (var i = 0; i < headers.length; i++) {
          //   console.log("section height chages");
          //   headers[i].setAttribute(
          //     "style",
          //     "margin-top: 19.3333px; height: 48px; margin-bottom:10px"
          //   );
          // }
          const articles = containerdocx.getElementsByTagName("article");
          console.log(articles);
          // for (var i = 0; i < articles.length; i++) {
          //   console.log("section height chages");
          //   articles[i].setAttribute("style", "margin-top: 48px; ");
          // }

          var containerContent = document.getElementById("container-html1");

          // Get the div element with the class "dev" inside container-content

          htmlData = containerContent.innerHTML;
          console.log(htmlData, containerContent);
          // console.log(devDiv, "ggg");
          // dummy value
          //   const categoryId = 1;
          const htmlJson = extractHtmlToJson(
            containerContent.getElementsByClassName("docx-wrapper")[0]
          );
          console.log("title,htmlJson,categoryId", title, htmlJson, categoryId);

          const data = { htmlText: htmlData, htmlJson, categoryId, title };
          const token = localStorage.getItem("token");
          console.log("token is ", token);
          document
            .getElementById("container-html1")
            .getElementsByClassName("docx-wrapper")[0].id = "docx-wrapper";
          const axiosRequestArgs = {
            method: "post",
            url: API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/createPolicy",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            data: data,
          };

          this.onUpdateProgress(file, axiosRequestArgs);
          // axiosRequestArgs.cancelToken = new axios.CancelToken((cancel) => {
          //   file.cancel = cancel;
          // });
          axios(axiosRequestArgs)
            .then((res) => {
              console.log(res.data);

              this.inProgress.delete(file.id);
              file.status = "SUCCESS";
              file.uploadId = res.data.document.id;
              console.log(res.data.document.id);
              this.completedUploads += 1;
              this.completedqueue.set(file.id, file);
              this.sendUpdateEvent();
              this.freeQueue();
            })
            .catch((error) => {
              file.isCancelled = !!axios.isCancel(error);
              this.uploadFail(file);
            });
        }
      };
      getFile();
    } catch (error) {
      this.uploadFail(file);
      //failed file upload
    }

    // reject
  }
  uploadFail(file) {
    file.status = "FAILED";
    this.inProgress.delete(file.id);
    this.failedqueue.set(file.id, file);
    this.sendUpdateEvent();
    this.freeQueue();
  }

  updateQueue(files) {
    this.uploadCompleted = false;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const value = {
        status: "INQUEUE",
        id: `${this.getName(file, i)}`,
        file,
      };
      value.status = "INQUEUE";
      this.inQueue.set(value.id, value);
      this.freeQueue();
    }
    this.sendUpdateEvent();
  }
  freeQueue() {
    // call -> upload success
    // start Upload call  this.initated update queue
    if (this.inQueue.size === 0) {
      this.sendUpdateEvent();
      if (!this.uploadCompleted) {
        this.onUploadComplete(this.completedqueue);
        this.uploadCompleted = true;
      }
      return;
    }
    if (this.inProgress.size === this.concurrency) {
      // no file can be added to upload or removed from queue
      return this.sendUpdateEvent();
    }

    for (let [_, file] of this.inQueue) {
      file.status = "P";
      this.inQueue.delete(file.id);
      this.inProgress.set(file.id, file);
      this.sendUpdateEvent();
      this.uploadFile(file);
      //we only what top of the queue that's why break the loop post every
      // iteration
      break;
    }
  }
  sendUpdateEvent() {
    this.onUpdateEvent({
      IN_PROGRESS: this.inProgress,
      IN_QUEUE: this.inQueue,
      COMPLETED_UPLOADS: this.completedqueue,
      FAILED_UPLOADS: this.failedqueue,
    });
  }

  getName(file, indx) {
    // same name upload->what to assume 1 2
    return file.name;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("bulkkk");
  const onUpdateEvent = ({
    IN_PROGRESS,
    IN_QUEUE,
    FAILED_UPLOADS,
    COMPLETED_UPLOADS,
  }) => {
    [
      ...IN_PROGRESS.values(),
      ...IN_QUEUE.values(),
      ...FAILED_UPLOADS.values(),
      ...COMPLETED_UPLOADS.values(),
    ].forEach((file) => {
      console.log(file, "file name");
      document.getElementById(`${file.file.name}status`).innerHTML =
        file.status === "FAILED"
          ? `<div class="text-black font-light text-xs flex justify-center items-center gap-2">Failed
          <svg
                class="w-3 h-3"
                fill="none"
                class="text-red-500"
                stroke="red"
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
          </div>`
          : file.status === "SUCCESS"
          ? `<div class="flex gap-2">
          <p class="text-black text-xs font-light">Success</p>
          <svg aria-hidden="true" class="w-3 h-3 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Success</span>
          </div>
          `
          : `
          <div role="status">
              <svg aria-hidden="true" class="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>`;
    });
  };
  const onUploadComplete = (args) => {
    console.log("all file uploaded success");
    filesUploaded = args;
    Toastify({
      text: "All files uploaded successfully",
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
    console.log(args);
    setTimeout(() => {
      document.getElementById("modalcontainer").innerHTML = modalHtml;
      resetModal();
      const closeModalBtn = document.getElementById("closeModalBtn");
      closeModalBtn.addEventListener("click", () => {
        hideModal();
      });
    }, 3000);
  };

  //   document.getElementById("ifile").addEventListener("change", () => {
  //     const files = document.getElementById("ifile").files;
  //     console.log("files are ", files);
  //     const upload = new BulkUpload(2, onUpdateEvent, onUploadComplete, 100);
  //     upload.startUpload(files);
  //     console.log("in");
  //   });

  // global var for file uploaded

  const handleUpload = async () => {
    const upload = new BulkUpload(5, onUpdateEvent, onUploadComplete, 100);
    // fileUploaded
    console.log(filesUploaded, "filesUploaded are");
    upload.startUpload(filesUploaded);
    // const resHtml = await renderDocx(file[0], "container-html1");

    // // dummy value
    // //   const categoryId = 1;
    // const htmlJson = "";
    // await CreatePolicy(resHtml, htmlJson, catId, title);
    // console.log("results");
  };

  // categoryElement.innerHTML = "";
  // const categoryId = document.getElementById("category");
  // categoryId.addEventListener("change", () => {
  //   catId = categoryId.options[categoryId.selectedIndex].id;
  // });

  // category.data.map((item) => {
  //   categoryElement.innerHTML += `<option id=${item.id}>${item.category}</option>`;
  // });

  console.log("is it working");
  if (document.getElementById("uploadbtn")) {
    document.getElementById("uploadbtn").addEventListener("click", () => {
      console.log("upload");
      if (filesUploaded.length === 0) {
        document.getElementById("upload-error").style.display = "block";
        document.getElementById("uploadbtn").disabled = true;
      } else {
        document.getElementById("upload-error").style = "display:hidden";

        console.log(category, "category");
        let flag = true;
        filesUploaded.map((item) => {
          console.log(
            document
              .getElementById(`${item.name}category`)
              .querySelector("select")
          );
          console.log(
            document
              .getElementById(`${item.name}category`)
              .querySelector("select").value
          );
          if (
            document
              .getElementById(`${item.name}category`)
              .querySelector("select").value == "Choose Category"
          ) {
            flag = false;
            document
              .getElementById(`${item.name}category`)
              .querySelector("p")
              .classList.remove("hidden");
          } else {
            document
              .getElementById(`${item.name}category`)
              .querySelector("p")
              .classList.add("hidden");
          }
        });
        if (flag) {
          document.getElementById("uploadbtn").classList.add("hidden");

          handleUpload();
        }
      }
    });
  }
});

//error on not choosing category
export const resetModal = async () => {
  filesUploaded = [];

  const onUpdateEvent = ({
    IN_PROGRESS,
    IN_QUEUE,
    FAILED_UPLOADS,
    COMPLETED_UPLOADS,
  }) => {
    [
      ...IN_PROGRESS.values(),
      ...IN_QUEUE.values(),
      ...FAILED_UPLOADS.values(),
      ...COMPLETED_UPLOADS.values(),
    ].forEach((file) => {
      console.log(file, "file name");
      document.getElementById(`${file.file.name}status`).innerHTML =
        file.status === "FAILED"
          ? `<div class="text-black font-light text-xs flex justify-center items-center gap-2">Failed
          <svg
                class="w-3 h-3"
                fill="none"
                class="text-red-500"
                stroke="red"
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
          </div>`
          : file.status === "SUCCESS"
          ? `<div class="flex gap-2">
          <p class="text-black text-xs font-light">Success</p>
          <svg aria-hidden="true" class="w-3 h-3 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Success</span>
          </div>
          `
          : `
          <div role="status">
              <svg aria-hidden="true" class="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>`;
    });
    if (IN_PROGRESS.size == 0 && IN_QUEUE.size === 0) {
      Toastify({
        text: "All files uploaded successfully",
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
      // console.log(args);
      setTimeout(() => {
        document.getElementById("modalcontainer").innerHTML = modalHtml;
        resetModal();
        const closeModalBtn = document.getElementById("closeModalBtn");
        closeModalBtn.addEventListener("click", () => {
          hideModal();
        });
      }, 3000);
    }
  };
  const onUploadComplete = (args) => {
    console.log("all file uploaded success");
    filesUploaded = args;
  };
  const handleUpload = async () => {
    const upload = new BulkUpload(5, onUpdateEvent, onUploadComplete, 100);
    // fileUploaded
    console.log(filesUploaded, "filesUploaded are");
    upload.startUpload(filesUploaded);
    // const resHtml = await renderDocx(file[0], "container-html1");

    // // dummy value
    // //   const categoryId = 1;
    // const htmlJson = "";
    // await CreatePolicy(resHtml, htmlJson, catId, title);
    // console.log("results");
  };
  const res = await GetAllCategory();
  category = res?.data;
  let categoryElement = `
    <select id="category" class="w-56 flex justify-center p-2  placeholder:text-right items-center  h-10 border border-[#5D5D5D33]  text-xs rounded placeholder:text-sm placeholder:text-[#5D5D5D4D] placeholder:opacity-30  placeholder:font-normal">
      <option  class="flex justify-center items-center" selected>Choose Category</option>
    `;

  category?.map((item) => {
    categoryElement += `<option value=${item.id} id=${item.id}>${item.category}</option>`;
  });
  categoryElement += `</select>
  <p  id="caterror" class=" hidden text-red-500 text-xs font-light pt-1">Select a Category first</p>
  `;
  if (document.getElementById("dropzone-file")) {
    document
      .getElementById("dropzone-file")
      .addEventListener("change", (event) => {
        const files = event.target.files;
        console.log(files);
        filesUploaded = Array.from(files);
        console.log("files are", files);
        uploadFilesListUi(categoryElement);
        document.getElementById("uploadbtn").disabled = false;
        document
          .getElementById("dropzone-file1")
          .addEventListener("change", (event) => {
            let newFiles = event.target.files;
            newFiles = Array.from(newFiles);
            filesUploaded = filesUploaded.concat(newFiles);
            newFiles.map((item) => {
              document.getElementById(
                "file-list"
              ).innerHTML += `<div class="flex flex-row gap-3">
  <div
    class="flex flex-row   justify-between bg-[#F7F7F7] w-96 px-4 py-5  rounded-md  h-10 items-center"
  >
        <div class="flex font-normal text-[#5D5D5D] text-sm gap-3 flex-row ">
          <span>
            <svg
              width="13"
              height="18"
              viewBox="0 0 13 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1531_13314)">
                <path
                  d="M12.8571 4.93013V16.8404C12.8571 17.4809 12.3448 18 11.7135 18H1.14366C0.511987 18 0 17.4809 0 16.8404V1.15959C0 0.519094 0.511987 0 1.14366 0H7.99495L12.8571 4.93013Z"
                  fill="#518EF8"
                />
                <path
                  d="M9.71577 9.03711H3.14111V9.77797H9.71577V9.03711Z"
                  fill="white"
                />
                <path
                  d="M9.71577 10.6914H3.14111V11.4321H9.71577V10.6914Z"
                  fill="white"
                />
                <path
                  d="M9.71577 12.3457H3.14111V13.0864H9.71577V12.3457Z"
                  fill="white"
                />
                <path
                  d="M7.81677 14H3.14111V14.7409H7.81677V14Z"
                  fill="white"
                />
                <path
                  d="M8.65833 4.8233L12.8571 6.57727V4.93041L10.4764 4.21777L8.65833 4.8233Z"
                  fill="#3A5BBC"
                />
                <path
                  d="M12.8572 4.93012H9.13861C8.50675 4.93012 7.995 4.41103 7.995 3.77053V0L12.8572 4.93012Z"
                  fill="#ACD1FC"
                />
              </g>
              <defs>
                <clipPath id="clip0_1531_13314">
                  <rect width="12.8571" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          ${item.name}
        </div>
        <div class="flex   flex-row" id="${item.name}status">
          <p class="font-normal text-xs text-[#5D5D5D80] flex gap-2">
            ${Math.round(item.size / 1024)}KB
            <span class="hover:cursor-pointer" id="${item.name}removebtn"
            
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.25 5.25H6.125V10.5H5.25V5.25Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M7.875 5.25H8.75V10.5H7.875V5.25Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5Z"
                  fill="#5D5D5D"
                />
                <path
                  d="M5.25 0.875H8.75V1.75H5.25V0.875Z"
                  fill="#5D5D5D"
                />
              </svg>
            </span>
          </p>
          </div>
          </div>
          <div class="" id="${item.name}category">
          ${categoryElement}
          </div>
          </div>`;
            });
            filesUploaded.map((item) => {
              document
                .getElementById(`${item.name}removebtn`)
                .addEventListener("click", () => {
                  handleRemoveFile(item.name, categoryElement);
                });
            });
          });
      });

    console.log(category);
  }
  if (document.getElementById("uploadbtn")) {
    document.getElementById("uploadbtn").addEventListener("click", () => {
      console.log("upload");
      if (filesUploaded.length === 0) {
        document.getElementById("upload-error").style.display = "block";
        document.getElementById("uploadbtn").disabled = true;
      } else {
        document.getElementById("upload-error").style = "display:hidden";

        console.log(category, "category");
        let flag = true;
        filesUploaded.map((item) => {
          console.log(
            document
              .getElementById(`${item.name}category`)
              .querySelector("select")
          );
          console.log(
            document
              .getElementById(`${item.name}category`)
              .querySelector("select").value
          );
          if (
            document
              .getElementById(`${item.name}category`)
              .querySelector("select").value == "Choose Category"
          ) {
            flag = false;
            document
              .getElementById(`${item.name}category`)
              .querySelector("p")
              .classList.remove("hidden");
          } else {
            document
              .getElementById(`${item.name}category`)
              .querySelector("p")
              .classList.add("hidden");
          }
        });
        if (flag) {
          document.getElementById("uploadbtn").classList.add("hidden");

          handleUpload();
        }
      }
    });
  }
};
