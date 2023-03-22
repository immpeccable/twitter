import React, { createContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { I_FEED, I_FEED_STORE, FEED_OPTIONS, I_TWEET } from "./types";
import { dummyFeed } from "./utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTweet, getCurrentUser } from "./api";

export const FeedContext = React.createContext<I_FEED_STORE>({
  feed: dummyFeed,
  setFeed: () => {},
  feedType: FEED_OPTIONS.for_you,
  setFeedType: () => {},
  tweet: { from: "", context: "" },
  setTweet: () => {},
});

type ProviderProps = {
  children: JSX.Element;
};

export const FeedProvider = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const [feed, setFeed] = useState<I_FEED>({});
  const [feedType, setFeedType] = useState<FEED_OPTIONS>(FEED_OPTIONS.for_you);
  const [tweet, setTweet] = useState<I_TWEET>({
    from: "",
    context: "",
  });

  const {
    status,
    error,
    data: user,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["fetch-user"],
    onSuccess: (user) => setFeed({ ...feed, of: user }),
    onError: () => localStorage.removeItem("jwt_token"),
  });

  const CreateTweetMutation = useMutation({
    mutationFn: () => createTweet(tweet),
    mutationKey: ["create-tweet"],
    onSuccess: () => setTweet({ ...tweet, context: "" })
  });

  const feedTypeMemo = useMemo(() => {
    return { feedType, setFeedType };
  }, [feedType, setFeedType]);

  useEffect(() => {
    if (window.location.pathname.endsWith("/") && feed.of) {
      navigate("/home");
      setTweet({ ...tweet, from: feed.of.id });
    }
  }, [feed]);

  return (
    <FeedContext.Provider
      value={{
        feed,
        setFeed,
        ...feedTypeMemo,
        tweet,
        setTweet,
        CreateTweetMutation,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
