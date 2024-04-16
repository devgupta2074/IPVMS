document.addEventListener("DOMContentLoaded", async function () {
  localStorage.setItem("container-content-json", null);
  let document_version = [];
  const response = await fetch(
    "http://localhost:3000/api/versioncontrol/getVersions?docId=4",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data);
      document_version = data.data;
      const buttonContainer = document.getElementById("buttonContainer");
      if (document_version != undefined) {
        document_version.forEach((item) => {
          console.log(item);
          // Create a button element
          const button = document.createElement("button");

          // Set button text to array item
          button.innerText = "revert " + item.id;

          // Add click event listener to the button
          button.addEventListener("click", () => {
            const changes = item.delta;
            const divElement = document.getElementById("docx-wrapper");
            applyChangesFromV2toV1(divElement, htmljson, changes);
          });

          const button2 = document.createElement("button");

          // Set button text to array item
          button2.innerText = "modify " + item.id;

          // Add click event listener to the button
          button2.addEventListener("click", () => {
            const changes = item.delta;
            const divElement = document.getElementById("docx-wrapper");
            applyChangesFromV1toV2(divElement, htmljson, changes);
          });

          // Append the button to the container
          buttonContainer.appendChild(button);
          buttonContainer.appendChild(button2);
        });
      }
    });
  let htmljson;
  localStorage.setItem("container-content-json", null);
  localStorage.setItem("version", 1);
  localStorage.setItem("jsondetectedchanges", null);
  localStorage.setItem("jsonchanges", null);
  // localStorage.setItem("imageStyleOnload", null);
  localStorage.removeItem("imageStyleOnload");
  const fileInput = document.querySelector("#files");

  async function convertDocxToBlob() {
    const docxFilePath = "sow2.docx";

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

  // Usage example
  function storeParentAndChildNodesToJson(parentElement) {
    var jsonStructure = {
      parentElement: {
        tagName: parentElement.tagName,
        attributes: Array.from(parentElement.attributes).reduce(
          (acc, attribute) => {
            acc[attribute.name] = attribute.value;
            return acc;
          },
          {}
        ),
        childNodes: [],
      },
    };

    // Function to extract relevant information from child nodes
    function extractNodeInfo(node) {
      return {
        tagName: node.tagName,
        textContent: node.textContent,
        attributes: Array.from(node.attributes).reduce((acc, attribute) => {
          acc[attribute.name] = attribute.value;
          return acc;
        }, {}),
      };
    }

    // Traverse child nodes and store in parent's childNodes array
    parentElement.childNodes.forEach(function (node) {
      var nodeInfo = extractNodeInfo(node);
      jsonStructure.parentElement.childNodes.push(nodeInfo);
    });

    return JSON.stringify(jsonStructure);
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
  let contentdocument;
  async function renderDocx(file) {
    try {
      currentDocument = file;
      console.log("ffs");
      if (!currentDocument) {
        const docxOptions = Object.assign(docx.defaultOptions, {
          debug: true,
          experimental: true,

          ignoreLastRenderedPageBreak: false,
        });
        var docData = await convertDocxToBlob();
        await docx.renderAsync(
          docData,
          document.getElementById("container-content"),
          null,
          docxOptions
        );
      } else {
        const docxOptions = Object.assign(docx.defaultOptions, {
          debug: true,
          experimental: true,

          ignoreLastRenderedPageBreak: false,
        });
        var docData = await convertDocxToBlob();
        await docx.renderAsync(
          currentDocument,
          document.getElementById("container-content"),
          null,
          docxOptions
        );
      }

      var tbodyElements = document.querySelectorAll("tbody");
      // console.log("tbody elements: " + tbodyElements.length);
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

      convertImagesToBase64("container-content");
      var tags = document.querySelectorAll(".docx-wrapper *");
      // console.log(tags);
      var idCounter = 1;
      tags.forEach(function (tag) {
        if (!tag.id) {
          tag.id = "id_" + idCounter;
          idCounter++;
        }
      });
      var tbodyElements = document.getElementsByTagName("tbody");
      // console.log("tbody elements: " + tbodyElements.length);

      // Loop through each tbody element
      for (var i = 0; i < tbodyElements.length; i++) {
        // Generate a unique ID for each tbody element
        var id = "tbody_" + i;

        // Set the id attribute for the tbody element
        tbodyElements[i].setAttribute("id", id);
      }
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
      for (var i = 0; i < headers.length; i++) {
        console.log("section height chages");
        headers[i].setAttribute(
          "style",
          "margin-top: 19.3333px; height: 48px; margin-bottom:10px"
        );
      }
      const articles = containerdocx.getElementsByTagName("article");
      console.log(articles);
      for (var i = 0; i < articles.length; i++) {
        console.log("section height chages");
        articles[i].setAttribute("style", "margin-top: 48px; ");
      }
      contentdocument =
        document.getElementsByClassName("docx-wrapper")[0].innerHTML;

      // console.log(contentdocument);

      const response = await fetch(
        "http://localhost:3000/api/file/uploadFile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            htmlText: contentdocument,
            docId: "4",
            htmljson: extractHtmlToJson(
              document.getElementsByClassName("docx-wrapper")[0]
            ),
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          console.log(data);
        });

      const response2 = await fetch(
        "http://localhost:3000/api/file/getFile/4",
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
          document.getElementsByClassName("docx-wrapper")[0].innerHTML =
            data.data.data;
          htmljson = data.data.htmljson;
        });
      checkDivSize();
      // checkDivSizeBack();
      // Example usage:
    } catch (error) {
      console.error("Error rendering DOCX:", error);
    }
  }
  console.log("render_docx");
  renderDocx();

  console.log("render_docx");
  fileInput.addEventListener("change", (ev) => {
    renderDocx(fileInput.files[0]);
    // testDocuments.selectedIndex = 0;
  });
  const buttondd = document.getElementById("json");
  buttondd.addEventListener("click", function () {
    function detectChanges(divElement, jsonResult) {
      handleChanges();
      assignIDsToElements();
      const changes = {
        changedTags: [],
        newTags: [],
        removedTags: [],
      };

      const htmlTags = divElement.getElementsByTagName("*");
      console.log(htmlTags);

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
          const parentId = tag.parentElement.id || "root";
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
            // childArray: childNodesMap,
            // parentchildNodes: tag.parentNode.childNodes,
            childnodeposition: childnodeposition,
          };
          changes.newTags.push(newTag);
          console.log(jsonResult[parenttag.id], "parent");
          // if (jsonResult[parenttag.id] !== undefined) {
          //   // changes.changedTags.push({
          //   //   id: parenttag.id,
          //   //   textContent: newTag.textContent,
          //   //   textcontentfromjson: jsonResult[parenttag.id].textcontentcombined,
          //   //   style: jsonResult[parenttag.id].style,
          //   //   src: jsonResult[parenttag.id].isImgTag
          //   //     ? jsonResult[parenttag.id].isImgTag
          //   //     : "",
          //   //   isParentToNewTag: true,
          //   // });
          //   // }
          // }
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
      for (const tagId in jsonResult) {
        if (!divElement.querySelector(`#${tagId}`)) {
          changes.removedTags.push(tagId);
        }
      }
      localStorage.setItem("jsondetectedchanges", JSON.stringify(changes));

      const response = fetch(
        "http://localhost:3000/api/versioncontrol/createDocumentVersion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            version_number: version,
            doc_id: 4,
            delta: changes,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          console.log(data);
          localStorage.setItem("version", version);
        });

      return changes;
    }

    const divElement = document.getElementsByClassName("docx-wrapper")[0];
    let version = parseInt(localStorage.getItem("version"));
    const changes = detectChanges(divElement, htmljson);

    console.log("version: " + version);
    if (version == NaN) {
      version = 1;
    }
    version = version + 0.1;
    console.log(changes, version, 1);

    console.log(changes);
  });
  // Function to apply changes from v1 to v2
  function applyChangesFromV1toV2(divElement, v1, v2) {
    for (const tagid in v2.newTags) {
      console.log(tagid, "newtags");
      console.log(v2.newTags[tagid], "tapasvai");

      if (v2.newTags[tagid]) {
        // console.log(`#${v2.newTags[tagid].parentId}`);
        const tag = document.getElementById(v2.newTags[tagid].parentId);
        var childElement = document.createElement(v2.newTags[tagid].tagName);
        childElement.textContent = v2.newTags[tagid].textContent;
        console.log(childElement.textContent);
        childElement.style = v2.newTags[tagid].style;
        childElement.className = v2.newTags[tagid].class;
        childElement.id = v2.newTags[tagid].id;
        childElement.color = v2.newTags[tagid].color;
        childElement.size = v2.newTags[tagid].siAze;
        // childElement.children = v2.newTags[tagid].children;
        console.log("eye", v2.newTags[tagid].children);
        if (v2.newTags[tagid].children.length > 0) {
          for (var i = 0; i < v2.newTags[tagid].children.length; i++) {
            const child = document.getElementById(
              v2.newTags[tagid].children[i]
            );
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
          position,
          children,
          children.length,
          position >= 0 && position <= children.length,
          childElement,
          "ipvms"
        );
        if (
          position == 0 &&
          children.length == 1 &&
          children[0].nodeType == 3
        ) {
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
          if (position - 1 > 0 && position + 1 < children.length) {
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
            console.log("vishal", tag.childNodes);
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
    }
    console.log(v1);
    // for (const tagid in v2.newTags) {
    //   console.log(tagid, "removedtags");
    //   if (v2.newTags[tagid]) {
    //     console.log(v2.newTags[tagid].parentId);
    //     const tag = document.getElementById(v2.newTags[tagid].parentId);
    //     var childElement = document.createElement(v2.newTags[tagid].tagName);
    //     childElement.textContent = v2.newTags[tagid].textContent;
    //     console.log(childElement.textContent);
    //     childElement.style = v2.newTags[tagid].style;
    //     childElement.className = v2.newTags[tagid].class;
    //     childElement.id = v2.newTags[tagid].id.id;
    //     const children = tag.children;
    //     const position = v2.newTags[tagid].position;
    //     console.log(tag);
    //     console.log(
    //       position,
    //       children.length,
    //       position >= 0 && position <= children.length,
    //       "tap dev"
    //     );

    //     if (position >= 0 && position <= children.length) {
    //       if (position === children.length) {
    //         // If position is at the end, simply append the child
    //         tag.appendChild(childElement);
    //       } else {
    //         // Otherwise, insert the child before the element at the specified position
    //         let sp2 = document.getElementById(children[position].id);
    //         if (children[position].id !== "_Hlk47453870") {
    //           if (tag.contains(sp2)) {
    //             tag.insertBefore(childElement, sp2);
    //           } else {
    //             console.error(
    //               "The node before which the new node is to be inserted is not a child of this node."
    //             );
    //           }
    //         }
    //       }
    //     } else {
    //       tag.appendChild(childElement);
    //     }

    //     // Step 3: Append the child element to the div

    //     // if (!tag) continue;
    //     // if (tag) {
    //     //   tag.style = v1[tag.id].style;
    //     //   tag.textContent = v1[tag.id].textContent;
    //     // }
    //   }
    // }
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
          if (v2.changedTags[tagId].style) {
            tag.style = v2.changedTags[tagId].style;
          }
          if (v2.changedTags[tagId].textContent) {
            tag.textContent = v2.changedTags[tagId].textContent;
            // tag.style = tag.style + "border : 1px  red solid;";
          }
          // //
          //           tag.textContent = v2.changedTags[tagId].textContent;
          // if (tag.textContent !== "") {
          //   tag.style =
          //     v2.changedTags[tagId].style + "border : 1px  red solid;";
          // } else {
          //   tag.style = v2.changedTags[tagId].style;
          // }

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
      console.log();

      if (v2.removedTags[tagid]) {
        const tag = document.getElementById(v1[v2.removedTags[tagid]].id);
        console.log("tag: " + tag);
        if (tag) {
          if (tag != null) {
            tag.remove();
          }
        } else {
          continue;
        }
      }
    }
  }

  // Function to apply changes from v2 to v1
  function applyChangesFromV2toV1(divElement, v1, v2) {
    for (const tagid in v2.removedTags) {
      console.log(tagid, "removedtags");
      if (v2.removedTags[tagid]) {
        console.log(`#${v1[v2.removedTags[tagid]].parentId}`);
        const tag = document.getElementById(v1[v2.removedTags[tagid]].parentId);
        var childElement = document.createElement(
          v1[v2.removedTags[tagid]].tagName
        );
        childElement.textContent = v1[v2.removedTags[tagid]].textContent;
        console.log(childElement.textContent);
        childElement.style = v1[v2.removedTags[tagid]].style;
        childElement.className = v1[v2.removedTags[tagid]].class;
        childElement.id = v1[v2.removedTags[tagid]].id;
        const children = tag.children;
        const position = v1[v2.removedTags[tagid]].position;
        console.log(tag);
        console.log(
          position,
          children.length,
          position >= 0 && position <= children.length
        );

        if (position >= 0 && position <= children.length) {
          if (position === children.length) {
            // If position is at the end, simply append the child
            tag.appendChild(childElement);
          } else {
            // Otherwise, insert the child before the element at the specified position
            let sp2 = document.getElementById(children[position].id);
            console.log("Inserting");
            tag.insertBefore(childElement, sp2);
          }
        } else {
          tag.appendChild(childElement);
        }

        // Step 3: Append the child element to the div

        // if (!tag) continue;
        // if (tag) {
        //   tag.style = v1[tag.id].style;
        //   tag.textContent = v1[tag.id].textContent;
        // }
      }
    }
    for (const tagId in v2.newTags) {
      console.log(tagId);
      if (v2.newTags[tagId].id) {
        const tagInfo = v2.newTags[tagId];
        console.log(tagInfo);
        const tag = document.getElementById(tagInfo.id);
        if (tag != null) {
          removeTagButKeepChildren(tag.id);
        }
      }
    }
    for (const tagId in v2.changedTags) {
      console.log(tagId);

      if (v2.changedTags[tagId].id) {
        const tagInfo = v2.changedTags[tagId];
        const tag = document.getElementById(v2.changedTags[tagId].id);
        console.log("here");

        console.log("tag: " + tag);
        if (!tag) continue;

        // Apply changes to text content and style

        if (tag) {
          if (tagInfo.textContent) {
            tag.textContent = v1[tag.id].textContent;
          }
          if (tagInfo.style) {
            tag.style = v1[tag.id].style;
          }
        }

        // Apply changes to image source
        if (tagInfo.isTagImg && v1[tagId]) {
          tag.src = v1[tagId].src;
        }
      }
    }
  }

  // Example usage:
  // Assuming you have divElement, v1, and v2 from previous steps
  // Applying changes from v1 to v2
  const v2tov1 = document.getElementById("v2tov1");
  v2tov1.addEventListener("click", function () {
    const changes = JSON.parse(localStorage.getItem("jsondetectedchanges"));
    const divElement = document.getElementsByClassName("docx-wrapper")[0];
    applyChangesFromV2toV1(divElement, htmljson, changes);
  });
  const v1tov2 = document.getElementById("v1tov2");
  v1tov2.addEventListener("click", function () {
    const changes = JSON.parse(localStorage.getItem("jsondetectedchanges"));
    const divElement = document.getElementsByClassName("docx-wrapper")[0];
    applyChangesFromV1toV2(divElement, htmljson.htmljson, changes);
  });

  // Applying changes from v2 to v1
});

var changesx = 1;
var version = 1;
var currentNearestElement = null;

function assignIDsToElements() {
  const container = document.getElementsByClassName("docx-wrapper")[0];
  const elementsWithoutID = container.querySelectorAll("*:not([id])");
  elementsWithoutID.forEach((element, index) => {
    element.id = `generatedID_${version}_changes_${changesx}`;
    // console.log("tag", element.tagName);
    changesx++;
    // parentelement = document.getElementById(element.parentElement.id).innerHTML;
    // parentelementlength = document.getElementById(element.parentElement.id)
    //   .innerHTML.length;
    // console.log("parentelement", parentelement);
    // console.log(`<${element.tagName.toLowerCase()}>`, "btag");
    // var indexOfBoldTag = parentelement.indexOf(
    //   `<${element.tagName.toLowerCase()}`
    // );
    // console.log(element.innerHTML);

    // const position = {
    //   elementcc: element,
    //   isNewElement: true,
    //   insertedText: null,
    //   nearestElement: element.id,
    //   element: element.outerHTML,
    //   parentelement: element.parentElement.id,
    //   parentelementlength: parentelementlength,
    //   startOffset: indexOfBoldTag,
    //   tagname: element.tagName.toLowerCase(),
    //   datalength: element.innerHTML.length,
    //   data: element.innerHTML,
    // };

    // textData.push(position);

    // console.log("New Element Added", position);

    // // Store textData in JSON format
    // const jsonData = JSON.stringify(textData);
    // localStorage.setItem("jsonchanges", jsonData);
    // console.log("JSON Data:", jsonData);
  });
}
function handleChanges() {
  console.log("tapas");
  const editableDiv = document.getElementsByClassName("docx-wrapper")[0];
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
  .getElementById("container-content")
  .addEventListener("mouseup", handleChanges);
document
  .getElementById("container-content")
  .addEventListener("keyup", handleChanges);

document
  .getElementById("container-content")
  .addEventListener("input", handleChanges);

document
  .getElementById("container-content")
  .addEventListener("input", checkDivSize);
document
  .getElementById("container-content")
  .addEventListener("input", function (event) {
    // Check if the input event was triggered by pressing the backspace or delete key
    if (
      event.inputType === "deleteContentBackward" ||
      event.inputType === "deleteContentForward"
    ) {
      checkDivSizeBack();
    }
  });
function removearticlewhileloop(articleHeight, article, i) {
  const totalarticles = document.getElementsByTagName("article");
  while (842 < articleHeight && totalarticles.length > i + 1) {
    pages = document.getElementsByClassName("docx");
    const nextarticle = document.getElementsByTagName("article")[i + 1];
    nextarticle.insertBefore(article.lastChild, nextarticle.firstChild);
    article = document.getElementById(article.id);
    articleHeight = article.scrollHeight;
    console.log("done on while loop");
  }
}
function addarticlewhileloop(articleHeight, article, i) {
  const totalarticles = document.getElementsByTagName("article");
  console.log(article, "kid");

  while (842 > articleHeight && totalarticles.length > i + 1) {
    // console.log(document.getElementsByTagName("article")[i]);
    // console.log(document.getElementsByTagName("article")[i + 1]);
    if (totalarticles.length > i + 1) {
      const beforearticle = document.getElementsByTagName("article")[i + 1];
      if (beforearticle.firstChild) {
        article.appendChild(beforearticle.firstChild);
        article = document.getElementsByTagName("article")[i];
        articleHeight = article.scrollHeight;
      }
    }
  }
}
function checkDivSize() {
  console.log("Checking container size");
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
    if (i + 1 < pages.length) {
      let article = document.getElementsByTagName("article")[i];
      let articleHeight = article.scrollHeight;
      removearticlewhileloop(articleHeight, article, i);
      article.clientHeight = 842;
      article.scrollHeight = 842;
    } else {
      let article = document.getElementsByTagName("article")[i];
      let articleHeight = article.scrollHeight;
      while (842 < articleHeight) {
        const newpage = document.createElement("section");

        newpage.classList.add("docx");
        newpage.setAttribute(
          "style",
          "padding: 20.15pt 59.15pt 72pt 72pt; width: 595pt; height: 842pt;"
        );
        newpage.id = "new_page_" + Math.random() * 1000;
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
        newarticle.appendChild(article.lastChild);
        article.lastChild.remove();
        articleHeight = article.scrollHeight;
        removearticlewhileloop(article, articleHeight, i);
        article.clientHeight = 842;
        article.scrollHeight = 842;
      }
    }

    // editableDiv.appendChild(newpage);
  }
  // checkclientheightofarticles();
}

function checkDivSizeBack() {
  console.log("Checking container size");
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
    // if (i + 1 < pages.length) {
    //   let article = document.getElementsByTagName("article")[i];
    //   let articleHeight = article.scrollHeight;
    //   addarticlewhileloop(articleHeight, article, i);
    //   article.clientHeight = 842;
    //   article.scrollHeight = 842;
    // } else {
    let article = document.getElementsByTagName("article")[i];
    let articleHeight = article.scrollHeight;
    addarticlewhileloop(articleHeight, article, i);
    article.clientHeight = 842;
    article.scrollHeight = 842;

    // editableDiv.appendChild(newpage);
  }
  // checkclientheightofarticles();
}
