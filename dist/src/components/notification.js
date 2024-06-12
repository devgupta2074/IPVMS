import { API_CONSTANTS } from "../utils/constants.js";

const notificationhtml = `
<div class="fixed  inset-0 z-[999999999] hidden  overflow-y-hidden" id="notificationModal">
  <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
    

    <!-- Modal content -->
    <div class="inline-block align-bottom bg-white rounded-lg text-left mr-5 overflow-hidden shadow-xl  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-slide-down">
      <div class="bg-gray-50 px-4 py-3 sm:px-6 flex items-center justify-between">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
        <button type="button" class="focus:outline-none" onclick="closeNotificationModal()">
          <svg class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="h-80 overflow-y-auto">
        <div id="nmessage" class="py-4 px-6 space-y-4"></div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 flex items-center justify-between">
         <button 
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" 
          onclick="markAllAsRead()">Mark All as Read</button>
      </div>
    </div>
  </div>
</div>`;

const messageHtml = (message) => {
  return `
<div class="w-full p-3 mt-2 pt-0 bg-white rounded flex">
  <div
    tabindex="0"
    aria-label="heart icon"
    role="img"
    class="focus:outline-none w-12 h-12 border rounded-full border-gray-200 flex items-center justify-center"
  >
  <svg id="boards" class="h-8 w-8">
  <use xlink:href="/assets/icons/icon.svg#emptyicon"></use>
</svg>
  </div>
  <div class="pl-3">
    <p tabindex="0" class="focus:outline-none text-sm leading-none">
      <span class="text-indigo-700">${message}</span>
    </p>
  </div>
</div>
`;
};
window.openNotificationModal = () => {
  const bellIcon = document.getElementById("btn");
  const bellIconRect = bellIcon.getBoundingClientRect();
  const notificationModal = document.getElementById("notificationModal");
  const bellIconPosition = {
    top: bellIconRect.top + window.scrollY,
    left:
      bellIconRect.left +
      window.scrollX +
      notificationModal.getBoundingClientRect().width -
      notificationModal.getBoundingClientRect().width -
      500,
  };
  // Set the position of the modal just below the bell icon
  notificationModal.style.top = `${
    bellIconPosition.top + bellIcon.offsetHeight + 5
  }px`;
  notificationModal.style.left = `${bellIconPosition.left}px`;
  notificationModal.classList.remove("hidden");
};

window.closeNotificationModal = () => {
  document.getElementById("notificationModal").classList.add("hidden");
};
export const insertNotification = async () => {
  document.getElementById("notificationContainer").innerHTML = notificationhtml;
  const userId = localStorage.getItem("userId");
  const result = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
      `/api/notification/getNotification/${userId}?role=1`
  );
  const data = await result.json();
  const message = data?.notification;

  // Clear any existing messages
  const notificationContainer = document.getElementById("nmessage");
  notificationContainer.innerHTML = "";

  // Insert each notification message into the modal
  if (message && message.length > 0) {
    message.forEach((item) => {
      notificationContainer.innerHTML += messageHtml(item);
    });
  } else {
    notificationContainer.innerHTML = "<p>No notifications for now.</p>";
  }
};
window.notificationHandler = () => {
  openNotificationModal();
};
window.addEventListener("click", function (event) {
  const modal = document.getElementById("nmessage");
  const bellIcon = document.getElementById("btn");
  // console.log(event.target);

  if (!bellIcon.contains(event.target) && !modal.contains(event.target)) {
    closeNotificationModal();
  }
});

window.markAllAsRead = async () => {
  const userId = localStorage.getItem("userId");
  const response = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
      `/api/notification/markAllAsRead?userId=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    // If the API call is successful, refresh the notifications
    insertNotification();
    Toastify({
      text: "marked read successfully",
      duration: 1000,
      newWindow: true,
      className: "text-black",
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "white",
      },
    }).showToast();
  } else {
    Toastify({
      text: "some error occured ",
      duration: 1000,
      newWindow: true,
      className: "text-black",
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "white",
      },
    });
  }
};
