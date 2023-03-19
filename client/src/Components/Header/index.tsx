import React, { useContext } from "react";
import tmpImage from "../../utils/images/twitter.png";
import { FeedContext } from "../../contexts/FeedContext";
import { FEED_OPTIONS } from "../../contexts/FeedContext/types";

export const Header = () => {
  const { feed, setFeed, feedType, setFeedType } = useContext(FeedContext);
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
