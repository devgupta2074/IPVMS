import { UserInfoApiRequest } from "../api/dashboard.js";
import {
  API_CONSTANTS,
  ROUTES_CONSTANTS,
  style,
  VIEWS_CONSTANTS,
} from "../utils/constants.js";

import { redirect } from "../utils/utils.js";

let imagesposition = [];
let userdata;

let htmljson;

let savedRange;

document
  .getElementById("container-content-1")
  .addEventListener("mouseup", saveCaretPosition);
document
  .getElementById("container-content-1")
  .addEventListener("keyup", saveCaretPosition);
document
  .getElementById("container-content-1")
  .addEventListener("focus", saveCaretPosition);
if (document.getElementById("uploadButton")) {
  document
    .getElementById("uploadButton")
    .addEventListener("click", function () {
      document.getElementById("imageUpload").click();
    });

  document
    .getElementById("imageUpload")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.style.maxWidth = "100%";

          insertImageAtCaret(img);
        };
        reader.readAsDataURL(file);
      }
    });
}

export function saveCaretPosition() {
  const sel = window.getSelection();
  if (sel.rangeCount > 0) {
    savedRange = sel.getRangeAt(0);
  }
}

export function insertImageAtCaret(img) {
  if (savedRange) {
    const range = savedRange.cloneRange();
    range.deleteContents();

    const frag = document.createDocumentFragment();
    frag.appendChild(img);

    const node = frag.firstChild;
    range.insertNode(frag);

    if (node) {
      range.setStartAfter(node);
      range.collapse(true);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  } else {
    document.getElementById("editableDiv").appendChild(img);
  }
}

export function extractParentText(parentId) {
  console.log("Extracting parent", parentId);
  const parentElement = document.getElementById(parentId);
  // console.log(parentId);
  let textContent = "";
  if (parentElement) {
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
  } else {
    textContent = "";
  }

  // Iterate over child nodes

  return textContent;
}
export async function createversion() {
  console.log("ffff create version");

  const modalid = localStorage.getItem("modalId");
  ////  document.getElementById("loading").style = "display:block";
  async function detectChanges(divElement) {
    const jsonResult = JSON.parse(localStorage.getItem("htmljson"));
    console.log(divElement, "ffff", jsonResult);
    const articles = divElement.querySelectorAll("article");
    console.log(articles.length, "articcle length");
    if (articles.length > 1) {
      // checkDivSizeBack();
      removeEmptyPages();
    }
    handleChanges();
    assignIDsToElements();
    const changes = {
      changedTags: [],
      newTags: [],
      removedTags: [],
      imageTags: [],
    };

    const dynamicImages = document
      .getElementById("docx-wrapper-1")
      .getElementsByTagName("img");
    const blobToBase64 = (blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    };
    for (let h = 0; h < dynamicImages.length; h++) {
      const image = dynamicImages[h];
      var blob = await fetch(image.src).then((response) => response.blob());

      // Convert blob to base64
      var base64 = await blobToBase64(blob);

      const gh = {
        x2: image.offsetLeft,
        y2: image.offsetTop,
        width: image.offsetWidth,
        height: image.offsetHeight,
        style: image.style.cssText,
        src: base64,
        id: image.id,
        parent: image.parentElement.parentElement.id,
      };
      changes.imageTags.push(gh);
    }

    console.log(document.getElementById("docx-wrapper-1"));
    const htmlTags = document
      .getElementById("docx-wrapper-1")
      .getElementsByTagName("*");
    console.log(htmlTags, "rr");

    for (let i = 0; i < htmlTags.length; i++) {
      const tag = htmlTags[i];
      const tagId = tag.id;
      const isImgTag = tag.tagName.toLowerCase() === "img";
      const isLinkTag = tag.tagName.toLowerCase() === "a";
      const tagInfo = jsonResult[tagId];

      if (!tagInfo) {
        // if (tag.children.length === 0) {
        console.log("here");
        console.log(tag);
        // New tag found
        const parentId = tag.parentElement.id || "docx-wrapper-1";
        const parenttag = document.getElementById(tag.parentElement.id);
        console.log(tag.parentElement);
        let position = -1;
        let childnodeposition = -1;
        if (tag.parentElement != null) {
          const childrens = tag.parentElement.children;
          const childnodes = tag.parentElement.childNodes;
          // Default position if tag is not found in its parent's children list

          // Find the position of the tag within its parent's children
          if (childrens) {
            for (let j = 0; j < childrens.length; j++) {
              if (childrens[j] === tag) {
                position = j;
                break;
              }
            }
          }
          if (childnodes) {
            for (let j = 0; j < childnodes.length; j++) {
              if (childnodes[j] === tag) {
                childnodeposition = j;
                break;
              }
            }
          }
        }
        let textbefore;
        let textafter;
        console.log(tag.parentElement, "hello world!");
        if (tag.parentElement && tag.parentElement.childNodes) {
          console.log("hello world!");
          textbefore =
            childnodeposition - 1 >= 0
              ? tag.parentElement.childNodes[childnodeposition - 1].nodeValue
              : null;
          textafter =
            childnodeposition + 1 < tag.parentElement.childNodes.length
              ? tag.parentElement.childNodes[childnodeposition + 1].nodeValue
              : null;
        }
        console.log(tag.children, "hello hello");
        const childElements = tag.children;
        const childIds = [];

        for (let i = 0; i < childElements.length; i++) {
          const childId = childElements[i].id;
          if (childId) {
            childIds.push(childId);
          }
        }

        const newTag = {
          id: tagId,
          parentId: parentId,
          tagName: tag.tagName.toLowerCase(),
          textContent: extractParentText(tagId),
          class: tag.getAttribute("class") || "",
          style: tag.getAttribute("style") || "",
          isTagImg: isImgTag,
          position: position,
          textafter: textafter || "",
          textbefore: textbefore || "",
          className: tag.className || "",
          isTagLink: isLinkTag,
          src: isImgTag ? tag.getAttribute("src") : "",
          children: childIds,
          color: tag.getAttribute("color") || "",
          size: tag.getAttribute("size") || "",
          face: tag.getAttribute("face") || "",

          childnodeposition: childnodeposition,
        };
        changes.newTags.push(newTag);
      } else {
        // Check for changes in text style or image source
        if (
          tag.children.length === 0 &&
          tag.tagName.toLowerCase() !== "style"
        ) {
          if (tagInfo.textContent !== extractParentText(tag.id)) {
            changes.changedTags.push({
              id: tagId,
              textContent: extractParentText(tag.id),
            });
          }
          if (tagInfo.style !== tag.getAttribute("style")) {
            changes.changedTags.push({
              id: tagId,
              style: tag.getAttribute("style") || "",
            });
          }
          if (tagInfo.isTagImg && tagInfo.src !== tag.getAttribute("src")) {
            changes.changedTags.push({
              id: tagId,
              src: isImgTag ? tag.getAttribute("src") : "",
            });
          }
        }
      }
    }
    var keys = Object.keys(jsonResult);
    console.log(jsonResult);
    console.log(keys);
    keys.forEach(function (key) {
      if (jsonResult.hasOwnProperty(key)) {
        console.log(key, "fff");
        if (key !== "" && !divElement.querySelector(`#${key}`)) {
          changes.removedTags.push(key);
        }
      }
    });
    // for (var tagId in jsonResult) {
    //   console.log(tagId);
    //   if (jsonResult.hasOwnProperty(tagId)) {
    //     console.log(tagId, "fff");
    //     if (!divElement.querySelector(`#${tagId}`)) {
    //       changes.removedTags.push(tagId);
    //     }
    //   }
    // }
    console.log(changes, "changes x");

    return {
      doc_id: modalid,
      created_by: userdata.id,
      delta: changes,
    };
  }

  const divElement = document.getElementById("docx-wrapper-1");
  let version = parseInt(localStorage.getItem("version"));
  console.log("divElement: " + divElement);
  const changes = await detectChanges(divElement);
  console.log(changes, "second changes");
  return changes;
}
export function isIdInJson(id, json, tagName) {
  for (let i = 0; i < json.length; i++) {
    if (tagName == "tbody") {
      return true;
    }
    if (tagName == "b") {
      return false;
    }
    if (json[i]["id"] === id) {
      return true;
    }
  }
  return false;
}
export function findWordDifference(text1, text2, style) {
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);
  const maxLength = Math.max(words1.length, words2.length);
  let difference = "";
  let changedgreen = "";
  let changedred = "";
  for (let i = 0; i < maxLength; i++) {
    if (words1[i] !== words2[i]) {
      console.log(words1[i] + " " + words2[i]);
      if (words1[i] !== undefined) {
        changedgreen += words1[i] + " "; // Add space here
      }
      if (words2[i] !== undefined) {
        changedred += words2[i] + " "; // Add space here
      }
    } else {
      console.log(changedgreen + " " + changedred, "hello dhee", style);
      if (changedgreen !== "") {
        difference += `<s style="background-color: #ffaaaa">${changedgreen}</s>`;
        changedgreen = "";
      }
      if (changedred !== "") {
        difference += `<span style="background-color: #aaffaa !important; ${style}">${changedred}</span>`;
        changedred = "";
      }
      difference += words1[i] || "";
    }

    difference += " "; // Add space here
  }
  difference = difference.trimEnd();

  if (changedgreen !== "") {
    difference += `<s style="background-color: #ffaaaa">${changedgreen}</s>`;
    changedgreen = "";
  }
  if (changedred !== "") {
    difference += `<span style="background-color: #aaffaa !important; ${style}">${changedred}</span>`;
    changedred = "";
  }
  console.log(difference, "hello archit");
  return difference; // Trim extra spaces
}
async function applyChangesFromV2toV1(id, callback) {
  console.log(id, "");
  const response2 = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getFile/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data.data);
      document.getElementById("docx-wrapper-1").innerHTML = data.data.data;
      htmljson = data.data.htmljson;
    });
  imageLoaded();
  callback();
}

