import { CreatePolicy } from "../api/createpolicy.js";
import { GetAllCategory } from "../api/getAllCategories.js";
import { renderDocx } from "./docxtohtml.js";
var catId = 1;
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
document.getElementById("uploadFile").addEventListener("click", () => {
  console.log("upload");
  handleUpload();
});
const handleUpload = async () => {
  console.log("uploadd");
  const file = document.getElementById("file-upload").files[0];
  console.log(file, "files");
  const title = document.getElementById("title").value;

  var resHtml = await renderDocx(file, "container-html1");

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
        var blob = await fetch(img.src).then((response) => response.blob());

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
  const containerdocx = document.getElementsByClassName("docx-wrapper")[0];
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
  resHtml = devDiv.innerHTML;

  console.log(devDiv, "ggg");
  // dummy value
  //   const categoryId = 1;
  const htmlJson = extractHtmlToJson(
    document.getElementsByClassName("docx-wrapper")[0]
  );
  console.log(resHtml, htmlJson, catId, title);
  await CreatePolicy(resHtml, htmlJson, catId, title);
  console.log("results");
};
document.addEventListener("DOMContentLoaded", async () => {
  const category = await GetAllCategory();
  const categoryElement = document.getElementById("category");
  categoryElement.innerHTML = "";
  const categoryId = document.getElementById("category");
  categoryId.addEventListener("change", () => {
    catId = categoryId.options[categoryId.selectedIndex].id;
  });

  category.data.map((item) => {
    categoryElement.innerHTML += `<option id=${item.id}>${item.category}</option>`;
  });
  console.log(category);
});
