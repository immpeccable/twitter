import React, { createContext, useState } from "react";
import { I_FEED, I_FEED_STORE } from "./types";
import { dummyFeed } from "./utils";

export const FeedContext = React.createContext<I_FEED_STORE>({
  feed: dummyFeed,
  setFeed: () => {},
});

type ProviderProps = {
  children: JSX.Element;
};

export const FeedProvider = ({ children }: ProviderProps) => {
  const [feed, setFeed] = useState<I_FEED>(dummyFeed);

  return (
    <FeedContext.Provider value={{ feed, setFeed }}>
      {children}
    </FeedContext.Provider>
  );
};