export function applyChangesFromV1toV2withouthighlight(
  divElement,
  v1,
  v2,
  firstv
) {
  for (const tagid in v2.newTags) {
    console.log(tagid, "newtags");
    console.log(v2.newTags[tagid], "tapasvai");
    console.log(
      !isIdInJson(
        v2.newTags[tagid].id,
        firstv.newTags,
        v2.newTags[tagid].tagName
      ),
      "isid"
    );

    if (v2.newTags[tagid]) {
      // console.log(`#${v2.newTags[tagid].parentId}`);
      const tag = document.getElementById(v2.newTags[tagid].parentId);
      var childElement = document.createElement(v2.newTags[tagid].tagName);
      childElement.textContent = v2.newTags[tagid].textContent;
      console.log(childElement.textContent);
      childElement.style = v2.newTags[tagid].style;
      childElement.className = v2.newTags[tagid].class;
      console.log(v2.newTags[tagid].textContent, "textContent");

      childElement.id = v2.newTags[tagid].id;
      childElement.color = v2.newTags[tagid].color;
      childElement.size = v2.newTags[tagid].size;
      childElement.face = v2.newTags[tagid].face;
      // childElement.children = v2.newTags[tagid].children;
      console.log("eye", v2.newTags[tagid].children);
      if (v2.newTags[tagid].children.length > 0) {
        for (var i = 0; i < v2.newTags[tagid].children.length; i++) {
          const child = document.getElementById(v2.newTags[tagid].children[i]);
          if (child) {
            const x = child;
            child.remove();
            childElement.appendChild(x);
            console.log("eye", child);
          }
        }
      }
      console.log(tag);
      console.log(v2.newTags[tagid].parentId);
      const children = tag.childNodes;
      const position = v2.newTags[tagid].childnodeposition;
      console.log(tag);
      console.log(childElement);
      console.log(
        "position",
        position,
        children,
        children.length,
        position >= 0 && position <= children.length,
        childElement,
        "ipvms"
      );
      if (position == 0 && children.length == 1 && children[0].nodeType == 3) {
        const newtext = children[0].textContent
          .replace(childElement.textContent, "")
          .replace(v2.newTags[tagid].textbefore, "");
        const newchildbefore = document.createTextNode(
          v2.newTags[tagid].textbefore
        );
        tag.insertBefore(newchildbefore, children[0]);
        tag.removeChild(children[1]);
        children[0].nodeValue = newtext;
        console.log(children, "exsq");
      } else {
        if (position > children.length) {
          console.log("archit");
          if (
            tag.childNodes.length > 0 &&
            tag.childNodes[children.length - 2] &&
            tag.childNodes[children.length - 2].nodeName === "#text"
          ) {
            console.log(v2.newTags[tagid]);
            let newtext = children[children.length - 2].nodeValue.replace(
              childElement.textContent,
              ""
            );

            newtext = newtext.replace(v2.newTags[tagid].textbefore, "");
            console.log(newtext, "vvv");
            const newchildbefore = document.createTextNode(
              v2.newTags[tagid].textbefore
            );
            const newchildafter = document.createTextNode(
              v2.newTags[tagid].textafter
            );
            console.log(newchildafter, newchildbefore);
            tag.insertBefore(newchildbefore, children[children.length - 1]);
            tag.insertBefore(newchildafter, children[children.length - 1]);

            // children[0].nodeValue = newtext;
            tag.removeChild(children[position - 1]);
            console.log(children, "exsq");
          } else {
            tag.appendChild(childElement);
          }
        } else if (position - 1 > 0 && position + 1 < children.length) {
          if (
            tag.childNodes[position - 1].nodeName === "#text" &&
            tag.childNodes[position + 1].nodeName === "#text"
          ) {
            tag.removeChild(tag.childNodes[position]);
            console.log("yeeeeeee");
          }
        } else if (position + 1 <= children.length - 1) {
          if (tag.childNodes[position + 1].nodeName === "#text") {
            tag.removeChild(tag.childNodes[position]);
            console.log("yeeeeeee");
          }
        } else if (position - 1 > 0 || position == children.length) {
          console.log("vishal", tag.childNodes, "position", position);
          if (
            tag.childNodes.length > 0 &&
            tag.childNodes[position - 1].nodeName === "#text"
          ) {
            console.log(v2.newTags[tagid]);
            let newtext = children[position - 1].nodeValue.replace(
              childElement.textContent,
              ""
            );

            newtext = newtext.replace(v2.newTags[tagid].textbefore, "");
            console.log(newtext, "vvv");
            const newchildbefore = document.createTextNode(
              v2.newTags[tagid].textbefore
            );
            const newchildafter = document.createTextNode(
              v2.newTags[tagid].textafter
            );
            console.log(newchildafter, newchildbefore);
            tag.insertBefore(newchildbefore, children[position]);
            tag.insertBefore(newchildafter, children[position + 1]);

            // children[0].nodeValue = newtext;
            tag.removeChild(children[position - 1]);
            console.log(children, "exsq");
          } else {
            tag.appendChild(childElement);
          }
        } else if (position === children.length - 1) {
          tag.removeChild(tag.childNodes[position]);
          console.log("ye3");
        }
      }

      if (position >= 0 && position <= children.length) {
        console.log(position, children.length, tag.childNodes);
        if (position === children.length) {
          // If position is at the end, simply append the child
          tag.appendChild(childElement);
        } else {
          // Otherwise, insert the child before the element at the specified position
          // let sp2 = document.getElementById(children[childnodeposition].id);
          console.log("Inserting");
          tag.insertBefore(childElement, tag.childNodes[position]);
        }
      } else {
        tag.appendChild(childElement);
      }
    }
    console.log(
      childElement.childNodes,
      "childelement",
      isIdInJson(
        v2.newTags[tagid].id,
        firstv.newTags,
        v2.newTags[tagid].tagName
      ),
      childElement.childNodes,
      childElement.childNodes.length
    );
    if (
      isIdInJson(
        v2.newTags[tagid].id,
        firstv.newTags,
        v2.newTags[tagid].tagName
      ) == false &&
      childElement.childNodes &&
      childElement.childNodes.length > 0
    ) {
      // childElement.classList.add("greenhighlight");
    }
  }
  console.log(v1);

  for (const tagId in v2.changedTags) {
    console.log(tagId, "d");
    if (v2.changedTags[tagId].id) {
      const tagInfo = v2.changedTags[tagId];
      console.log(v2.changedTags[tagId].id);

      const tag = document.getElementById(v2.changedTags[tagId].id);

      console.log("tag: " + tag);
      if (!tag) continue;

      // Apply cges to text content and style
      if (tag) {
        if (
          isIdInJson(v2.changedTags[tagId].id, firstv.changedTags, "a") == false
        ) {
          console.log(v2.changedTags[tagId].textContent, "text text text");
          // tag.classList.add("bluehighlight");
        }
        if (v2.changedTags[tagId].style) {
          tag.style.cssText = v2.changedTags[tagId].style;
          // tag.classList.add("bluehighlight");
        }
        if (v2.changedTags[tagId].textContent) {
          console.log(
            v1[v2.changedTags[tagId].id].textContent.split(" ").length,
            v2.changedTags[tagId].textContent.split(" ").length,
            "hello tap",
            v1,
            v2.changedTags[tagId]
          );

          tag.textContent = v2.changedTags[tagId].textContent;
          console.log(tag.style.cssText);
          const style = tag.style.cssText;

          const difference = findWordDifference(
            v1[v2.changedTags[tagId].id].textContent,
            tag.textContent,
            style
          );
          console.log(
            "hello archit",
            tag,
            v1[v2.changedTags[tagId].id].textContent,
            tag.textContent,
            difference
          );

          // Highlight the differing part

          // tag.innerHTML = difference;
          tag.style = style;
        }

        tag.className = tag.className;
        console.log(tag);
      }

      // Apply changes to image source
      if (tagInfo.isTagImg && v2[tagId]) {
        tag.src = v2[tagId].src;
      }
    }
  }

  for (const tagid in v2.removedTags) {
    console.log(tagid, "removedtags");
    console.log(v1[v2.removedTags[tagid]]);

    if (v2.removedTags[tagid]) {
      const tag = document.getElementById(v1[v2.removedTags[tagid]].id);

      //  tag.parentElement.classList.add("redhighlight");
      console.log("tag: " + tag);
      if (tag) {
        if (
          isIdInJson(v2.removedTags[tagid].id, firstv.removedTags, "a") ==
          false &&
          tag.textContent !== ""
        ) {
          const removedelement = document.createElement("p");
          removedelement.classList.add("redhighlight");
          tag.parentElement.insertBefore(removedelement, tag);
          console.log(tag.id, "removed");
          console.log(tag.parentElement, "remove remove remove");
          console.log(v2.removedTags[tagid].textContent, "text text text");
          if (tag.parentElement.tagName.toLowerCase() !== "article") {
            tag.parentElement.classList.add("redhighlight");
          }
        }
        if (tag != null) {
          tag.remove();
        }
      } else {
      }
    }
  }
  for (const image in v2.imageTags) {
    console.log(v2.imageTags[image]);
    const tag = document.getElementById(v2.imageTags[image].id);
    if (!tag) {
      const parent = document.getElementById(v2.imageTags[image].parent);
      const img = document.createElement("img");
      img.src = v2.imageTags[image].src;
      img.style = v2.imageTags[image].style;
      img.id = v2.imageTags[image].id;
      img.width = v2.imageTags[image].width;
      img.height = v2.imageTags[image].height;
      img.style.left = v2.imageTags[image].x + "px";
      img.style.top = v2.imageTags[image].y + "px";
      parent.appendChild(img);
    } else {
      tag.src = v2.imageTags[image].src;
      tag.style = v2.imageTags[image].style;
      tag.id = v2.imageTags[image].id;
      tag.width = v2.imageTags[image].width;
      tag.height = v2.imageTags[image].height;
      tag.style.left = v2.imageTags[image].x + "px";
      tag.style.top = v2.imageTags[image].y + "px";
    }
  }
  //cc imageLoaded();
}
export function applyChangesFromV1toV2(divElement, v1, v2, firstv) {
  for (const tagid in v2.newTags) {
    console.log(tagid, "newtags");
    console.log(v2.newTags[tagid], "tapasvai");
    console.log(
      !isIdInJson(
        v2.newTags[tagid].id,
        firstv.newTags,
        v2.newTags[tagid].tagName
      ),
      "isid"
    );

    if (v2.newTags[tagid]) {
      // console.log(`#${v2.newTags[tagid].parentId}`);
      const tag = document.getElementById(v2.newTags[tagid].parentId);
      var childElement = document.createElement(v2.newTags[tagid].tagName);
      childElement.textContent = v2.newTags[tagid].textContent;
      console.log(childElement.textContent);
      childElement.style = v2.newTags[tagid].style;
      childElement.className = v2.newTags[tagid].class;
      console.log(v2.newTags[tagid].textContent, "textContent");

      childElement.id = v2.newTags[tagid].id;
      childElement.color = v2.newTags[tagid].color;
      childElement.size = v2.newTags[tagid].size;
      childElement.face = v2.newTags[tagid].face;
      // childElement.children = v2.newTags[tagid].children;
      console.log("eye", v2.newTags[tagid].children);
      if (v2.newTags[tagid].children.length > 0) {
        for (var i = 0; i < v2.newTags[tagid].children.length; i++) {
          const child = document.getElementById(v2.newTags[tagid].children[i]);
          if (child) {
            const x = child;
            child.remove();
            childElement.appendChild(x);
            console.log("eye", child);
          }
        }
      }
      console.log(tag);
      console.log(v2.newTags[tagid].parentId);
      const children = tag.childNodes;
      const position = v2.newTags[tagid].childnodeposition;
      console.log(tag);
      console.log(childElement);
      console.log(
        "position",
        position,
        children,
        children.length,
        position >= 0 && position <= children.length,
        childElement,
        "ipvms"
      );
      if (position == 0 && children.length == 1 && children[0].nodeType == 3) {
        const newtext = children[0].textContent
          .replace(childElement.textContent, "")
          .replace(v2.newTags[tagid].textbefore, "");
        const newchildbefore = document.createTextNode(
          v2.newTags[tagid].textbefore
        );
        tag.insertBefore(newchildbefore, children[0]);
        tag.removeChild(children[1]);
        children[0].nodeValue = newtext;
        console.log(children, "exsq");
      } else {
        if (position > children.length) {
          console.log("archit");
          if (
            tag.childNodes.length > 0 &&
            tag.childNodes[children.length - 2] &&
            tag.childNodes[children.length - 2].nodeName === "#text"
          ) {
            console.log(v2.newTags[tagid]);
            let newtext = children[children.length - 2].nodeValue.replace(
              childElement.textContent,
              ""
            );

            newtext = newtext.replace(v2.newTags[tagid].textbefore, "");
            console.log(newtext, "vvv");
            const newchildbefore = document.createTextNode(
              v2.newTags[tagid].textbefore
            );
            const newchildafter = document.createTextNode(
              v2.newTags[tagid].textafter
            );
            console.log(newchildafter, newchildbefore);
            tag.insertBefore(newchildbefore, children[children.length - 1]);
            tag.insertBefore(newchildafter, children[children.length - 1]);

            // children[0].nodeValue = newtext;
            tag.removeChild(children[position - 1]);
            console.log(children, "exsq");
          } else {
            tag.appendChild(childElement);
          }
        } else if (position - 1 > 0 && position + 1 < children.length) {
          if (
            tag.childNodes[position - 1].nodeName === "#text" &&
            tag.childNodes[position + 1].nodeName === "#text"
          ) {
            tag.removeChild(tag.childNodes[position]);
            console.log("yeeeeeee");
          }
        } else if (position + 1 <= children.length - 1) {
          if (tag.childNodes[position + 1].nodeName === "#text") {
            tag.removeChild(tag.childNodes[position]);
            console.log("yeeeeeee");
          }
        } else if (position - 1 > 0 || position == children.length) {
          console.log("vishal", tag.childNodes, "position", position);
          if (
            tag.childNodes.length > 0 &&
            tag.childNodes[position - 1].nodeName === "#text"
          ) {
            console.log(v2.newTags[tagid]);
            let newtext = children[position - 1].nodeValue.replace(
              childElement.textContent,
              ""
            );

            newtext = newtext.replace(v2.newTags[tagid].textbefore, "");
            console.log(newtext, "vvv");
            const newchildbefore = document.createTextNode(
              v2.newTags[tagid].textbefore
            );
            const newchildafter = document.createTextNode(
              v2.newTags[tagid].textafter
            );
            console.log(newchildafter, newchildbefore);
            tag.insertBefore(newchildbefore, children[position]);
            tag.insertBefore(newchildafter, children[position + 1]);

            // children[0].nodeValue = newtext;
            tag.removeChild(children[position - 1]);
            console.log(children, "exsq");
          } else {
            tag.appendChild(childElement);
          }
        } else if (position === children.length - 1) {
          tag.removeChild(tag.childNodes[position]);
          console.log("ye3");
        }
      }

      if (position >= 0 && position <= children.length) {
        console.log(position, children.length, tag.childNodes);
        if (position === children.length) {
          // If position is at the end, simply append the child
          tag.appendChild(childElement);
        } else {
          // Otherwise, insert the child before the element at the specified position
          // let sp2 = document.getElementById(children[childnodeposition].id);
          console.log("Inserting");
          tag.insertBefore(childElement, tag.childNodes[position]);
        }
      } else {
        tag.appendChild(childElement);
      }
    }
    console.log(
      childElement.childNodes,
      "childelement",
      isIdInJson(
        v2.newTags[tagid].id,
        firstv.newTags,
        v2.newTags[tagid].tagName
      ),
      childElement.childNodes,
      childElement.childNodes.length
    );
    if (
      isIdInJson(
        v2.newTags[tagid].id,
        firstv.newTags,
        v2.newTags[tagid].tagName
      ) == false &&
      childElement.childNodes &&
      childElement.childNodes.length > 0
    ) {
      if (
        !childElement.classList.contains("docx-wrapper") &&
        childElement.children.length <= 0
      ) {
        childElement.classList.add("greenhighlight");
      }
    }
  }
  console.log(v1);

  for (const tagId in v2.changedTags) {
    console.log(tagId, "d");
    if (v2.changedTags[tagId].id) {
      const tagInfo = v2.changedTags[tagId];
      console.log(v2.changedTags[tagId].id);

      const tag = document.getElementById(v2.changedTags[tagId].id);

      console.log("tag: " + tag);
      if (!tag) continue;

      // Apply cges to text content and style
      if (tag) {
        if (
          isIdInJson(v2.changedTags[tagId].id, firstv.changedTags, "a") == false
        ) {
          console.log(v2.changedTags[tagId].textContent, "text text text");
          // tag.classList.add("bluehighlight");
        }
        if (v2.changedTags[tagId].style) {
          tag.style.cssText = v2.changedTags[tagId].style;
          tag.classList.add("bluehighlight");
        }
        if (v2.changedTags[tagId].textContent) {
          console.log(
            v1[v2.changedTags[tagId].id].textContent.split(" ").length,
            v2.changedTags[tagId].textContent.split(" ").length,
            "hello tap",
            v1,
            v2.changedTags[tagId],
            v1[v2.changedTags[tagId].id].textContent
          );

          tag.textContent = v2.changedTags[tagId].textContent;
          console.log(tag.style.cssText);
          const style = tag.style.cssText;

          const difference = findWordDifference(
            v1[v2.changedTags[tagId].id].textContent,
            tag.textContent,
            style
          );
          console.log(
            "hello archit",
            tag,
            v1[v2.changedTags[tagId].id].textContent,
            tag.textContent,
            difference
          );

          // Highlight the differing part

          tag.innerHTML = difference;
          tag.style = style;
        }

        tag.className = tag.className;
        console.log(tag);
      }

      // Apply changes to image source
      if (tagInfo.isTagImg && v2[tagId]) {
        tag.src = v2[tagId].src;
      }
    }
  }

  for (const tagid in v2.removedTags) {
    console.log(tagid, "removedtags");
    console.log(v1[v2.removedTags[tagid]]);

    if (v2.removedTags[tagid]) {
      const tag = document.getElementById(v1[v2.removedTags[tagid]].id);

      //  tag.parentElement.classList.add("redhighlight");
      console.log("tag: " + tag);
      if (tag) {
        if (
          isIdInJson(v2.removedTags[tagid].id, firstv.removedTags, "a") ==
          false &&
          tag.textContent !== ""
        ) {
          const removedelement = document.createElement(
            v1[v2.removedTags[tagid]].tagName
          );
          console.log(
            v1[v2.removedTags[tagid]].textContent,
            "text text text",
            v2.removedTags[tagid],
            v1
          );
          removedelement.textContent = v1[v2.removedTags[tagid]].textContent;
          removedelement.style =
            v1[v2.removedTags[tagid]].style +
            "background-color: #ffaaaa; !important";
          removedelement.classList.add("removed-element");
          tag.parentElement.insertBefore(removedelement, tag);
          console.log(tag.id, "removed", removedelement);
          console.log(tag.parentElement, "remove remove remove");
          console.log(v2.removedTags[tagid].textContent, "text text text");
          if (tag.parentElement.tagName.toLowerCase() !== "article") {
            // tag.parentElement.classList.add("redhighlight");
          }
        }
        console.log(tag, tag.children, tag.childElementCount);
        if (tag != null) {
          if (tag.childElementCount > 0 && tag.childElementCount < 20) {
            v2.removedTags.forEach((removedTagId) => {
              console.log(removedTagId); // Log each removedTagId for debugging

              // Iterate over the children of the tag element
              for (let i = 0; i < tag.children.length; i++) {
                console.log(tag.children[i]);
                const child = tag.children[i];

                // Compare the ID of the child element with the current removedTagId
                if (child.id === removedTagId) {
                  // Ensure tag.parentElement exists before inserting
                  if (tag.parentElement) {
                    tag.parentElement.insertBefore(child, tag);
                    break; // Exit the loop once the matching child is found and moved
                  } else {
                    console.error("Parent element of tag is null");
                  }
                }
              }
            });
          }
          console.log(tag.children, "tag.children", tag);
          tag.remove();
        }
      } else {
        continue;
      }
    }
  }
  for (const image in v2.imageTags) {
    console.log(v2.imageTags[image]);
    const tag = document.getElementById(v2.imageTags[image].id);
    if (!tag) {
      const parent = document.getElementById(v2.imageTags[image].parent);
      const img = document.createElement("img");
      img.src = v2.imageTags[image].src;
      img.style = v2.imageTags[image].style;
      img.id = v2.imageTags[image].id;
      img.width = v2.imageTags[image].width;
      img.height = v2.imageTags[image].height;
      img.style.left = v2.imageTags[image].x + "px";
      img.style.top = v2.imageTags[image].y + "px";
      parent.appendChild(img);
    } else {
      tag.src = v2.imageTags[image].src;
      tag.style = v2.imageTags[image].style;
      tag.id = v2.imageTags[image].id;
      tag.width = v2.imageTags[image].width;
      tag.height = v2.imageTags[image].height;
      tag.style.left = v2.imageTags[image].x + "px";
      tag.style.top = v2.imageTags[image].y + "px";
    }
  }
  // imageLoaded();
  const paragraphs = document.querySelectorAll("p");

  // Filter for empty <p> elements without any attributes

  const emptyParagraphs = Array.from(paragraphs).filter(
    (p) => p.innerHTML.trim() === "" && p.attributes.length === 0
  );
  // Log each empty <p> element to the console
  emptyParagraphs.forEach((p) => console.log(p));
  console.log(emptyParagraphs.length, "emptypsssss");
  emptyParagraphs.forEach((p) => p.remove());
}

