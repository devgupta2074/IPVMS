import { GetAllCategory } from "../api/getAllCategories.js";

class BulkUpload {
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
      const title = "Demobulk";
      const htmlJson = "";
      const categoryId = 1;
      let htmlData = "";
      console.log(file);

      const getFile = async () => {
        htmlData = await renderDocx(file.file, "container-html1");
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
        var tags = document.querySelectorAll(".docx-wrapper *");
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
          console.log("section height chages");
          sections[i].setAttribute(
            "style",
            "padding: 20.15pt 59.15pt 72pt 72pt; width: 595pt; height: 842pt;"
          );
        }
        const containerdocx =
          document.getElementsByClassName("docx-wrapper")[0];
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
        var devDiv = containerContent.lastChild;
        htmlData = devDiv.innerHTML;

        console.log(devDiv, "ggg");
        // dummy value
        //   const categoryId = 1;
        const htmlJson = extractHtmlToJson(
          document.getElementsByClassName("docx-wrapper")[0]
        );
        console.log(htmlData, htmlJson, title);

        // console.log("html data is", htmlData);
        if (htmlData) {
          console.log(
            "title,htmlJson,categoryId",
            title,
            htmlJson,
            categoryId,
            htmlData
          );

          const data = { htmlText: htmlData, htmlJson, categoryId, title };
          const axiosRequestArgs = {
            method: "post",
            url: "http://ipvms-api.exitest.com/api/file/createPolicy",
            headers: {
              "Content-Type": "application/json",
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
    return file.name + indx;
  }
}

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
    textContent = parentElement.textContent;
  }

