const makeForm = () => {
  const htmlContent = document.getElementById("container").innerHTML;
  const handlebarsRegex = /\{\{([^{}]+)\}\}/g;
  //extarction logic

  const selectElement = (title) => {
    return `<div class="inline-block relative w-96 px-2">
            <h1>${title}</h1>
            <input onchange="handleSubmit()" id=${title} class="appearance-none block w-full bg-white  rounded-md    border-2 border-gray-200 text-gray-700   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
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
          <input onchange="handleSubmit()" id="${title}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
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
  const el = container.appendChild(document.createElement("div"));
  el.style.border = "1px solid red";
  console.log(variableNames);

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
};
