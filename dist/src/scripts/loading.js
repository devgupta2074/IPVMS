export const showLoading = () => {
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
export const removeLoading = () => {
  const loadingElement = document.getElementById("loadingicon");
  if (loadingElement) {
    loadingElement.remove();
  }
};