  return textContent;
}
function extractHtmlToJson(divElement) {
  const jsonOutput = {};
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
document.addEventListener("DOMContentLoaded", async () => {
  console.log("bulkkk");
  const onUpdateEvent = ({
    IN_PROGRESS,
    IN_QUEUE,
    FAILED_UPLOADS,
    COMPLETED_UPLOADS,
  }) => {
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";
    [
      ...IN_PROGRESS.values(),
      ...IN_QUEUE.values(),
      ...FAILED_UPLOADS.values(),
      ...COMPLETED_UPLOADS.values(),
    ].forEach((file) => {
      const fileItem = document.createElement("div");
      fileItem.classList.add("file-item");

      const progressBar = document.createElement("div");
      progressBar.classList.add(
        "w-1/2",
        "bg-gray-200",
        "rounded-full",
        "h-2.5",
        "dark:bg-gray-700"
      );
      progressBar.innerHTML = `<div class="bg-blue-600 h-2.5 rounded-full" style="width:${
        file.uploadCount || 0
      }%"></div>`;

      fileItem.appendChild(progressBar);

      const fileName = document.createElement("div");
      fileName.innerHTML = ` <li class="file-item flex justify-between items-center">
      <span>${file.file.name}</span>`;
      fileItem.appendChild(fileName);

      const status = document.createElement("div");
      status.classList.add("status");

      status.innerText =
        file.status === "FAILED"
          ? "Failed"
          : file.status === "SUCCESS"
          ? "Completed"
          : "In Progress";
      status.classList.add(file.status);
      fileItem.appendChild(status);

      if (file.status === "FAILED") {
        const retryBtn = document.createElement("button");
        retryBtn.classList.add("retry-btn");
        retryBtn.innerText = "Retry";
        retryBtn.addEventListener("click", () => {
          console.log("Retry clicked for", file.file.name);
        });
        fileItem.appendChild(retryBtn);
      }

      fileList.appendChild(fileItem);
    });
  };
  const onUploadComplete = (args) => {
    console.log("args are");
    // upload completed
    filesUploaded = args;

    if (filesUploaded.length === 0) {
      document.getElementById("nextstep").disabled = true;
      document.getElementById("next-error").style = "display:block";
    }
    document.getElementById("nextstep").style = "display:block";
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
    const upload = new BulkUpload(2, onUpdateEvent, onUploadComplete, 100);
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
  const category = await GetAllCategory();

  // categoryElement.innerHTML = "";
  // const categoryId = document.getElementById("category");
  // categoryId.addEventListener("change", () => {
  //   catId = categoryId.options[categoryId.selectedIndex].id;
  // });

  // category.data.map((item) => {
  //   categoryElement.innerHTML += `<option id=${item.id}>${item.category}</option>`;
  // });
  console.log(category);
  var filesUploaded = [];
  document.getElementById("uploadFile").addEventListener("click", () => {
    console.log("upload");
    if (filesUploaded.length === 0) {
      document.getElementById("uploadFile").disabled = true;
      document.getElementById("upload-error").style = "display:block";
    } else {
      document.getElementById("upload-error").style = "display:hidden";
      handleUpload();
      document.getElementById("uploadFile").style = "display:hidden";
    }
  });

  const createFileListHTML = (files) => {
    let html = '<ul class="file-list">';
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      html += `
        <li class="file-item flex justify-between items-center">
          <span>${file.name}</span>
          <button class="remove-file-btn text-red-400" data-index="${i}">Remove</button>
        </li>
      `;
    }
    html += "</ul>";
    return html;
  };
  const renderFileList = (files) => {
    const fileListContainer = document.getElementById("fileList");
    fileListContainer.innerHTML = createFileListHTML(files);
    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll(".remove-file-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.dataset.index);
        filesUploaded = Array.from(filesUploaded);
        filesUploaded.splice(index, 1);
        renderFileList(filesUploaded);
      });
    });
  };

  document.getElementById("file-upload").addEventListener("change", (event) => {
    filesUploaded = event.target.files;
    renderFileList(filesUploaded);
    document.getElementById("uploadFile").disabled = false;
    document.getElementById("uploadFile").style = "display:inline-flex";
  });

  document.getElementById("nextstep").addEventListener("click", () => {
    document.getElementById("modal-form").innerHTML = "";

    document.getElementById("modal-form").innerHTML = fileDetailHtml(
      filesUploaded,
      category
    );
    const fileData = [];
    document.getElementById("updateDetail").addEventListener("click", () => {
      filesUploaded = [...filesUploaded.values()];
      filesUploaded.map((item) => {
        console.log(item, "in file upload mapppppppppp");
        console.log(document.getElementById(item.uploadId));
        const title = document.getElementById(`${item.uploadId}title`).value;

        const category = document.getElementById(`${item.uploadId}category`);
        const categoryId = category.options[category.selectedIndex].id;
        fileData.push({
          categoryId: categoryId,
          title: title,
          docId: item.uploadId,
        });
      });
      console.log("file data is", fileData);
      const updateDocDetails = async () => {
        const result = await axios.post(
          "http://ipvms-api.exitest.com/api/file/setPolicyDetail",
          {
            docDetail: fileData,
          }
        );
        console.log("rseult is", result);
      };
      updateDocDetails();

      //api call for title and cat update
    });
  });
});

const fileDetailHtml = (files, category) => {
  files = [...files.values()];
  console.log(files, "in next step");
  let html = `<div class="w-full mx-auto overflow-y-auto">
<h1 class="text-2xl font-medium mb-4">Add  category and title </h1>
<div class="overflow-hidden bg-white rounded-lg">
  <table class="w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">`;

  let categoryElement = "";

  category.data.map((item) => {
    categoryElement += `<option id=${item.id}>${item.category}</option>`;
  });
  categoryElement += "</select>";

  files.map((item) => {
    console.log(item.uploadId, item.file, "fiel upload id is");
    html += `<tr id=${item.uploadId}>
<td class="px-6 py-4 whitespace-nowrap">${item.file.name || item.name}</td>
<td class="px-6 py-4 whitespace-nowrap">
<select id="${
      item.uploadId
    }category"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
${categoryElement}
</select>
</td>
<td class="px-6 py-4 whitespace-nowrap">
  <input type="text" id="${
    item.uploadId
  }title" class="border w-full rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter title">
</td>
</tr>`;
  });
  html += `</tbody>
  </table>
  <div class="w-full flex justify-center items-center mt-5">
  <button
type="button"
id="updateDetail"
class=" flex justify-center w-1/2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
continue
</button>
</div>
</div>
</div>`;
  return html;
};
