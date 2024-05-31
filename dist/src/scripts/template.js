import { InsertNavbar } from "../components/Navbar.js";
import { API_CONSTANTS } from "../utils/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  InsertNavbar();
});

var title;
var htmlData;
var email;
var category;
var recipientId;
var templateId;
var template_name;
var description;
var result2;
var shouldBeSigned = false;
var loading = false;
var recipientEmail;
var recipientName;
var ipvmsuserId;

const getTemplate = (id, recipientId) => {
  console.log("in get temo id is", id);
  const getTemplatedoc = async (id) => {
    console.log("in get temo id in getTempdox is", id);
    const response = await fetch(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getTemplateById/${id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data.data[0];
        // Handle the response from the backend
        console.log(result);
        category = result.category;
        description = result.description;
        htmlData = result.htmldata;
        title = result.title;
        document.getElementById("doc_title").innerHTML = title;
        document.getElementById("container").innerHTML = htmlData;
        makeForm(result2);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getUserDetails = async (recipientId) => {
    console.log("in user deatil user id is", recipientId);
    if (recipientId) {
      const response = await fetch(
        API_CONSTANTS.BACKEND_BASE_URL_PROD +
          `/api/user/getUserById/${recipientId}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const result = data.data;
          if (recipientId !== 2) {
            result2 = result;
          }

          // Handle the response from the backend
          console.log(result, "user details are");
          getTemplatedoc(id);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  console.log("wuuuh", recipientId);
  getUserDetails(recipientId);
};

document.addEventListener("DOMContentLoaded", function (event) {
  const url = window.location.href;
  console.log("URL:", url);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams);
  const id = urlParams.get("templateId");
  templateId = id;
  recipientId = urlParams.get("userId");
  ipvmsuserId = localStorage.getItem("userId");
  console.log("ipvms user id is", ipvmsuserId);
  if (recipientId === "newuser") {
    recipientId = 2;
  }
  console.log("user id is", recipientId);
  getTemplate(id, recipientId);
  // document
  //   .getElementById("generate")
  //   .addEventListener("click", async () => {
  //     showLoading();
  //     await handleGeneratePdf();
  //     removeLoading();
  //   });
});

export const makeForm = (result) => {
  console.log;
  const htmlContent = document.getElementById("container").innerHTML;
  console.log("html content is", htmlContent);
  const handlebarsRegex = /\{\{([^{}]+)\}\}/g;
  //extarction logic

  const selectElement = (title) => {
    if (title === "employee_code" || title === "mobile_number") {
      return numberElement(title);
    }
    return `<div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">${title}</label>
    <input required   type="text"  id=${title} id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="${title}" required />
 </div>`;
  };
  const emailElement = (title) => {
    return `<div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${title}</label>
      <input required  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"   type="email" id=${title} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
      </div>`;
  };
  const numberElement = (title) => {
    return `<div class="mb-6">
      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${title}</label>
      <input   required type="number" id=${title} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" maxlength="10"   required />
  </div>`;
  };

  const imageElement = (title) => {
    return `<div class="border-2 border-gray-100 flex item-center flex-col items-center p-2   ">
            <h1>${title}</h1>
        <div 
        id="main" 
        class="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md  w-64 ">
        <label for="upload" class="flex flex-col items-center gap-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="text-gray-600 font-medium">Upload file</span> 
        </label>
        <input  id="${title}" type="file" />
        <img  id="${title}image" class="object-cover h-20 w-40" alt="image">
    </div>
    </div>`;
  };
  const dateElement = (title) => {
    return `
      <div class="mb-6">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
    ${title}
  </label>
    <input type="date" id=${title} name="trip-start"  
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="${title}" required 
    />
  </div>
      `;
  };

  const linkElement = (title) => {
    return `<div>
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            ${title}
          </label>
          <input  id="${title}" class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
          </div>`;
  };
  const loopElement = (name, head) => {
    return `<div class="w-15" >
    <h1>
    ${head}
    </h1>
    <div class="flex flex-row gap-5 items-center justify-center">
    <input  placeholder="${name}"
    id="${name}"
          class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
          <i class="fa-solid fa-plus"></i>
    </div>
    </div>   
    `;
  };

  function extractVariableNames(html) {
    const variableNames = new Set();
    const vname = new Set();
    let match;
    var loopStart = false;
    var loopHead = null;
    while ((match = handlebarsRegex.exec(html)) !== null) {
      const expression = match[1].trim();
      const parts = expression.split(/\s+/);
      if (parts[0].startsWith("#")) {
        loopStart = true;
        loopHead = parts[0].substring(1);
        continue;
      }
      if (parts[0].startsWith("/")) {
        loopStart = false;
        loopHead = null;
        continue;
      }
      if (parts[0] === "this" || parts[0] === "/each") {
        continue;
      }
      if (parts[0] === "image") {
        if (vname.has(parts[1])) continue;
        variableNames.add({ name: parts[1], type: "image" });
        vname.add(parts[1]);
        continue;
      }
      if (parts[0] === "link") {
        if (vname.has(parts[1])) continue;
        variableNames.add({ name: parts[1], type: "link" });
        vname.add(parts[1]);
        continue;
      }
      if (parts[0] === "number") {
        if (vname.has(parts[1])) continue;
        variableNames.add({ name: parts[1], type: "number" });
        vname.add(parts[1]);
        continue;
      }
      if (parts[0] === "email") {
        if (vname.has(parts[1])) continue;
        variableNames.add({ name: parts[1], type: "email" });
        vname.add(parts[1]);
        continue;
      }
      if (parts[0] === "number") {
        if (vname.has(parts[1])) continue;
        variableNames.add({ name: parts[1], type: "number" });
        vname.add(parts[1]);
        continue;
      }

      if (parts[0] === "date") {
        if (vname.has(parts[1])) continue;
        variableNames.add({ name: parts[1], type: "date" });
        vname.add(parts[1]);
        continue;
      }

      if (parts[0] === "email") {
        if (vname.has(parts[1])) continue;
        variableNames.add({ name: parts[1], type: "email" });
        vname.add(parts[1]);
        continue;
      }

      if (loopStart) {
        if (vname.has(parts[0])) continue;
        variableNames.add({ name: parts[0], type: "loop", head: loopHead });
        vname.add(parts[0]);
      } else {
        if (vname.has(parts[0])) continue;
        variableNames.add({ name: parts[0], type: "variable" });
        vname.add(parts[0]);
      }
    }
    return Array.from(variableNames);
  }

  const variableNames = extractVariableNames(htmlContent);
  console.log(variableNames);
  const container = document.querySelector(".container2");
  container.className = "overflow-y-auto";
  container.innerHTML = "";
  const child = document.createElement("div");
  child.className = "overflow-y-auto";
  const el = container.appendChild(child);

  console.log(variableNames, "variable are ");

  variableNames.map((item) => {
    if (item.type === "image") {
      let el = container.appendChild(document.createElement("div"));
      el.innerHTML += imageElement(item.name);
    }
    if (item.type === "variable") {
      let el = container.appendChild(document.createElement("div"));
      el.innerHTML += selectElement(item.name);
    }

    if (item.type === "loop") {
      let el = container.appendChild(document.createElement("div"));
      el.innerHTML += loopElement(item.name, item.head);
    }
    if (item.type === "email") {
      let el = container.appendChild(document.createElement("div"));
      el.innerHTML += emailElement(item.name);
    }
    if (item.type === "number") {
      let el = container.appendChild(document.createElement("div"));
      el.innerHTML += numberElement(item.name);
    }
    if (item.type === "link") {
      let el = container.appendChild(document.createElement("div"));
      el.innerHTML += linkElement(item.name);
    }
    if (item.type === "date") {
      let el = container.appendChild(document.createElement("div"));
      el.innerHTML += dateElement(item.name);
    }
  });

  const hasEmailVariable = variableNames.some((item) => item.type === "email");
  if (!hasEmailVariable) {
    let el = container.appendChild(document.createElement("div"));
    el.innerHTML += emailElement("Email");
  }
  const hasNameVariable = variableNames.some((item) => item.type === "Name");
  if (!hasEmailVariable) {
    let el = container.appendChild(document.createElement("div"));
    el.innerHTML += selectElement("Name");
  }

  if (document.getElementById("firstname")) {
    document.getElementById("firstname").value = result?.first_name || "";
  }
  if (document.getElementById("Email")) {
    document.getElementById("Email").value = result?.email || "";
  }
  if (document.getElementById("Name")) {
    document.getElementById("Name").value =
      result?.first_name + result?.last_name || "";
  }
  if (document.getElementById("lastname")) {
    document.getElementById("lastname").value = result?.last_name || "";
  }
  if (document.getElementById("employeecode")) {
    document.getElementById("employeecode").value = result?.employee_code || "";
  }
  if (document.getElementById("mobilenumber")) {
    document.getElementById("mobilenumber").value = result?.mobile_number || "";
  }
  if (document.getElementById("employmenttype")) {
    document.getElementById("employmenttype").value =
      result?.employment_type || "";
  }
  if (document.getElementById("businessunit")) {
    document.getElementById("businessunit").value = result?.business_unit || "";
  }
  if (document.getElementById("department")) {
    document.getElementById("department").value = result?.department || "";
  }
  if (document.getElementById("subdepartment")) {
    document.getElementById("subdepartment").value =
      result?.subdepartment || "";
  }
  if (document.getElementById("region")) {
    document.getElementById("region").value = result?.region || "";
  }
  if (document.getElementById("branch")) {
    document.getElementById("branch").value = result?.branch || "";
  }
  if (document.getElementById("designation")) {
    document.getElementById("designation").value = result?.designation || "";
  }
  if (document.getElementById("Email")) {
    document.getElementById("Email").value = result?.email || "";
  }

  console.log(
    "docsadada",
    document.getElementById("container2").querySelectorAll("input")
  );

  document
    .getElementById("container2")
    .querySelectorAll("input")
    .forEach((item) => {
      item.addEventListener("change", () => {
        console.log("changes");
        console.log("changes happened");
        const inputs = document
          .getElementById("container2")
          .querySelectorAll("input");
        const values = {};
        console.log(inputs);
        inputs.forEach((input) => {
          values[input.id] = input.value;
          if (input.id === "Email") {
            console.log("this is email", input.value);
            email = input.value;
            recipientEmail = email;
          }
          if (input.id === "Name") {
            recipientName = input.value;
            console.log("recipient name is", recipientName);
          }
        });
        var template = Handlebars.compile(htmlData);
        // Handlebars.registerHelper("image", function (context) {
        //   var result = `<img src="${context}"  class="object-cover h-48 w-48">`;
        //   return new Handlebars.SafeString(result);
        // });

        // const element=document.createElement('div');
        // element.innerHTML=template({...values});
        // console.log(template({...values}));
        console.log({ ...values });
        const newValues = {};

        Object.keys(values).forEach((key) => {
          if (values[key] === "") {
            newValues[key] = `{{${key}}}`;
          } else {
            newValues[key] = values[key];
          }
        });
        console.log(newValues);
        document.getElementById("container").innerHTML = template({
          ...newValues,
        });
        // document.querySelector('.container').appendChild(element);

        // Object.keys(values).forEach((key) => {
        //   document.getElementById(key).value = values[key];
        // });
      });
    });
};
Handlebars.registerHelper("number", function (astring) {
  return astring;
});
Handlebars.registerHelper("link", function (context) {
  var result = `<a href="${context}" class="text-blue-500">${context}</a>`;
  return new Handlebars.SafeString(result);
});
Handlebars.registerHelper("date", function (astring) {
  return astring;
});
Handlebars.registerHelper("email", function (context) {
  var result = `<a href="mailto:${context}" class="text-blue-500">${context}</a>`;
  return new Handlebars.SafeString(result);
});

document
  .getElementById("letterform")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const res = await saveAsDraft();
    setTimeout(() => {
      window.location.href = "http://ipvms.exitest.com/letters";
    }, 3000);
  });
document
  .getElementById("saveasdraft")
  .addEventListener("click", async (event) => {
    document.getElementById("submitBtn").click();
  });
const saveAsDraft = async () => {
  const htmlData1 = document.querySelector(".container").innerHTML;
  // console.log("html data is", htmlData1);
  console.log("recipient name is", recipientName);
  console.log("recipient email is", recipientEmail);

  try {
    const res = await axios.post(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/saveLetter",
      {
        html_data: htmlData1,
        templateId: templateId,
        recipientId: recipientId,
        createdby: ipvmsuserId,
        email: recipientEmail,
        name: recipientName,
      }
    );
    if (res) {
      Toastify({
        text: "Letter save as draft success",
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
    }
  } catch (error) {
    Toastify({
      text: "Some error occured",
      duration: 3000,
      newWindow: true,
      className: "text-red",
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "white",
      },
    }).showToast();
  }
};

const handleGeneratePdf = async () => {
  showLoading();
  var element = document.getElementById("container");
  var opt = {
    margin: 0,
    filename: "Contrato.pdf",
    image: {
      type: "",
      quality: 0.98,
    },
    html2canvas: {
      scale: 2,
      letterRendering: true,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: "avoid-all", after: "section" },
  };
  const pdfBlob = await html2pdf().from(element).output("blob");
  const formData = new FormData();
  let letterId;
  console.log(email);
  const fileName = "pdfsend" + Date.now() + ".pdf";
  formData.append("file", pdfBlob, fileName);
  formData.append("userId", recipientId);
  formData.append("templateId", templateId);
  formData.append("email", "tapasviarora2002@gmail.com");
  formData.append("html_data", element.innerHTML.toString());
  formData.append("letter_id", letterId);
  formData.append("ipvms_userId", ipvmsuserId);
  try {
    const response = await axios.post(
      API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/uploadLetter",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    Toastify({
      text: "Letter send succesfully",
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
    if (response.status == 200) {
      setTimeout(() => {
        window.location.href = "http://ipvms.exitest.com/letters";
      }, 3000);
    }
  } catch (error) {
    Toastify({
      text: "Some error occured",
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
    setTimeout(() => {
      window.location.href = "http://ipvms.exitest.com/letters";
    }, 2000);
  } finally {
    removeLoading();
  }
};

//loader
const showLoading = () => {
  const loading = document.createElement("div");
  loading.id = "loadingicon";
  loading.innerHTML = `<div id="loading"  >
<div id="overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.8); z-index: 1000;">
<div class="flex gap-2 justify-center items-center h-screen">
<div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
<div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
<div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
</div>
</div>  
</div>`;
  document.body.appendChild(loading);
};
const removeLoading = () => {
  const loadingElement = document.getElementById("loadingicon");
  if (loadingElement) {
    loadingElement.remove();
  }
};
var shouldBeSigned = false;
const handleSignSwiftCall = async () => {
  showLoading();
  var element = document.getElementById("container");
  var opt = {
    margin: 0,
    filename: "Contrato.pdf",
    image: {
      type: "",
      quality: 0.98,
    },
    html2canvas: {
      scale: 2,
      letterRendering: true,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: "avoid-all", after: "section" },
  };
  let letterId;
  const pdfBlob = await html2pdf().from(element).output("blob");
  const formData = new FormData();
  const fileName = "pdfFile" + Date.now() + ".pdf";
  formData.append("file", pdfBlob, fileName);
  const fileUpload = await axios.post(
    API_CONSTANTS.BACKEND_BASE_URL_PROD + "/api/file/upload/letterpdf",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const ShareLink = fileUpload.data.url;
  const email = localStorage.getItem("email");
  if (fileUpload) {
    fetch("https://ex-sign-swift.vercel.app/api/users/findUser", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        if (data.status == 500) {
          console.log("first log in sign swift");
          removeLoading();
          Toastify({
            text: "Make a account in signwift first",
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
          document.getElementById("loginError").classList.remove("hidden");
        } else {
          console.log("data", data);
          const signSwiftId = data.user.customerId;
          fetch(
            "https://ex-sign-swift.vercel.app/api/document/uploadDocument",
            {
              method: "POST",
              body: JSON.stringify({
                userId: data.user.customerId,
                ShareLink: ShareLink,
                title: title,
              }),
              mode: "cors",
            }
          )
            .then((response) => response.json())
            .then(async (data) => {
              removeLoading();
              const docId = data.document.id;
              if (docId) {
                //draft->pending
                const data1 = await axios.post(
                  API_CONSTANTS.BACKEND_BASE_URL_PROD +
                    "/api/file/upload/updateLetterStatus",
                  {
                    letterId: letterId,
                    htmlData: element.innerHTML,
                    recipientId: recipientId,
                    createdBy: ipvmsuserId,
                    templateId: templateId,
                    email: recipientEmail,
                    name: recipientName,
                    fileName: fileName,
                    swift_id: docId,
                  }
                );
                console.log("data is data1", data1);
                if (data1?.data?.success) {
                  console.log("upload doc  is", data);
                  //error upload doc
                  if (data.status !== 201) {
                    document
                      .getElementById("uploadError")
                      .classList.remove("hidden");
                  } else {
                    console.log("success");
                    document
                      .getElementById("uploadSuccess")
                      .classList.remove("hidden");
                    Toastify({
                      text: "Redirecting to sign swift",
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
                    setTimeout(() => {
                      window.location.href = `https://ex-sign-swift.vercel.app/user/${signSwiftId}/document/${docId}/step1`;
                    }, 2000);
                  }
                }
              }
            });
        }
      });
  }
};

