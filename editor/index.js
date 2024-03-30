document.addEventListener("DOMContentLoaded", function () {
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

  async function renderDocx(file) {
    try {
      currentDocument = file;
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

      const dynamicImages = document.querySelectorAll("img");
      console.log(dynamicImages);
      const images = document.querySelectorAll("img");
      var latestStyleChanges;
      const styleChangeHandler = function (mutationsList, observer) {
        var mutationimageid;
        for (const mutation of mutationsList) {
          if (mutation.type === "attributes") {
            latestStyleChanges = mutation.target.style.cssText;
            mutationimageid = mutation.target.id;
          }
        }
        // const styleonload = JSON.parse(
        //   localStorage.getItem("imageStyleOnload")
        // );
        // console.log(styleonload);
        // var oldStyle = "";
        // styleonload.forEach(function (element) {
        //   if (element.id === mutationimageid) {
        //     oldStyle = element.style;
        //   }
        // });

        // const position = {
        //   isNewElement: false,
        //   isImage: true,
        //   newStyle: latestStyleChanges,
        //   oldStyle: oldStyle,
        //   id: mutationimageid,
        // };

        // textData.push(position);
        // console.log("Text deleted:", position);

        // // Store textData in JSON format
        // const jsonData = JSON.stringify(textData);
        // localStorage.setItem("jsonchanges", jsonData);
        // console.log("JSON Data:", jsonData);
        // // Your logic for handling style changes here

        // Log the latest style changes after all mutations are processed
        console.log("Latest style changes:", latestStyleChanges);
      };

      // Function to handle style changes
      // const styleChangeHandler = function (mutationsList, observer) {
      //   for (const mutation of mutationsList) {
      //     if (mutation.type === "attributes") {
      //       console.log(
      //         "Style changed for:",
      //         mutation.target.id,
      //         mutation.target.style.cssText
      //       );
      //     }
      //   }
      // };

      // Iterate through each image and add event listener
      images.forEach((image) => {
        const observer = new MutationObserver(styleChangeHandler);
        observer.observe(image, {
          attributes: true,
          attributeFilter: ["style"],
        });
      });

      dynamicImages.forEach(function (image) {
        const container = document.createElement("div");
        container.classList.add("container");
        var imagestyleonload = localStorage.getItem("imageStyleOnload");
        if (imagestyleonload === null) {
          const data = [];

          data.push({ style: image.style.cssText, id: image.id });
          imagestyleonload = JSON.stringify(data);
          localStorage.setItem("imageStyleOnload", imagestyleonload);
        } else {
          const data = JSON.parse(imagestyleonload);
          data.push({ style: image.style.cssText, id: image.id });
          imagestyleonload = JSON.stringify(data);
          localStorage.setItem("imageStyleOnload", imagestyleonload);
        }

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

        var tags = document.querySelectorAll("*");
        var idCounter = 1;
        tags.forEach(function (tag) {
          if (!tag.id) {
            tag.id = "id_" + idCounter;
            idCounter++;
          }
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
          e.preventDefault();
          offsetX = e.clientX - initialX;
          offsetY = e.clientY - initialY;
          initialX = e.clientX;
          initialY = e.clientY;
          image.style.left = `${image.offsetLeft + offsetX}px`;
          image.style.top = `${image.offsetTop + offsetY}px`;
        }

        // Function to resize the image
        function resize(e) {
          e.preventDefault();
          const newWidth = initialWidth + (e.clientX - initialX);
          const newHeight = initialHeight + (e.clientY - initialY);
          image.style.width = `${newWidth}px`;
          image.style.height = `${newHeight}px`;
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

      var sections = document.querySelectorAll(".docx");
      console.log(sections);

      sections.forEach(function (section) {
        section.style.height = "910pt";
        // section.style.padding = "130.05pt 72pt 72pt";

        // Reset min-height if necessary
        // section.style.maxHeight = "5855pt"; // Reset min-height if necessary
      });
    } catch (error) {
      console.error("Error rendering DOCX:", error);
    }
  }
  renderDocx();

  fileInput.addEventListener("change", (ev) => {
    renderDocx(fileInput.files[0]);
    // testDocuments.selectedIndex = 0;
  });
});

var changes = 1;
var version = 1;
var currentNearestElement = null;

function assignIDsToElements() {
  const elementsWithoutID = document.querySelectorAll("*:not([id])");
  elementsWithoutID.forEach((element, index) => {
    element.id = `generatedID_${version}_changes_${changes}`;
    console.log("tag", element.tagName);
    changes++;
    parentelement = document.getElementById(element.parentElement.id).innerHTML;
    parentelementlength = document.getElementById(element.parentElement.id)
      .innerHTML.length;
    console.log("parentelement", parentelement);
    console.log(`<${element.tagName.toLowerCase()}>`, "btag");
    var indexOfBoldTag = parentelement.indexOf(
      `<${element.tagName.toLowerCase()}`
    );
    console.log(element.innerHTML);

    const position = {
      elementcc: element,
      isNewElement: true,
      insertedText: null,
      nearestElement: element.id,
      element: element.outerHTML,
      parentelement: element.parentElement.id,
      parentelementlength: parentelementlength,
      startOffset: indexOfBoldTag,
      tagname: element.tagName.toLowerCase(),
      datalength: element.innerHTML.length,
      data: element.innerHTML,
    };

    textData.push(position);

    console.log("New Element Added", position);

    // Store textData in JSON format
    const jsonData = JSON.stringify(textData);
    localStorage.setItem("jsonchanges", jsonData);
    console.log("JSON Data:", jsonData);
  });
}

function getNearestElementToCursor(cursorX, cursorY) {
  const nearestElement = document.elementFromPoint(cursorX, cursorY);

  if (nearestElement) {
    // Remove highlight from previously highlighted element
    const highlightedElement = document.querySelector(".highlight");
    if (highlightedElement) {
      highlightedElement.classList.remove("highlight");
    }
    // Highlight the nearest element
    nearestElement.classList.add("highlight");
    handleDocumentClickWithID(nearestElement);
    currentNearestElement = nearestElement;
    console.log("changed");
  }
  return nearestElement;
}

// function getNearestElementToCursorFromInput(cursorX, cursorY) {
//   const nearestElement = document.elementFromPoint(cursorX, cursorY);

//   if (nearestElement) {
//     // Remove highlight from previously highlighted element
//     const highlightedElement = document.querySelector(".highlight");
//     if (highlightedElement) {
//       highlightedElement.classList.remove("highlight");
//     }
//     // Highlight the nearest element
//     nearestElement.classList.add("highlight");
//     var editable = document.getElementById(nearestElement.id);
//     var lastText = editable.textContent;
//     console.log("inside", editable);

//     editable.addEventListener("input", function (event) {
//       var newText = this.textContent;
//       console.log("inside new", newText);

//       if (
//         event.inputType === "deleteContentBackward" ||
//         event.inputType === "deleteContentForward"
//       ) {
//         for (var i = 0; i < lastText.length - 1; i++) {
//           if (lastText[i] !== newText[i]) {
//             console.log("char '" + lastText[i] + "' was removed at index " + i);
//             lastText = newText;
//             return;
//           }
//         }
//       }
//     });
//   }
//   return nearestElement;
// }

let previousContent = "";

let clickedelement = "";
function handleDocumentClick(event) {
  // Check if the click event happened inside the editable div
  console.log(event);
  clickedelement = event.target.innerText;

  // trackChanges(event.target.id);
}
function handleDocumentClickWithID(nearestElement) {
  // Check if the click event happened inside the editable div
  console.log(nearestElement);

  clickedelement = nearestElement.innerText;

  // trackChanges(event.target.id);
}

document.addEventListener("click", handleDocumentClick);

function trackChanges(id) {
  console.log(id);
  const editableDiv = document.getElementById(id);
  const currentContent = editableDiv.innerText;

  let deletedText = "";

  let i = 0,
    j = 0;
  while (i < clickedelement.length && j < currentContent.length) {
    if (clickedelement[i] !== currentContent[j]) {
      deletedText += clickedelement[i];
      i++;
    } else {
      i++;
      j++;
    }
  }

  while (i < clickedelement.length) {
    deletedText += clickedelement[i];
    i++;
  }

  clickedelement = currentContent;

  console.log("deleted", deletedText);
  return deletedText;
}
function getPosition(e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  return {
    x,
    y,
  };
}

function getCursorLocation(event) {
  console.log(event);

  if (
    event.key === "Backspace" ||
    event.key === "Delete" ||
    event.inputType === "deleteContentBackward" ||
    event.inputType === "deleteContentForward"
  ) {
    // If it is, return without doing anything
    console.log("here");
    return;
  } else {
    const position = getPosition(event);
    console.log("position", position);
    var rect;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      rect = range.getBoundingClientRect();
      // console.log(
      //   "Cursor X position:",
      //   rect.left,
      //   "Cursor Y position:",
      //   rect.top
      // );
      getNearestElementToCursor(rect.left, rect.top);
    }
    return rect;
  }
}

// function getCursorLocationFromInput(event) {
//   const position = getPosition(event);
//   //   console.log("position", position);
//   var rect;
//   const selection = window.getSelection();
//   if (selection.rangeCount > 0) {
//     const range = selection.getRangeAt(0);
//     rect = range.getBoundingClientRect();
//     // console.log(
//     //   "Cursor X position:",
//     //   rect.left,
//     //   "Cursor Y position:",
//     //   rect.top
//     // );
//     getNearestElementToCursorFromInput(rect.left, rect.top);
//   }
//   return rect;
// }

document
  .getElementById("container-content")
  .addEventListener("mouseup", getCursorLocation);
document
  .getElementById("container-content")
  .addEventListener("mouseup", assignIDsToElements);
document
  .getElementById("container-content")
  .addEventListener("keyup", assignIDsToElements);
document
  .getElementById("container-content")
  .addEventListener("keyup", getCursorLocation);
const editableDiv = document.getElementById("container-content");
let textData = [];

editableDiv.addEventListener("input", function (event) {
  const rect = getCursorLocation(event);
  console.log("rect", rect);
  let nearestElement;
  if (rect !== undefined) {
    nearestElement = getNearestElementToCursor(rect.left, rect.top);
  }

  //   console.log("xxxx", event);
  if (event.inputType == "insertText") {
    const insertedText = event.data;

    const selection = window.getSelection();
    // console.log("xx", selection);
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    const position = {
      isNewElement: false,
      insertedText: insertedText,
      nearestElement: nearestElement.id,
      contentlength: nearestElement.textContent.length,
      startOffset: startOffset,
      endOffset: endOffset,
      element: nearestElement.outerHTML,
      parentelement: nearestElement.parentElement.id,
    };

    textData.push(position);

    console.log("Text inserted:", position);

    // Store textData in JSON format
    const jsonData = JSON.stringify(textData);
    localStorage.setItem("jsonchanges", jsonData);
    console.log("JSON Data:", jsonData);
  } else if (event.inputType === "deleteContentBackward") {
    console.log("clickedelement", clickedelement);
    console.log("current", currentNearestElement);
    // trackChanges(currentNearestElement.id);

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const deletedText = trackChanges(currentNearestElement.id);
    console.log(range);
    console.log(selection);

    // const deletedText = range.cloneContents();
    // const textNodes = Array.from(deletedText.childNodes).filter(
    //   (child) => child.nodeName === "#text"
    // );

    // console.log("Deleted Text:", textNodes);

    const position = {
      isNewElement: false,
      deletedText: deletedText,
      nearestElement: currentNearestElement.id,
      contentlength: currentNearestElement.textContent.length,
      content: currentNearestElement.textContent,
      startOffset: startOffset,
      endOffset: endOffset,
      element: currentNearestElement.outerHTML,
      parentelement: currentNearestElement.parentElement.id,
    };

    textData.push(position);
    console.log("Text deleted:", position);

    // Store textData in JSON format
    const jsonData = JSON.stringify(textData);
    localStorage.setItem("jsonchanges", jsonData);
    console.log("JSON Data:", jsonData);
  }
});
