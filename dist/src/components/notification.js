import { API_CONSTANTS } from "../utils/constants.js";

const notificationhtml = `
<div
class="w-full h-full z-[999999999] hidden bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
id="chec-div"
>
<!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->
<div
  class="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-full transition ease-in-out duration-700"
  id="notification"
>
  <div
    id="nmessage"
    class="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0"
  >
    <div id="notificationbdy" class="flex items-center justify-between">
      <p
        tabindex="0"
        class="focus:outline-none text-2xl font-semibold leading-6 text-gray-800"
      >
        Notifications
      </p>
      <button
        role="button"
        aria-label="close modal"
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer"
        onclick="notificationHandler()"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="#4B5563"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#4B5563"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    
   
</div>
</div>`;

const messageHtml = (message) => {
  return `
<div class="w-full p-3 mt-8 bg-white rounded flex">
  <div
    tabindex="0"
    aria-label="heart icon"
    role="img"
    class="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z"
        fill="#EF4444"
      />
    </svg>
  </div>
  <div class="pl-3">
    <p tabindex="0" class="focus:outline-none text-sm leading-none">
      <span class="text-indigo-700">${message}</span>
    </p>
    <p
      tabindex="0"
      class="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
    >
      2 hours ago
    </p>
  </div>
</div>
`;
};

export const insertNotification = async (userId) => {
  document.getElementById("notificationContainer").innerHTML = "";
  document.getElementById("notificationContainer").innerHTML = notificationhtml;
  const result = await fetch(
    API_CONSTANTS.BACKEND_BASE_URL_PROD +
      `/api/notification/getNotification/${userId}?role=1`
  );
  const data = await result.json();
  const message = data?.notification;
  message.forEach((item) => {
    document.getElementById("nmessage").innerHTML += messageHtml(item);
  });
  document.getElementById("nmessage").innerHTML += `<h2
tabindex="0"
class="focus:outline-none text-sm leading-normal pt-8 border-b pb-2 border-gray-300 text-gray-600"
>
YESTERDAY
</h2>`;

  document.getElementById("nmessage").innerHTML += messageHtml(
    "Dev has approved policy leave policy"
  );

  document.getElementById(
    "nmessage"
  ).innerHTML += `<div class="flex items-center justiyf-between">
<hr class="w-full" />
<p
  tabindex="0"
  class="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500"
>
  Thats it for now :)
</p>
<hr class="w-full" />
</div>`;

  let flag3 = false;
  window.notificationHandler = () => {
    console.log("clicked");
    let notification = document.getElementById("notification");
    let checdiv = document.getElementById("chec-div");
    console.log(notification, checdiv, flag3);
    if (!flag3) {
      notification.classList.add("translate-x-full");
      notification.classList.remove("translate-x-0");
      setTimeout(function () {
        checdiv.classList.add("hidden");
      }, 0);
      flag3 = true;
    } else {
      setTimeout(function () {
        notification.classList.remove("translate-x-full");
        notification.classList.add("translate-x-0");
      }, 0);
      checdiv.classList.remove("hidden");
      flag3 = false;
    }
  };
  //   document.addEventListener("click", function (event) {
  //     const checDiv = document.getElementById("chec-div");
  //     const notification = document.getElementById("notificationbdy");
  //     const button = document.getElementById("btn");
  //     const isClickInside = notification.contains(event.target);
  //     const isButtonClick = button.contains(event.target);
  //     if (!isClickInside && !isButtonClick) {
  //       notificationHandler();
  //     }
  //   });
};
