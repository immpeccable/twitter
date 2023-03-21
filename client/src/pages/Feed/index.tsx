import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Components/Header";
import { Tweet } from "../../Components/Tweet/indes";
import { FeedContext } from "../../contexts/FeedContext";
import TweetIcon from "../../utils/images/tweet.png";

export const Feed = () => {
  const { feed, setFeed, setTweet, tweet, CreateTweetMutation } =
    useContext(FeedContext);
  const navigate = useNavigate();

  return (
    <>
      {feed.of ? (
        <>
          <Header />
          <div className="p-4">
            <section className="flex flex-row gap-4">
              <img
                src={feed.of.image_url}
                className="w-12 h-12 rounded-full border-[2px] border-black"
              />
              <form className="flex flex-col">
                <textarea
                  placeholder="Neler oluyor"
                  className="w-[66vw]"
                  rows={2}
                  onChange={(e) =>
                    setTweet({ ...tweet, context: e.target.value })
                  }
                />

                <div className="inline-flex justify-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      CreateTweetMutation?.mutate();
                    }}
                    className="bg-blue-500 font-bold text-lg text-white rounded-full w-28 box-border py-2"
                  >
                    Tweetle
                  </button>
                </div>
              </form>
            </section>
            <section className="grid grid-cols-1">
              {feed.tweets &&
                feed.tweets?.map((tweet) => <Tweet tweet={tweet} />)}
            </section>
          </div>
        </>
      ) : (
        <button onClick={() => navigate("/")}>Get me back</button>
      )}
    </>
  );
};
