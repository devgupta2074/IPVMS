import { InsertNavbar } from "../components/Navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  InsertNavbar();
});

var title;
var htmlData;
var email;
var category;
var recepientId;
var templateId;
var description;
var result2;
var shouldBeSigned = false;
var loading = false;

const getTemplate = (id, recepientId) => {
  console.log("in get temo id is", id);

  const getTemplatedoc = async (id) => {
    console.log("in get temo id in getTempdox is", id);
    const response = await fetch(
      `http://127.0.0.1:5001/api/file/getTemplateById/${id}`,
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
  const getUserDetails = async (recepientId) => {
    console.log("in user deatil user id is", recepientId);
    const response = await fetch(
      `http://localhost:5001/api/user/getUserInfo/${recepientId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data.data;
        result2 = result;
        // Handle the response from the backend
        console.log(result, "user details are");
        getTemplatedoc(id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  getUserDetails(recepientId);
};

document.addEventListener("DOMContentLoaded", function (event) {
  const url = window.location.href;
  console.log("URL:", url);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams);
  const id = urlParams.get("templateId");
  templateId = id;
  recepientId = urlParams.get("userId");
  console.log("user id is", recepientId);
  getTemplate(id, recepientId);
  // document
  //   .getElementById("generate")
  //   .addEventListener("click", async () => {
  //     showLoading();
  //     await handleGeneratePdf();
  //     removeLoading();
  //   });
});

export const makeForm = (result) => {
  const htmlContent = document.getElementById("container").innerHTML;
  console.log("html content is", htmlContent);
  const handlebarsRegex = /\{\{([^{}]+)\}\}/g;
  //extarction logic

  const selectElement = (title) => {
    if (title === "employee_code" || title === "mobile_number") {
      return numberElement(title);
    }
    return `<div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${title}</label>
    <input type="text"  id=${title} id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="${title}" required />
 </div>`;
  };
  const emailElement = (title) => {
    return `<div>
      <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${title}</label>
      <input onchange="handleSubmit()" type="url" id=${title} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
      </div>`;
  };
  const numberElement = (title) => {
    return `<div>
      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${title}</label>
      <input  onchange="handleSubmit()" type="number" id=${title} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" maxlength="10"   required />
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
        <input onchange="handleSubmit()" id="${title}" type="file" />
        <img  id="${title}image" class="object-cover h-20 w-40" alt="image">
    </div>
    </div>`;
  };
  const dateElement = (title) => {
    return `
      <div class="relative max-w-sm">
    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
      </svg>
    </div>
    <input onchange="handleSubmit()" datepicker type="text" id=${title} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
  </div>
      `;
  };

  const linkElement = (title) => {
    return `<div>
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            ${title}
          </label>
          <input onchange="handleSubmit()" id="${title}" class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
          </div>`;
  };
  const loopElement = (name, head) => {
    return `<div class="w-15" >
    <h1>
    ${head}
    </h1>
    <div class="flex flex-row gap-5 items-center justify-center">
    <input onchange="handleSubmit()" placeholder="${name}"
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

  console.log(result.first_name, "first name is");
  if (document.getElementById("firstname")) {
    document.getElementById("firstname").value = result.first_name || "";
  }
  if (document.getElementById("email")) {
    document.getElementById("email").value = result.email || "";
  }
  if (document.getElementById("last_name")) {
    document.getElementById("last_name").value = result.last_name || "";
  }
  if (document.getElementById("employee_code")) {
    document.getElementById("employee_code").value = result.employee_code || "";
  }
  if (document.getElementById("mobile_number")) {
    document.getElementById("mobile_number").value = result.mobile_number || "";
  }
  if (document.getElementById("employment_type")) {
    document.getElementById("employment_type").value =
      result.employment_type || "";
  }
  if (document.getElementById("business_unit")) {
    document.getElementById("business_unit").value = result.business_unit || "";
  }
  if (document.getElementById("department")) {
    document.getElementById("department").value = result.department || "";
  }
  if (document.getElementById("subdepartment")) {
    document.getElementById("subdepartment").value = result.subdepartment || "";
  }
  if (document.getElementById("region")) {
    document.getElementById("region").value = result.region || "";
  }
  if (document.getElementById("branch")) {
    document.getElementById("branch").value = result.branch || "";
  }
  if (document.getElementById("designation")) {
    document.getElementById("designation").value = result.designation || "";
  }
  document.querySelectorAll(".container2 input").forEach((item) => {
    item.addEventListener("change", () => {
      console.log("changes");
      const inputs = document.querySelectorAll(".container2 input");
      const values = {};
      console.log(inputs);
      inputs.forEach((input) => {
        values[input.id] = input.value;
        if (input.id === "Email") {
          email = input.value;
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

  //manager??
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
document.getElementById("saveasdraft").addEventListener("click", async () => {
  const res = await saveAsDraft();
  console.log(res, "save as draft status");
  if (res) {
    window.location.href = "http://localhost:5555/letters";
  }
});
const saveAsDraft = async () => {
  const htmlData1 = document.querySelector(".container").innerHTML;
  // console.log("html data is", htmlData1);
  try {
    const res = await axios.post("http://localhost:5001/api/file/saveLetter", {
      html_data: htmlData1,
      templateId: templateId,
      recepientId: recepientId,
    });
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

  // const pdfBlob = await html2pdf()
  //   .from(element)
  //   .set(opt)
  //   .outputPdf()
  //   .then((pdf) => {
  //     return new Blob([pdf], { type: "application/pdf" });
  //   });
  const formData = new FormData();
  let letterId;
  console.log(email);
  formData.append("file", pdfBlob);
  formData.append("userId", 20);
  formData.append("templateId", 23);
  formData.append("email", "tapasviarora2002@gmail.com");
  formData.append("html_data", element.innerHTML.toString());
  formData.append("letter_id", letterId);

  try {
    const response = await axios.post(
      "http://localhost:5001/api/file/uploadLetter",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status == 200) {
      window.location.href = "http://localhost:5555/letters";
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

var shouldBeSigned = false;
const handleSignSwiftCall = async () => {
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
  const fileName = "pdfFile";
  formData.append("file", pdfBlob, fileName);
  const fileUpload = await axios.post(
    "http://localhost:5001/api/file/upload/letterpdf",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const ShareLink = fileUpload.data.url;
  if (ShareLink) {
    //draft->pending
    await axios.post(
      "http://localhost:5001/api/file/upload/updateLetterStatus",
      {
        ShareLink: ShareLink,
        letterId: letterId,
        htmlData: element.innerHTML,
        recepientId: recepientId,
      }
    );
  }
  const email = "tarora@ex2india.com";
  const username = "Tapasvi";
  if (fileUpload) {
    fetch("http://localhost:3000/api/users/findUser", {
      method: "POST",
      body: JSON.stringify({
        name: username,
        email: email,
        id: userId,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        if (data.status == 500) {
          console.log("first log in sign swift");
          document.getElementById("loginError").classList.remove("hidden");
          //error
        } else {
          console.log("data", data);
          fetch("http://localhost:3000/api/document/uploadDocument", {
            method: "POST",
            body: JSON.stringify({
              userId: data.user.customerId,
              ShareLink: ShareLink,
            }),
            mode: "cors",
          })
            .then((response) => response.json())
            .then((data) => {
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
              }
            });
        }
      });
  }
};

document.getElementById("sendButton").addEventListener("click", function () {
  const modal = document.getElementById("confirmModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("uploadError").classList.add("hidden");
    document.getElementById("successError").classList.add("hidden");
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

  // window.location.href = "http://localhost:5555/letters";
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
    document.getElementById("successError").classList.add("hidden");
    const signMessage = document.getElementById("signMessage");
    signMessage.classList.remove("hidden");
  }
};
