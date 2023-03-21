import React, { useContext } from "react";
import { Header } from "../../Components/Header";
import { Tweet } from "../../Components/Tweet/indes";
import { FeedContext } from "../../contexts/FeedContext";

export const Feed = () => {
  const { feed, setFeed } = useContext(FeedContext);
  return (
    <>
      {feed.of && (
        <>
          <Header />

          <section className="grid grid-cols-1">
            {feed.tweets &&
              feed.tweets?.map((tweet) => <Tweet tweet={tweet} />)}
          </section>
        </>
      )}
    </>
  );
};
