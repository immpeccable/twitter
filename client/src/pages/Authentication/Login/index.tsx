import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FeedContext } from "../../../contexts/FeedContext";
import { loginApiCall } from "./api";

export const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { feed, setFeed } = useContext(FeedContext);
  const navigate = useNavigate();

  async function handleLogin(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const resp = await loginApiCall(e, {
      user_name: usernameRef!.current!.value,
      password: passwordRef!.current!.value,
    });
    setFeed({ ...feed, of: resp.data.user });
  }

  const loginMutation = useMutation({
    mutationFn: (e: FormEvent<HTMLInputElement>) => handleLogin(e),
    mutationKey: ["login"],
    onSuccess: () => navigate("/home"),
  });

  const { status } = loginMutation;

  if (status == "loading") {
    return <div>Logging in, please hold on...</div>;
  }

  return (
    <form className="flex flex-col gap-4 items-center">
      {status == "error" && (
        <div className="text-center text-white font-semibold">
          Your username or password is wrong, please try again
        </div>
      )}
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
          ref={usernameRef}
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
          ref={passwordRef}
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
        onClick={(e) => loginMutation.mutate(e)}
      />
    </form>
  );
};