document.getElementById("sendButton").addEventListener("click", function () {
  // document.getElementById("submitBtn").click();
  var form = document.getElementById("letterform");
  var inputs = form.querySelectorAll("input"),
    wasFilled = true;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type !== "checkbox") {
      if (!inputs[i].value.trim()) {
        Toastify({
          text: "Fill the form first",
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
        inputs[i].focus();
        wasFilled = false;
        break;
      }
    }
  }
  if (wasFilled) {
    const modal = document.getElementById("confirmModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
});

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("uploadError").classList.add("hidden");

    const signMessage = document.getElementById("signMessage");
    signMessage.classList.remove("hidden");
  });

document.getElementById("cancelSend").addEventListener("click", function () {
  const modal = document.getElementById("confirmModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.getElementById("loginError").classList.add("hidden");
  document.getElementById("uploadError").classList.add("hidden");
  document.getElementById("successError").classList.add("hidden");
  const signMessage = document.getElementById("signMessage");
  signMessage.classList.remove("hidden");
});
document.getElementById("sendLetter").addEventListener("click", function () {
  const modal = document.getElementById("confirmModal");

  if (!shouldBeSigned) {
    handleGeneratePdf();
  } else {
    handleSignSwiftCall();
  }

  // window.location.href = "http://ipvms.exitest.com/letters";
});
document.getElementById("signCheckbox").addEventListener("change", function () {
  const signMessage = document.getElementById("signMessage");

  if (this.checked) {
    signMessage.classList.remove("hidden");
    shouldBeSigned = true;
  } else {
    signMessage.classList.add("hidden");
    shouldBeSigned = false;
  }
});

// pdf generate function

window.onclick = function (event) {
  const modal = document.getElementById("confirmModal");
  if (event.target == modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("uploadError").classList.add("hidden");

    const signMessage = document.getElementById("signMessage");
    signMessage.classList.remove("hidden");
  }
};