document.addEventListener("DOMContentLoaded", async function () {
  //  document.getElementById("loading").style = "display:block";
  if (localStorage.getItem("token") === null) {
    redirect(VIEWS_CONSTANTS.LOGIN);
  } else {
    const token = localStorage.getItem("token");
    await UserInfoApiRequest(token).then((data) => {
      // Handle the response from the backend
      console.log(data, "d");
      if (data == undefined || data.statusCode == 401) {
        redirect(VIEWS_CONSTANTS.LOGIN);
      } else {
        userdata = data.data;
      }
    });
  }
  localStorage.setItem("container-content-1-json", null);

  let htmljson;
  localStorage.setItem("container-content-1-json", null);
  // localStorage.setItem("version", 1);
  localStorage.setItem("jsondetectedchanges", null);
  localStorage.setItem("jsonchanges", null);
  // localStorage.setItem("imageStyleOnload", null);
  localStorage.removeItem("imageStyleOnload");
  const fileInput = document.querySelector("#files");

  async function convertDocxToBlob() {
    const docxFilePath = "/utils/sow2.docx";

    try {
      const response = await fetch(docxFilePath);
      const arrayBuffer = await response.arrayBuffer();

      const blob = new Blob([arrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      return blob;
    } catch (error) {
      console.error("Error converting DOCX to Blob:", error);
    }
  }

  function extractParentText(parentId) {
    console.log("Extracting parent", parentId);
    const parentElement = document.getElementById(parentId);
    // console.log(parentId);
    let textContent = "";
    if (parentElement) {
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
    } else {
      textContent = "";
    }

    // Iterate over child nodes

    return textContent;
  }

  function removeTagButKeepChildren(tagId) {
    var tag = document.getElementById(tagId);
    console.log(tag.id);
    var parent = tag.parentNode;
    if (parent.tagName.toLowerCase() == "article") {
      tag.remove();
    } else {
      var children = [];
      const childrens = tag.parentNode.childNodes;
      console.log("dheeraj", childrens);
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

      // Move children to a temporary container
      while (tag.firstChild) {
        children.push(tag.removeChild(tag.firstChild));
      }

      // Remove the tag
      parent.removeChild(tag);

      // Append children back to the parent
      for (var i = children.length - 1; i >= 0; i--) {
        console.log(children[i]);
        parent.insertBefore(children[i], childrens[position]);
      }
      // for (var i = 0; i < children.length; i++) {
      //   console.log(children[i]);
      //   parent.appendChild(children[i]);
      // }
      console.log("rithvik", parent);
    }
  }

  // Assuming you have a parent element

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

  const buttondd = document.getElementById("json");

  buttondd.addEventListener("click", function insertNewVersion() {
    createversion().then((createVersionData) => {
      console.log(createVersionData, "dev");
      const response = fetch(
        API_CONSTANTS.BACKEND_BASE_URL_PROD +
        "/api/versioncontrol/createDocumentVersion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doc_id: createVersionData.doc_id,
            delta: createVersionData.delta,
            created_by: createVersionData.created_by,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          Toastify({
            text: "Policy version created successfully",
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
          console.log(data);
          // localStorage.setItem("version", createVersionData.version_number);
          fetchVersionsDateWise(createVersionData.doc_id);
        });
    });
  });

  const v2tov1 = document.getElementById("v2tov1");
  v2tov1.addEventListener("click", function () {
    if (document.getElementById(localStorage.getItem("versionid"))) {
      document
        .getElementById(localStorage.getItem("versionid"))
        .classList.remove("bg-zircon-100");
    }

    document.getElementById("container-content-1").contentEditable = true;
    const modalid = localStorage.getItem("modalId");
    applyChangesFromV2toV1(modalid, function () {
      imageLoaded();
      console.log("revert back");
    });
    removeemptyimage();
  });
});

import { letterColorMapping } from "../utils/letterstyle.js";

async function ChangeVersion(modalid, id) {
  console.log("hello world dev");
  console.log(id, "change version", modalid);
  console.log("hello world dev");
  console.log(id, "change version");
  if (
    localStorage.getItem("versionid") &&
    document.getElementById(localStorage.getItem("versionid"))
  ) {
    document
      .getElementById(localStorage.getItem("versionid"))
      .classList.remove("bg-zircon-100");
  }
  localStorage.setItem("versionid", id);
  console.log(document.getElementById(id), id);
  document.getElementById(id).classList.add("bg-zircon-100");
  document.getElementById("container-content-1").contentEditable = false;
  // const modalid = localStorage.getItem("modalid");
  // console.log(modalid, "ddd eug");
  const htmljson = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD + `/api/file/getFile/${modalid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      // console.log(data.data.data);
      document.getElementById("docx-wrapper-1").innerHTML =
        style + data.data.data;
      const htmljson = data.data.htmljson;
      return htmljson;
    });
  const firstv = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
    `/api/versioncontrol/getVersions?docId=${modalid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then(async (data) => {
      if (data.data.length == 0) {
        const divElement = document.getElementById("docx-wrapper-1");
        async function detectChanges(divElement) {
          const jsonResult = JSON.parse(localStorage.getItem("htmljson"));
          console.log(divElement, "ffff", jsonResult);
          const articles = divElement.querySelectorAll("article");
          console.log(articles.length, "articcle length");
          if (articles.length > 1) {
            // checkDivSizeBack();
            removeEmptyPages();
          }
          handleChanges();
          assignIDsToElements();
          const changes = {
            changedTags: [],
            newTags: [],
            removedTags: [],
            imageTags: [],
          };

          const dynamicImages = document
            .getElementById("docx-wrapper-1")
            .getElementsByTagName("img");
          const blobToBase64 = (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            return new Promise((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });
          };
          for (let h = 0; h < dynamicImages.length; h++) {
            const image = dynamicImages[h];
            var blob = await fetch(image.src).then((response) =>
              response.blob()
            );

            // Convert blob to base64
            var base64 = await blobToBase64(blob);

            const gh = {
              x2: image.offsetLeft,
              y2: image.offsetTop,
              width: image.offsetWidth,
              height: image.offsetHeight,
              style: image.style.cssText,
              src: base64,
              id: image.id,
              parent: image.parentElement.parentElement.id,
            };
            changes.imageTags.push(gh);
          }

          console.log(document.getElementById("docx-wrapper-1"));
          const htmlTags = document
            .getElementById("docx-wrapper-1")
            .getElementsByTagName("*");
          console.log(htmlTags, "rr");

          for (let i = 0; i < htmlTags.length; i++) {
            const tag = htmlTags[i];
            const tagId = tag.id;
            const isImgTag = tag.tagName.toLowerCase() === "img";
            const isLinkTag = tag.tagName.toLowerCase() === "a";
            const tagInfo = jsonResult[tagId];

            if (!tagInfo) {
              // if (tag.children.length === 0) {
              console.log("here");
              console.log(tag);
              // New tag found
              const parentId = tag.parentElement.id || "docx-wrapper-1";
              const parenttag = document.getElementById(tag.parentElement.id);
              console.log(tag.parentElement);
              let position = -1;
              let childnodeposition = -1;
              if (tag.parentElement != null) {
                const childrens = tag.parentElement.children;
                const childnodes = tag.parentElement.childNodes;
                // Default position if tag is not found in its parent's children list

                // Find the position of the tag within its parent's children
                if (childrens) {
                  for (let j = 0; j < childrens.length; j++) {
                    if (childrens[j] === tag) {
                      position = j;
                      break;
                    }
                  }
                }
                if (childnodes) {
                  for (let j = 0; j < childnodes.length; j++) {
                    if (childnodes[j] === tag) {
                      childnodeposition = j;
                      break;
                    }
                  }
                }
              }
              let textbefore;
              let textafter;
              console.log(tag.parentElement, "hello world!");
              if (tag.parentElement && tag.parentElement.childNodes) {
                console.log("hello world!");
                textbefore =
                  childnodeposition - 1 >= 0
                    ? tag.parentElement.childNodes[childnodeposition - 1]
                      .nodeValue
                    : null;
                textafter =
                  childnodeposition + 1 < tag.parentElement.childNodes.length
                    ? tag.parentElement.childNodes[childnodeposition + 1]
                      .nodeValue
                    : null;
              }
              console.log(tag.children, "hello hello");
              const childElements = tag.children;
              const childIds = [];

              for (let i = 0; i < childElements.length; i++) {
                const childId = childElements[i].id;
                if (childId) {
                  childIds.push(childId);
                }
              }

              const newTag = {
                id: tagId,
                parentId: parentId,
                tagName: tag.tagName.toLowerCase(),
                textContent: extractParentText(tagId),
                class: tag.getAttribute("class") || "",
                style: tag.getAttribute("style") || "",
                isTagImg: isImgTag,
                position: position,
                textafter: textafter || "",
                textbefore: textbefore || "",
                className: tag.className || "",
                isTagLink: isLinkTag,
                src: isImgTag ? tag.getAttribute("src") : "",
                children: childIds,
                color: tag.getAttribute("color") || "",
                size: tag.getAttribute("size") || "",
                face: tag.getAttribute("face") || "",
                // childArray: childNodesMap,
                // parentchildNodes: tag.parentNode.childNodes,
                childnodeposition: childnodeposition,
              };
              changes.newTags.push(newTag);
            } else {
              if (
                tag.children.length === 0 &&
                tag.tagName.toLowerCase() !== "style"
              ) {
                if (tagInfo.textContent !== extractParentText(tag.id)) {
                  changes.changedTags.push({
                    id: tagId,
                    textContent: extractParentText(tag.id),
                  });
                }
                if (tagInfo.style !== tag.getAttribute("style")) {
                  changes.changedTags.push({
                    id: tagId,
                    style: tag.getAttribute("style") || "",
                  });
                }
                if (
                  tagInfo.isTagImg &&
                  tagInfo.src !== tag.getAttribute("src")
                ) {
                  changes.changedTags.push({
                    id: tagId,
                    src: isImgTag ? tag.getAttribute("src") : "",
                  });
                }
              }
            }
          }
          var keys = Object.keys(jsonResult);
          console.log(jsonResult);
          console.log(keys);
          keys.forEach(function (key) {
            if (jsonResult.hasOwnProperty(key)) {
              console.log(key, "fff");
              if (!divElement.querySelector(`#${key}`)) {
                changes.removedTags.push(key);
              }
            }
          });

          console.log(changes, "changes");

          localStorage.setItem("jsondetectedchanges", JSON.stringify(changes));

          const response = fetch(
            API_CONSTANTS.BACKEND_BASE_URL_PROD +
            "/api/versioncontrol/createDocumentVersion",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                doc_id: modalid,
                delta: changes,
                created_by: userdata.id,
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from the backend
              console.log(data);
              localStorage.setItem("version", version);
              fetchVersionsDateWise(modalid);
              //  document.getElementById("loading").style = "display:none";
              // window.location.reload();
            });

          return changes;
        }

        const changes = detectChanges(divElement);
        const firstversion = await fetch(
          API_CONSTANTS.BACKEND_BASE_URL_PROD +
          `/api/versioncontrol/getDocumentVersionsById?docId=${modalid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => { });
      } else {
      }
      console.log(data.data[0], "firtv");
      return data.data[0].delta;
    });
  const response = fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD + `/getVersionbyID?id=${id}`,
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

      const divElement = "";
      const v1 = htmljson;
      const v2 = data[0].delta;
      console.log(divElement, v1, v2, firstv);
      applyChangesFromV2toV1(modalid, function () {
        applyChangesFromV1toV2(divElement, v1, v2, firstv);
      });
    });
}
export function openDash(id) {
  console.log(id, "sss");
  const dash = document.getElementById(id);
  if (dash.classList.contains("hidden")) {
    dash.classList.remove("hidden");
  } else {
    dash.classList.add("hidden");
  }
}
const fetchVersionsDateWise = async (id) => {
  const y = [];
  console.log(id, "sss");
  const response = fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
    `/getversions/datewise?docId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data datewise", data);
      if (data.length === 0) {
        fetchVersionsDateWise(id);
      }

      // Parse each element into an array
      data.forEach((element) => {
        const arrayOfArrays = element.grouped_values
          .slice(1, -1)
          .split("], [")
          .map((item) => item.split(","));
        console.log(arrayOfArrays);

        // Step 1: Split the string into an array of arrays
        const result = arrayOfArrays.map((subArray) => {
          const id = parseInt(subArray[0]);
          // const version_number = parseFloat(subArray[1]);
          const doc_id = parseInt(subArray[1]); // Access JSON value

          return {
            id,
            doc_id,
            time: subArray[2].split(" ")[1].split(":").slice(0, 2).join(":"),
            created_by: subArray[3],
          };
        });
        console.log("data datewise", result);
        y.push({ date: element.datew, version: result });
      });

      console.log("data datewise", y);

      const versiontable = document.getElementById("version-table");
      versiontable.innerHTML = `
          <li class="mb-1 ms-4 p-4 bg-zircon-100">
          <svg class=" absolute mt-2  -start-[0.25rem]  " width="10" height="10" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.5" cy="3.5" r="2.5" fill="white" stroke="black"/>
            </svg>
            
           
           <div class="flex flex-row items-center gap-2 w-full">
            <p class=" text-base font-normal text-gray-500   ">
            Current Version
              </p>
            
           </div>
           
            
        </li>`;
      y.map((item) => {
        console.log(item);

        let dateObject = new Date(item.date);
        // dateObject = dateObject.toLocaleDateString("en-GB");

        // Get the day, month, and year
        var day = dateObject.getDate();
        var month = dateObject.getMonth() + 1; // January is 0, so we add 1
        var year = dateObject.getFullYear();

        // Pad day and month with leading zeros if necessary
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        // Format the date into "dd-mm-yyyy" format
        var formattedDate = day + "-" + month + "-" + year;
        versiontable.innerHTML += `
            <li class="mb-1 ms-4  ">
            <svg class=" absolute mt-2  -start-[0.25rem] open-dash-svg  " width="10" height="10" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="3.5" cy="3.5" r="2.5" fill="white" stroke="black"/>
              </svg>
              
                 <div class="flex flex-row items-center gap-6 w-full p-4 hover:bg-gallery-100">
              <p class=" text-base font-normal text-gray-500    ">
                ${formattedDate}
               
                </p>
                <button class="open-dash-btn" data-day="${day}" data-month="${month}">
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.9097 0.583008C10.4346 0.583008 10.6974 1.24544 10.3263 1.63286L5.91657 6.23622C5.6865 6.47638 5.3135 6.47638 5.08343 6.23622L0.673729 1.63286C0.302607 1.24544 0.565451 0.583008 1.0903 0.583008L9.9097 0.583008Z" fill="#52525B"/>
                </svg></button>
               
                
             </div>
             
              <ol class="hidden" id="${day}-${month}">
              
            </ol>
              
          </li>
            `;

        const dayversions = document.getElementById(`${day}-${month}`);
        dayversions.innerHTML = ``;
        item.version.map((version) => {
          console.log(version, "ffffk");
          dayversions.innerHTML += `
          <li id=${version.id
            }  class="m-2 cursor-pointer hover:bg-gallery-100 p-4 version-id-button">
         
            
            <time class="mb-1 text-base font-normal leading-none text-gray-400 ">${version.time
            }</time>
           <div class="flex flex-row items-center  gap-1 w-full ">
            <p class=" text-base font-normal text-gray-500   ">
            <p class="bg-[${letterColorMapping[version.created_by.charAt(0).toLowerCase()]
            }] rounded-full w-5 h-5 flex items-center justify-center">
             ${version.created_by.charAt(0).toUpperCase()}
             </p>
           
              </p>
              <p>
               ${version.created_by}
              </p>
           </div>
           
            
        </li>
`;
        });

        const openDashButtons = document.querySelectorAll(".open-dash-btn");
        openDashButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const day = button.dataset.day;
            const month = button.dataset.month;
            openDash(`${day}-${month}`);
          });
        });
        const versionIdButtons =
          document.querySelectorAll(".version-id-button");
        versionIdButtons.forEach((button) => {
          button.addEventListener("click", () => {
            ChangeVersion(id, button.id);
          });
        });
      });
    });
};

var changesx = 1;
var version = 1;
var currentNearestElement = null;

export function assignIDsToElements() {
  const container = document.getElementById("docx-wrapper-1");

  const elementsWithoutID = container.querySelectorAll("*:not([id])");
  elementsWithoutID.forEach((element, index) => {
    element.id = `generatedID_${version}_changes_${changesx}`;

    changesx++;
  });
}
export function handleChanges() {
  console.log("tapas");
  const docxWrappers = document.querySelectorAll(".docx-wrapper");

  // Iterate over each element and change the background color
  docxWrappers.forEach((wrapper) => {
    wrapper.style.backgroundColor = "#ffffff"; // Change to your desired color
  });
  const editableDiv = document.getElementsByClassName("docx-wrapper")[0];
  if (editableDiv === undefined) {
    document.getElementById(
      "container-content-1"
    ).innerHTML = `<div id="docx-wrapper-1" class="docx-wrapper"><section class="docx" style="padding: 20.15pt 59.15pt 72pt 72pt; width: 595pt; height: 842pt;" id="id_1"><article id="id_2"></article></section></div>`;
  }
  const elementsWithIds = editableDiv.querySelectorAll("[id]");
  const idSet = new Set();

  elementsWithIds.forEach((element) => {
    const id = element.id;

    if (idSet.has(id)) {
      // If duplicate found, change the ID
      // console.log(id);
      let newId;
      do {
        newId = `generatedID_${version}_changes_${changesx}`; // Appending random number to ensure uniqueness
        changesx++;
      } while (idSet.has(newId)); // Check if new ID is unique
      element.id = newId;
    }
    idSet.add(element.id);
  });
}

document
  .getElementById("container-content-1")
  .addEventListener("mouseup", handleChanges);
document
  .getElementById("container-content-1")
  .addEventListener("keyup", handleChanges);

// document
//   .getElementById("container-content-1")
//   .addEventListener("input", handleChanges);

document
  .getElementById("container-content-1")
  .addEventListener("input", checkDivSize);
document
  .getElementById("container-content-1")
  .addEventListener("input", imageLoaded, assignIDsToElements, handleChanges);
// document.addEventListener("keydown", function (event) {
//   // Check if the Control key and the "v" key are pressed simultaneously
//   if (event.ctrlKey && event.key === "v") {
//     // Run your function here
//     removeEmptyPages();
//   }
// // });

document
  .getElementById("container-content-1")
  .addEventListener("input", function (event) {
    // Check if the input event was triggered by pressing the backspace or delete key
    if (
      event.inputType === "deleteContentBackward" ||
      event.inputType === "deleteContentForward"
    ) {
      if (document.getElementsByClassName("docx").length > 0) {
        checkDivSizeBack();
      }

      document.addEventListener("keydown", function (event) {
        console.log("keydown", event.key);
        // Check if the pressed key is the backspace key
        if (event.key === "Backspace" || event.keyCode === 8) {
          console.log(
            "inside this backspace,",
            document.getElementsByClassName("docx")
          );
          if (document.getElementsByClassName("docx").length === 0) {
            document.getElementById(
              "container-content-1"
            ).innerHTML = `<div id="docx-wrapper-1" class="docx-wrapper"><section class="docx" style="padding: 20.15pt 59.15pt 72pt 72pt; width: 595pt; height: 842pt;" id="id_1"><article id="id_2"></article></section></div>`;
          }
        }
      });
    }
  });
export function setIdToNull(node) {
  // Set the id attribute of the current node to null
  node.id = null;

  // Recursively call setIdToNull for each child node
  for (var i = 0; i < node.childNodes.length; i++) {
    setIdToNull(node.childNodes[i]);
  }
}
function hideTextNodes(node) {
  console.log("Hiding text nodes", node.childNodes);
  // Iterate over each child node of the given node
  for (var i = node.childNodes.length - 1; i >= 0; i--) {
    var child = node.childNodes[i];

    // Check if the child node is not a section element
    if (child.nodeName !== "SECTION") {
      // Remove the child node
      node.removeChild(child);
    }
  }
}

export function removearticlewhileloop(articleHeight, article, i) {
  let index = 0;
  const totalarticles = document.getElementsByTagName("article");
  while (842 < articleHeight && totalarticles.length > i + 1 && index < 100) {
    console.log("removearticlewhileloop");
    index += 1;
    var pages = document.getElementsByClassName("docx");
    const nextarticle = document.getElementsByTagName("article")[i + 1];
    article.lastChild.id = null;
    setIdToNull(article.lastChild);

    assignIDsToElements();
    nextarticle.insertBefore(article.lastChild, nextarticle.firstChild);
    article = document.getElementById(article.id);
    articleHeight = article.scrollHeight;
    console.log("done on while loop");
  }
}
function addarticlewhileloop(articleHeight, article, i) {
  const totalarticles = document.getElementsByTagName("article");
  console.log(article, "kid");
  let index = 0;
  while (1056 > articleHeight && totalarticles.length > i + 1 && index < 100) {
    // console.log(document.getElementsByTagName("article")[i]);
    // console.log(document.getElementsByTagName("article")[i + 1]);
    index += 1;
    if (totalarticles.length > i + 1) {
      const beforearticle = document.getElementsByTagName("article")[i + 1];
      if (beforearticle.firstChild) {
        beforearticle.firstChild.id = null;
        setIdToNull(beforearticle.firstChild);
        assignIDsToElements();

        article.appendChild(beforearticle.firstChild);
        article = document.getElementsByTagName("article")[i];
        articleHeight = article.scrollHeight;
      }
    }
  }
}
export function checkDivSize() {
  console.log("Checking container size");
  const editableDiv = document
    .getElementById("docx-wrapper-1")
    .getElementsByClassName("docx-wrapper")[0];
  console.log(editableDiv, "editable div");
  var pages = document.getElementsByClassName("docx");
  if (pages.length > 0) {
    for (let i = 0; i < pages.length; i++) {
      console.log(pages[i].id, "dev");
      const element = pages[i];
      var containerHeight = pages[i].clientHeight;
      var contentHeight = pages[i].scrollHeight;
      console.log("print");
      console.log(containerHeight, contentHeight, "first");

      console.log(pages[i].id, "dev yes");
      if (i + 1 < pages.length) {
        let article = document.getElementsByTagName("article")[i];
        let articleHeight = article.scrollHeight;
        console.log("removearticlewhileloop first");
        removearticlewhileloop(articleHeight, article, i);
        // // article.style.height = "842pt";
        // article.clientHeight = 842;
        // article.scrollHeight = 842;
      } else {
        let article = document.getElementsByTagName("article")[i];
        let articleHeight = article.scrollHeight;
        if (articleHeight > 1056) {
          console.log("adding a new page dev dev ");
          console.log(articleHeight);

          console.log("removearticlewhileloop add page");
          const newpage = document.createElement("section");

          newpage.classList.add("docx");
          newpage.setAttribute(
            "style",
            "padding: 20.15pt 59.15pt 72pt 72pt; width: 612pt; height: 792pt;"
          );
          newpage.id = "new_page_" + Math.floor(Math.random() * 1000);
          const newheader = document.createElement("header");
          newheader.setAttribute(
            "style",
            "margin-top: calc(-19.3333px); min-height: calc(19.3333px);"
          );
          const newfooter = document.createElement("footer");
          newfooter.setAttribute(
            "style",
            "margin-bottom: calc(-96px); min-height: calc(96px);"
          );

          const newarticle = document.createElement("article");
          newpage.appendChild(newheader);
          newpage.appendChild(newarticle);
          newpage.appendChild(newfooter);
          editableDiv.appendChild(newpage);
          while (1056 < articleHeight) {
            newarticle.insertBefore(article.lastChild, newarticle.firstChild);
            // article.lastChild.remove();
            articleHeight = article.scrollHeight;
            console.log(articleHeight, "Dev artivce");
            removearticlewhileloop(article, articleHeight, i);
            // article.clientHeight = 842;
            // article.scrollHeight = 842;
          }
        }
      }

      // editableDiv.appendChild(newpage);
    }
    // checkclientheightofarticles();
    if (document.getElementsByClassName("docx").length > 1) {
      console.log("hello");
      // removeEmptyPages();
    }
  }

  if (document.getElementsByClassName("docx").length === 0) {
    document.getElementById(
      "container-content-1"
    ).innerHTML = `<div id="docx-wrapper-1" class="docx-wrapper"><section class="docx" style="padding: 20.15pt 59.15pt 72pt 72pt; width: 595pt; height: 842pt;" id="id_1"><article id="id_2"></article></section></div>`;
  }
}

export function imageLoaded() {
  imagesposition = [];
  const dynamicImages = document
    .getElementById("container-content-1")
    .querySelectorAll("img");
  console.log(dynamicImages);
  console.log("images");
  const existingHandles = document.querySelectorAll(".resize-handle");

  console.log(existingHandles, "rahul");

  if (existingHandles.length > 0) {
    console.log("hell dev");
    existingHandles.forEach((handle) => {
      handle.remove();
    });
  }
  // const existingcontainer = document.querySelectorAll(".image-container");
  // if (existingcontainer.length > 0) {
  //   existingcontainer.forEach((handle) => {
  //     handle.remove();
  //   });
  // }
  dynamicImages.forEach(function (image, index) {
    image.style.zIndex = 100;
    const container = document.createElement("div");
    container.classList.add("image-container");
    container.classList.add("container");
    container.style = "display: inline-block; position:relative;";

    console.log(image.parentNode.childNodes, "image parent child nodes");

    image.parentNode.insertBefore(container, image);
    container.appendChild(image);

    const resizeHandles = [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ].map(function (handleClass) {
      const handle = document.createElement("div");
      handle.classList.add("resize-handle", handleClass);
      container.appendChild(handle);
      return handle;
    });
    console.log(image.parentElement, "exsq image");
    imagesposition.push({
      x: image.offsetLeft,
      y: image.offsetTop,
      width: image.offsetWidth,
      height: image.offsetHeight,
      style: image.style.cssText,
      src: image.src,
      id: image.id,
      x2: image.offsetLeft,
      y2: image.offsetTop,
      width2: image.offsetWidth,
      height2: image.offsetHeight,
      style2: image.style.cssText,
      parent: image.parentElement.parentElement.id,
    });

    let initialX,
      initialY,
      offsetX = 0,
      offsetY = 0;
    let initialWidth, initialHeight;

    // Event listener for mousedown event on the image and resize handles
    image.addEventListener("mousedown", startDrag);
    resizeHandles.forEach((handle) =>
      handle.addEventListener("mousedown", startResize)
    );

    // Function to handle dragging
    function startDrag(e) {
      e.preventDefault();
      initialX = e.clientX - offsetX;
      initialY = e.clientY - offsetY;
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stopDrag);
    }

    // Function to handle resizing
    function startResize(e) {
      console.log("startResize");
      e.preventDefault();
      initialWidth = image.offsetWidth;
      initialHeight = image.offsetHeight;
      initialX = e.clientX;
      initialY = e.clientY;
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    }

    // Function to drag the image
    function drag(e) {
      console.log("drag");
      e.preventDefault();
      offsetX = e.clientX - initialX;
      offsetY = e.clientY - initialY;
      initialX = e.clientX;
      initialY = e.clientY;

      // Update the position of the image
      image.style.left = `${image.offsetLeft + offsetX}px`;
      image.style.top = `${image.offsetTop + offsetY}px`;

      // Update the position of the container
      container.style.left = `${container.offsetLeft + offsetX}px`;
      container.style.top = `${container.offsetTop + offsetY}px`;

      // Update the position of resize handles
      resizeHandles.forEach((handle) => {
        handle.style.left = `${handle.offsetLeft + offsetX}px`;
        handle.style.top = `${handle.offsetTop + offsetY}px`;
      });
    }

    // Function to resize the image
    function resize(e) {
      console.log(e);
      e.preventDefault();

      const newWidth = initialWidth + (e.clientX - initialX);
      const newHeight = initialHeight + (e.clientY - initialY);
      image.style.width = `${newWidth}px`;
      image.style.height = `${newHeight}px`;
      container.style.width = `${newWidth}px`;
      container.style.height = `${newHeight}px`;
      // resizeHandles.forEach((handle) => {
      //   handle.style.left = `${handle.offsetLeft + offsetX}px`;
      //   handle.style.top = `${handle.offsetTop + offsetY}px`;
      // });

      // Update the position of resize handles
      // resizeHandles.forEach((handle) => {
      //   handle.style.width = `${newWidth}px`;
      //   handle.style.height = `${newHeight}px`;
      // });
    }

    // Functions to stop dragging and resizing
    function stopDrag() {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDrag);
    }

    function stopResize() {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    }
  });

  console.log(dynamicImages);
}

