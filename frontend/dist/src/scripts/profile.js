const makeProfile = ({
  firstName,
  lastName,
  email,
  employeeCode,
  designation,
  department,
  subDepartment,
}) => {
  return `<div
      class="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]"
    >
      <aside class="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div
          class="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12"
        >
          <h2 class="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

          <a
            href="#"
            class="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full"
          >
            Pubic Profile
          </a>
          <a
            href="#"
            class="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
          >
            Send letter
          </a>
          <a
            href="#"
            class="text-red-600 flex items-center px-3 py-2.5 font-semibold  hover:border hover:border-red-500 hover:rounded-full"
          >
            Delete User
          </a>
        </div>
      </aside>
      <main class="w-full min-h-screen py-1 border border-red-700">
        <div class="p-2 md:p-4">
          <div class="w-full px-6 pb-8 mt-8 sm:rounded-lg">
            <h2 class="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

            <div class="grid mt-8 w-full">
              <div
                class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0"
              >
                <img
                  class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Bordered avatar"
                />
              </div>

              <div class="items-center w-full mt-8 sm:mt-14 text-[#202142]">
                <div
                  class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6"
                >
                  <div class="w-full">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      first name</label>
                    <input
                      disabled
                      type="text"
                      id="first_name"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      value=${firstName}
                      required
                    />
                  </div>

                  <div class="w-full">
                    <label
                      for="last_name"

                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      last name</label
                    >
                    <input
                      disabled
                      type="text"
                      id="last_name"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      value=${lastName}
                      required
                    />
                  </div>
                </div>

                <div class="mb-2 sm:mb-6">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >email</label
                  >
                  <input
                    disabled
                    type="email"
                    id="email"
                    value=${email}
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    required
                  />
                </div>

                <div class="mb-2 sm:mb-6">
                  <label
                    for="profession"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >Employee code</label
                  >
                  <input
                    disabled
                    type="text"
                    id="profession"
                    value=${employeeCode}
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    required
                  />
                </div>

                <div class="mb-6">
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >Designation</label
                  >
                  <input
                  disabled
                    type="text"
                    id="designation"
                    value=${designation}
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    required
                  ></input>
                </div>
                <div class="mb-6">
                    <label
                      for="message"
                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >Department</label
                    >
                    <input
                    disabled
                    value=${department}
                      type="text"
                      id="Department"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      required
                    ></input>
                  </div>
                  <div class="mb-6">
                    <label
                      for="message"
                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >Sub-Department</label
                    >
                    <input
                    disabled
                    value=${subDepartment}
                    
                      type="text"
                      id="Sub-Department"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      required
                    ></input>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>








`;
};
