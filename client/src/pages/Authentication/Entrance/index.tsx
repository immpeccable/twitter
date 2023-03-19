import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Entrance = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-32">
      <nav className=" flex flex-col gap-4">
        <Link to="/login">
          <button className="w-48 box-border px-4 py-2 text-center bg-blue-500 text-white font-bold text-lg rounded-lg cursor-pointer">
            Log in
          </button>
        </Link>
        <Link to="signup">
          <button className=" w-48 box-border px-4 py-2 text-center bg-white text-black font-bold text-lg rounded-lg cursor-pointer">
            Sign up
          </button>
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};
