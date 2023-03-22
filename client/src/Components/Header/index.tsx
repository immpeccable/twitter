import React, { useContext, useState } from "react";
import tmpImage from "../../utils/images/twitter.png";
import { FeedContext } from "../../contexts/FeedContext";
import { FEED_OPTIONS } from "../../contexts/FeedContext/types";
import CloseIcon from "../../utils/images/close.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ABSOLUTE_PATH, ENDPOINT } from "../../utils/constants";

export const Header = () => {
  const { feed, setFeed, feedType, setFeedType } = useContext(FeedContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  async function handleSignout() {
    const jwt = localStorage.getItem("jwt_token");
    const resp = await axios.post(
      `${ENDPOINT}/sign-out`,
      {},
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    localStorage.removeItem("jwt_token");
    navigate("/");
    console.log(resp);
  }

  return (
    <header>
      <div className="flex flex-row p-4">
        <img
          onClick={() => setIsSidebarOpen(true)}
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
          src={feed.of!.image_url}
        />
        <img className="w-8 h-8 mx-auto" src={tmpImage} />
      </div>
      {isSidebarOpen && (
        <>
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-slate-100 opacity-10"
          ></div>
          <div className="fixed top-0 box-border h-[100vh] p-4 bg-black w-[66vw] overflow-hidden shadow-slate-100 shadow-md z-20">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-lg font-semibold text-white opacity-100">
                Hesap Bilgileri
              </h1>
              <img
                className="cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
                src={CloseIcon}
              />
            </div>
            <Link
              className="cursor-pointer"
              to={`http://localhost:5173/profile/${feed.of?.user_name}`}
            >
              <img
                src={feed.of?.image_url}
                className="w-10 h-10 rounded-full object-cover mt-8"
              />
            </Link>
            <h2 className="text-lg font-semibold opacity-100 text-white mt-4">
              {feed.of?.profile_name}
            </h2>
            <h3 className=" text-white opacity-60">
              {"@" + feed.of?.user_name}
            </h3>
            <div className="inline-flex gap-8">
              <div className="inline-flex gap-[3px] mt-2 items-center">
                <pre className="text-white opacity-100 font-semibold">239</pre>
                <h4 className="text-white opacity-60 text-sm font-normal">
                  Takip Edilen
                </h4>
              </div>
              <div className="inline-flex gap-[3px] mt-2 items-center">
                <pre className="text-white opacity-100 font-semibold">60</pre>
                <h4 className="text-white opacity-60 text-sm font-normal">
                  Takipçi
                </h4>
              </div>
            </div>
            <ul className="flex flex-col mt-8">
              <Link to={`http://localhost:5173/profile/${feed.of?.user_name}`}>
                <li className="text-white opacity-100">Profile</li>
              </Link>
              <button onClick={handleSignout}>Çıkış Yap</button>
            </ul>
          </div>
        </>
      )}
      <nav className="flex flex-row border-b-[1px] border-gray-400 justify-center">
        <div
          onClick={() => setFeedType(FEED_OPTIONS.for_you)}
          className="flex flex-row justify-center grow hover text-opacity-80 hover:bg-white hover:bg-opacity-10 "
        >
          <button
            className={
              feedType === FEED_OPTIONS.for_you
                ? "w-fit text-center border-b-4 p-4 border-blue-700 font-bold text-opacity-100"
                : "w-fit text-center font-semibold opacity-60"
            }
          >
            Special For You
          </button>
        </div>
        <div
          onClick={() => setFeedType(FEED_OPTIONS.followings)}
          className="flex flex-row justify-center grow hover text-opacity-80 hover:bg-white hover:bg-opacity-10 "
        >
          <button
            className={
              feedType === FEED_OPTIONS.followings
                ? "w-fit text-center border-b-4 p-4 border-blue-700 font-bold text-opacity-100"
                : "w-fit text-center font-semibold opacity-60"
            }
          >
            Followings
          </button>
        </div>
      </nav>
    </header>
  );
};
