import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../../Components/Header";
import { Tweet } from "../../Components/Tweet/indes";
import { FeedContext } from "../../contexts/FeedContext";

export const Feed = () => {
  const { feed, setFeed, setTweet, tweet, CreateTweetMutation } =
    useContext(FeedContext);
  const navigate = useNavigate();
  const contextRef = useRef<HTMLTextAreaElement>(null);
  console.log(feed);

  return feed.of ? (
    <>
      <Header />
      <div className="p-4">
        <section className="flex flex-row w-[90vw] mx-auto border-b-[1px] border-gray-400 border-opacity-60 pb-2">
          <img
            src={feed.of.image_url}
            className="w-12 h-12 rounded-full border-[2px] border-black"
          />
          <form className="flex flex-col ml-4">
            <textarea
              ref={contextRef}
              placeholder="Neler oluyor"
              className="w-[66vw] outline-none bg-inherit"
              rows={2}
              onChange={(e) => setTweet({ ...tweet, context: e.target.value })}
            />

            <div className="inline-flex justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  CreateTweetMutation?.mutate();
                  contextRef!.current!.value = "";
                }}
                className="bg-blue-500 font-bold text-lg text-white rounded-full w-28 box-border py-2"
              >
                Tweetle
              </button>
            </div>
          </form>
        </section>
        <section className="grid grid-cols-1">
          {feed.tweets && feed.tweets?.map((tweet) => <Tweet tweet={tweet} />)}
        </section>
      </div>
    </>
  ) : (
    <button
      className="m-auto absolute left-1/2 box-border w-80 h-20 top-1/2 -translate-x-40 -translate-y-10 rounded-full bg-black text-white font-semibold"
      onClick={() => navigate("/login")}
    >
      Your session is expired, please login again
    </button>
  );
};
