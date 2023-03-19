import React, { useState, useReducer, FormEvent } from "react";
import { I_PROFILE } from "../../../contexts/FeedContext/types";
import { I_REDUCER_ACTION } from "./types";
import axios from "axios";
import { Link } from "react-router-dom";

function reducer(
  state: I_PROFILE,
  action: I_REDUCER_ACTION
): I_PROFILE | never {
  console.log(action);
  switch (action.type) {
    case "user_name_changed":
      return {
        ...state,
        user_name: action.next,
      };
    case "profile_name_changed":
      return {
        ...state,
        profile_name: action.next,
      };
    case "password_changed":
      return {
        ...state,
        password: action.next,
      };
    case "image_url_changed":
      return {
        ...state,
        image_url: action.next,
      };
    default:
      throw Error("Unknown action");
  }
}

const initialState: I_PROFILE = {
  user_name: "",
  profile_name: "",
  image_url:
    "https://pbs.twimg.com/media/FrhPMuPWwAMeCvV?format=jpg&name=large",
  password: "",
};

export const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function handleSignup(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(state);
    const resp = await axios.post("http://localhost:8080/create-user", state);
    console.log(resp);
  }

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
          onChange={(e) =>
            dispatch({ type: "user_name_changed", next: e.target.value })
          }
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
          onChange={(e) =>
            dispatch({ type: "password_changed", next: e.target.value })
          }
        />
        <label
          htmlFor="password"
          className="transition-all ease-out delay-150 left-2 top-2 pointer-events-none peer-focus:text-xl font-semibold block
        opacity-60 peer-focus:text-blue-700 peer-focus:opacity-100 absolute peer-placeholder-shown:hidden"
        >
          Password
        </label>
      </div>

      <div
        className=" relative w-fit bg-black flex flex-col  py-4
         px-2 rounded-md gap-2 border-[1px] border-opacity-50 border-gray-500 
        focus-within:border-[3px] focus-within:border-blue-700 focus-within:border-opacity-100"
      >
        <input
          id="profile-name"
          className="peer bg-blue-100 p-[1px] bg-inherit text-white mt-6 placeholder-shown:mt-0"
          type="text"
          placeholder="Profile Name"
          onChange={(e) =>
            dispatch({ type: "profile_name_changed", next: e.target.value })
          }
        />
        <label
          htmlFor="profile-name"
          className="transition-all ease-out delay-150 left-2 top-2 pointer-events-none peer-focus:text-xl font-semibold block
        opacity-60 peer-focus:text-blue-700 peer-focus:opacity-100 absolute peer-placeholder-shown:hidden"
        >
          Profile Name
        </label>
      </div>
      <Link to="/">
        <button
          className="mt-10 rounded-full bg-red-400 text-black font-semibold text-lg
         text-center py-4 w-[80vw] max-w-[600px]"
        >
          Back
        </button>
      </Link>
      <input
        type="submit"
        value="Sign up"
        className="rounded-full bg-green-400 text-black font-semibold text-lg
         text-center py-4 w-[80vw] max-w-[600px]"
        onClick={(e) => handleSignup(e)}
      />
    </form>
  );
};
