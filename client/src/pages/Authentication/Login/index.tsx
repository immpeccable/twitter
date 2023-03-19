import React from "react";

export const Login = () => {
  return (
    <form className="flex flex-col gap-4 items-center">
      <div
        className="relative w-fit bg-black flex flex-col py-4 px-2
         rounded-md gap-2 border-[1px] border-opacity-50 border-gray-500 
        focus-within:border-[3px] focus-within:border-blue-700 focus-within:border-opacity-100"
      >
        <input
          id="username"
          className="peer bg-blue-100 bg-inherit text-white mt-6 placeholder-shown:mt-0"
          type="text"
          placeholder="Username"
        />
        <label
          htmlFor="username"
          className="left-2 top-2 pointer-events-none peer-focus:text-xl font-semibold block
           peer-focus:text-blue-700 peer-focus:opacity-100 opacity-60 absolute  transition-all ease-out delay-150 peer-placeholder-shown:hidden"
        >
          Username
        </label>
      </div>
      <div
        className=" relative w-fit bg-black flex flex-col  py-4
         px-2 rounded-md gap-2 border-[1px] border-opacity-50 border-gray-500 
        focus-within:border-[3px] focus-within:border-blue-700 focus-within:border-opacity-100"
      >
        <input
          id="password"
          className="peer bg-blue-100 p-[1px] bg-inherit text-white mt-6 placeholder-shown:mt-0"
          type="password"
          placeholder="Password"
        />
        <label
          htmlFor="password"
          className="transition-all ease-out delay-150 left-2 top-2 pointer-events-none peer-focus:text-xl font-semibold block
        opacity-60 peer-focus:text-blue-700 peer-focus:opacity-100 absolute peer-placeholder-shown:hidden"
        >
          Password
        </label>
      </div>
      <input
        type="submit"
        value="Log in"
        className="mt-10 rounded-full bg-white text-black font-semibold text-lg
         text-center py-4 w-[80vw] max-w-[600px]"
      />
    </form>
  );
};
