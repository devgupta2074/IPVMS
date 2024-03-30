function removeCharacterAtPosition(elementId, position) {
  const positionx = position;
  // Find the element by its ID or any other suitable selector
  var element = document.getElementById(elementId);

  // Check if the element exists
  if (element) {
    // Get the current content of the element
    var content = element.textContent;

    // Check if the position is valid
    if (positionx >= 0 && positionx < content.length) {
      // Remove the character at the specified position
      var modifiedContent =
        content.substring(0, positionx) + content.substring(positionx + 1);

      // Update the element with the modified content
      console.log(modifiedContent);
      element.textContent = modifiedContent;

      console.log("Character removed successfully.");
    } else {
      console.error("Invalid position.");
    }
  } else {
    console.error("Element not found.");
  }
}

// Call the function with element ID and position
// removeCharacterAtPosition("id_94", 4); // Assuming 'id_94' is the ID of the element

function saveVersion() {
  const json = localStorage.getItem("jsonchanges");
  localStorage.setItem("savedversion", json);
  console.log("savedversion");
}
function modificationText() {
  // Example HTML content
  //   var htmlContent = document.getElementById("id_80").textContent;
  //   console.log(htmlContent);

  // JSON data
  var jsonData = JSON.parse(localStorage.getItem("jsonchanges"));

  // Process JSON data in reverse order
  for (var i = jsonData.length - 1; i >= 0; i--) {
    var item = jsonData[i];
    console.log(item);

    if (item.isNewElement) {
      console.log("found new element");
      var parentElement = document.getElementById(item.parentelement);
      console.log(parentElement);
      if (parentElement) {
        console.log("parent elemet is peresent");
        var boldTag = parentElement.getElementsByTagName(item.tagname)[0];

        if (boldTag) {
          parentElement.removeChild(boldTag);
        }
        // Insert HTML content
        for (var j = 0; j < item.parentelementlength; j++) {
          console.log(j);
          if (j == item.startOffset) {
            console.log(
              "dddddddev",
              parentElement.innerHTML.substring(0, j),
              item.data + parentElement.innerHTML.substring(j + 1)
            );
            parentElement.innerHTML =
              parentElement.innerHTML.substring(0, j) +
              item.data +
              parentElement.innerHTML.substring(j);
            console.log(parentElement.innerHTML);
            break;
          }
        }
      } else {
        console.error("Parent element not found.");
      }
    } else {
      var nearestElementId = item.nearestElement;
      var nearestElement = document.getElementById(nearestElementId);
      if (nearestElement !== undefined) {
        if (item.deletedText !== undefined) {
          var deletedText = item.deletedText;
          var startOffset = item.startOffset;
          var endOffset = item.endOffset;
          var originalText = nearestElement.textContent;
          console.log(originalText.substring(0, startOffset));
          console.log(originalText.substring(endOffset));
          var newText =
            originalText.substring(0, startOffset) +
            deletedText +
            originalText.substring(endOffset);
          nearestElement.textContent = newText;
          console.log(newText);
        } else if (item.insertedText !== undefined) {
          removeCharacterAtPosition(item.nearestElement, item.startOffset - 1);
        }
      }
    }
  }
}
function revertText() {
  // Example HTML content
  //   var htmlContent = document.getElementById("id_80").textContent;
  //   console.log(htmlContent);

  // JSON data
  var jsonData = JSON.parse(localStorage.getItem("savedversion"));

  // Process JSON data in reverse order
  for (var i = 0; i < jsonData.length; i++) {
    var item = jsonData[i];
    if (item.isNewElement) {
      var parentElement = document.getElementById(item.parentelement);
      if (parentElement) {
        // Insert HTML content
        for (var j = 0; j < parentElement.innerHTML.length; j++) {
          if (j == item.startOffset) {
            parentElement.innerHTML =
              parentElement.innerHTML.substring(0, j) +
              item.element +
              parentElement.innerHTML.substring(j + item.datalength);
            console.log(parentElement.innerHTML);
            break;
          }
        }
      } else {
        console.error("Parent element not found.");
      }
    } else {
      var nearestElementId = item.nearestElement;
      var nearestElement = document.getElementById(nearestElementId);
      console.log("deeeeeeee");

      if (item.insertedText !== undefined) {
        var deletedText = item.insertedText;
        var startOffset = item.startOffset;
        var endOffset = item.endOffset;
        var originalText = nearestElement.textContent;
        console.log("sss", originalText);
        console.log(originalText.substring(0, startOffset));
        console.log(originalText.substring(endOffset));
        var newText =
          originalText.substring(0, startOffset) +
          deletedText +
          originalText.substring(endOffset);
        nearestElement.textContent = newText;
        console.log(newText);
      } else if (item.deletedText !== undefined) {
        console.log(item.startOffset, item.endOffset);
        for (let index = 0; index < item.deletedText.length; index++) {
          removeCharacterAtPosition(item.nearestElement, item.startOffset);
        }
      }
    }
  }
}
document
  .getElementById("modifyButton")
  .addEventListener("click", modificationText);
document.getElementById("revertButton").addEventListener("click", revertText);
document.getElementById("saveButton").addEventListener("click", saveVersion);
