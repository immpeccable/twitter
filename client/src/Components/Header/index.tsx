import React, { useContext } from "react";
import tmpImage from "../../utils/images/twitter.png";
import { FeedContext } from "../../contexts/FeedContext";

export const Header = () => {
  const { feed, setFeed } = useContext(FeedContext);
  return (
    <header>
      <div className="flex flex-row p-4">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={feed.of.image_url}
        />
        <img className="w-8 h-8 mx-auto" src={tmpImage} />
      </div>
      <nav className="flex flex-row border-b-[1px] border-gray-400 justify-center">
        <div className="flex flex-row justify-center grow hover text-opacity-80 hover:bg-white hover:bg-opacity-10 focus-within:font-bold focus-within:text-opacity-100">
          <button className="w-fit text-center focus:border-b-4 p-4 focus:border-blue-700">
            Sana Özel
          </button>
        </div>
        <div className="flex flex-row justify-center grow hover text-opacity-80 hover:bg-white hover:bg-opacity-10 focus-within:font-bold focus-within:text-opacity-100">
          <button className="w-fit text-center focus:border-b-4 p-4 focus:border-blue-700">
            Takip Edilenler
          </button>
        </div>
      </nav>
    </header>
  );
};