export function checkDivSizeBack() {
  console.log("Checking container size back");
  const editableDiv = document.getElementsByClassName("docx-wrapper")[0];
  var pages = document.getElementsByClassName("docx");
  for (let i = 0; i < pages.length; i++) {
    console.log(pages[i].id, "dev");
    const element = pages[i];
    var containerHeight = pages[i].clientHeight;
    var contentHeight = pages[i].scrollHeight;
    console.log("print");
    console.log(containerHeight, contentHeight, "first");

    console.log(pages[i].id, "dev yes");

    let article = document.getElementsByTagName("article")[i];
    let articleHeight = article.scrollHeight;
    addarticlewhileloop(articleHeight, article, i);
  }

  if (pages.length > 1) {
    removeEmptyPages();
  }

  // checkclientheightofarticles();
}

export function removeEmptyPages() {
  console.log("Removing empty pages");
  const articles = document.querySelectorAll("article");
  // console.log(articles.length, "articcle length");
  // if (articles.length > 1) {
  //   console.log(articles.length, "articcle length");
  articles.forEach((article) => {
    // Check if the article has no child nodes or just a single p tag
    if (
      article.childNodes.length === 0 ||
      (article.childNodes.length === 1 &&
        article.firstChild.tagName.toLowerCase() === "p")
    ) {
      // Remove the parent section tag
      const section = article.parentNode;
      section.parentNode.removeChild(section);
    }
  });
  if (document.getElementsByClassName("docx").length === 0) {
    document.getElementById(
      "container-content-1"
    ).innerHTML = `<div id="docx-wrapper-1" class="docx-wrapper"><section class="docx" style="padding: 20.15pt 59.15pt 72pt 72pt; width: 595pt; height: 842pt;" id="id_1"><article id="id_2"></article></section></div>`;
  }
}

export function removeemptyimage() {
  const images = document.querySelectorAll(".image-container");
  images.forEach((image) => {
    if (image.childNodes.length === 0) {
      image.remove();
    }
  });
}
