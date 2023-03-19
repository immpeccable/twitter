import React, { createContext, useState, useMemo } from "react";
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
  const [feed, setFeed] = useState<I_FEED>(dummyFeed);
  const [feedType, setFeedType] = useState<FEED_OPTIONS>(FEED_OPTIONS.for_you);

  const feedTypeMemo = useMemo(() => {
    return { feedType, setFeedType };
  }, [feedType, setFeedType]);

  return (
    <FeedContext.Provider value={{ feed, setFeed, ...feedTypeMemo }}>
      {children}
    </FeedContext.Provider>
  );
};
