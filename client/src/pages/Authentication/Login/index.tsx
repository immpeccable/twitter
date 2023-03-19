import React from "react";

export const Login = () => {
  return (
    <form className="flex flex-col gap-4 items-center">
      <div
        className="w-fit bg-black flex flex-col p-2 rounded-md gap-2 border-[1px] border-opacity-50 border-gray-500 
        focus-within:border-[3px] focus-within:border-blue-700 focus-within:border-opacity-100"
      >
        <label
          htmlFor="username"
          className="peer-focus:text-blue-700 peer-focus:font-semibold peer-focus:mt-10 "
        >
          Username
        </label>
        <input
          id="username"
          className="peer bg-blue-100 p-[1px] bg-inherit text-white"
          type="text"
        />
      </div>
      <div
        className="w-fit bg-black flex flex-col p-2 rounded-md gap-2 border-[1px] border-opacity-50 border-gray-500 
        focus-within:border-[3px] focus-within:border-blue-700 focus-within:border-opacity-100"
      >
        <label
          htmlFor="password"
          className="peer-focus:text-blue-700 peer-focus:font-semibold peer-focus:mt-10 "
        >
          Password
        </label>
        <input
          id="password"
          className="peer bg-blue-100 p-[1px] bg-inherit text-white"
          type="password"
        />
      </div>
      <input
        type="submit"
        value="Log in"
        className="mt-10 rounded-full bg-white text-black font-semibold text-lg text-center py-4 w-[80vw] max-w-[600px]"
      />
    </form>
  );
};
