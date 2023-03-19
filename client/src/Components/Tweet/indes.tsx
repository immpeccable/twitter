import React from "react";
import { I_TWEET_PROPS } from "./types";
import likeImg from "../../utils/images/like.png";
import retweeetImg from "../../utils/images/retweet.png";
import mentionImg from "../../utils/images/mention.png";
import shareImg from "../../utils/images/share.png";

export const Tweet = ({ tweet }: I_TWEET_PROPS) => {
  return (
    <div className="flex flex-row border-b-[1px] border-gray-400 border-opacity-40 py-4 px-4">
      <div className="shrink-0">
        <img className="w-12 h-12 rounded-full" src={tweet.from.image_url} />
      </div>
      <div className="flex flex-col ml-4 w-full">
        <header className="flex flex-row items-center">
          <h2 className="text-xl font-bold">{tweet.from.profile_name}</h2>
          <h3 className="ml-2 text-sm font-medium opacity-60">
            <span>@</span>
            {tweet.from.user_name}
          </h3>
        </header>
        <p className="block text-sm font-semibold">{tweet.context}</p>
        <footer className="mt-4 flex flex-row justify-between">
          <button className="flex flex-row gap-2 items-center">
            <img src={mentionImg} />
            {tweet.mentions > 0 && (
              <span className="text-sm opacity-60">{tweet.mentions}</span>
            )}
          </button>
          <button className="flex flex-row gap-2 items-center">
            <img src={retweeetImg} />
            {tweet.retweets > 0 && (
              <span className="text-sm opacity-60">{tweet.retweets}</span>
            )}
          </button>
          <button className="flex flex-row gap-2 items-center">
            <img src={likeImg} />
            {tweet.likes > 0 && (
              <span className="text-sm opacity-60">{tweet.likes}</span>
            )}
          </button>
          <button className="flex flex-row gap-2 items-center">
            <img src={shareImg} />
          </button>
        </footer>
      </div>
    </div>
  );
};
