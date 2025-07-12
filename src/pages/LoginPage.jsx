import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden p-2">
      <div class="flex flex-col w-full max-w-md p-12 space-y-6 text-center bg-gray-50 text-gray-900 mx-auto mt-40 rounded-2xl shadow-xl h-110 ">
        <h1 class="text-3xl font-semibold">Sign in to your account</h1>
        <form class="flex flex-col space-y-4">
          <div class="flex flex-col text-left">
            <label for="email" class="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white text-gray-800"
            />
          </div>

          <div class="flex flex-col text-left">
            <label for="password" class="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white text-gray-800"
            />
          </div>
          <button
            type="submit"
            class="w-full flex justify-center items-center px-4 py-2 font-semibold rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mt-7">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
