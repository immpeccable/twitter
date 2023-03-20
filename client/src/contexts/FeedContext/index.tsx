import React, { createContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { I_FEED, I_FEED_STORE, FEED_OPTIONS } from "./types";
import { dummyFeed } from "./utils";

export const FeedContext = React.createContext<I_FEED_STORE>({
  feed: dummyFeed,
  setFeed: () => {},
  feedType: FEED_OPTIONS.for_you,
  setFeedType: () => {},
});

type ProviderProps = {
  children: JSX.Element;
};

export const FeedProvider = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const [feed, setFeed] = useState<I_FEED>({});
  const [feedType, setFeedType] = useState<FEED_OPTIONS>(FEED_OPTIONS.for_you);

  const feedTypeMemo = useMemo(() => {
    return { feedType, setFeedType };
  }, [feedType, setFeedType]);

  useEffect(() => {
    if (feed.of) {
      navigate("/home");
    }
  }, [feed]);

  return (
    <FeedContext.Provider value={{ feed, setFeed, ...feedTypeMemo }}>
      {children}
    </FeedContext.Provider>
  );
};
