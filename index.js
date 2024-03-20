document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.querySelector("#files");
  async function convertBlobToDataURL(blob, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(blob);
  }

  async function convertDocxToBlob() {
    const docxFilePath = "../sow2.docx";

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

      dynamicImages.forEach(function (image) {
        const container = document.createElement("div");
        container.classList.add("container");
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

var currentNearestElement = null;
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
    currentNearestElement = nearestElement;
    console.log("changed");
  }
  return nearestElement;
}

function getNearestElementToCursorFromInput(cursorX, cursorY) {
  const nearestElement = document.elementFromPoint(cursorX, cursorY);

  if (nearestElement) {
    // Remove highlight from previously highlighted element
    const highlightedElement = document.querySelector(".highlight");
    if (highlightedElement) {
      highlightedElement.classList.remove("highlight");
    }
    // Highlight the nearest element
    nearestElement.classList.add("highlight");
    var editable = document.getElementById(nearestElement.id);
    var lastText = editable.textContent;
    console.log("inside", editable);

    editable.addEventListener("input", function (event) {
      var newText = this.textContent;
      console.log("inside new", newText);

      if (
        event.inputType === "deleteContentBackward" ||
        event.inputType === "deleteContentForward"
      ) {
        for (var i = 0; i < lastText.length - 1; i++) {
          if (lastText[i] !== newText[i]) {
            console.log("char '" + lastText[i] + "' was removed at index " + i);
            lastText = newText;
            return;
          }
        }
      }
    });
  }
  return nearestElement;
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
  if (event.key === "Backspace" || event.key === "Delete") {
    // If it is, return without doing anything
    console.log("here");
    return;
  }
  const position = getPosition(event);
  //   console.log("position", position);
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

function getCursorLocationFromInput(event) {
  const position = getPosition(event);
  //   console.log("position", position);
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
    getNearestElementToCursorFromInput(rect.left, rect.top);
  }
  return rect;
}

document
  .getElementById("container-content")
  .addEventListener("mouseup", getCursorLocation);
document
  .getElementById("container-content")
  .addEventListener("keyup", getCursorLocation);
const editableDiv = document.getElementById("container-content");
let textData = [];

editableDiv.addEventListener("input", function (event) {
  const rect = getCursorLocationFromInput(event);
  const nearestElement = getNearestElementToCursorFromInput(
    rect.left,
    rect.top
  );
  console.log(nearestElement.textContent, "vvvvv");
  //   console.log("xxxx", event);
  if (event.inputType == "insertText") {
    const insertedText = event.data;

    const selection = window.getSelection();
    // console.log("xx", selection);
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    const position = {
      insertedText: insertedText,
      nearestElement: nearestElement.id,
      contentlength: nearestElement.textContent.length,
      startOffset: startOffset,
      endOffset: endOffset,
    };

    textData.push(position);
    console.log("Text inserted:", position);

    // Store textData in JSON format
    const jsonData = JSON.stringify(textData);
    console.log("JSON Data:", jsonData);
  } else if (event.inputType === "deleteContentBackward") {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const deletedText = range.toString();
    console.log(range);
    console.log(selection);

    // const deletedText = range.cloneContents();
    // const textNodes = Array.from(deletedText.childNodes).filter(
    //   (child) => child.nodeName === "#text"
    // );

    // console.log("Deleted Text:", textNodes);

    const position = {
      deletedText: deletedText,
      nearestElement: nearestElement.id,
      contentlength: nearestElement.textContent.length,
      startOffset: startOffset,
      endOffset: endOffset,
    };

    textData.push(position);
    console.log("Text deleted:", position);

    // Store textData in JSON format
    const jsonData = JSON.stringify(textData);
    console.log("JSON Data:", jsonData);
  }
});
