import { CreatePolicy } from "../api/createpolicy.js";
import { GetAllCategory } from "../api/getAllCategories.js";
var catId = 1;
document.getElementById("uploadFile").addEventListener("click", () => {
  console.log("upload");
  handleUpload();
});
const handleUpload = async () => {
  console.log("uploadd");
  const file = document.getElementById("file-upload").files[0];
  console.log(file, "files");
  const title = document.getElementById("title").value;

  const resHtml = await renderDocx(file, "container-html1");
  // dummy value
  //   const categoryId = 1;
  const htmlJson = "";
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
