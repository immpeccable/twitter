import { UseMutationResult } from "@tanstack/react-query";

export enum FEED_OPTIONS {
  for_you = "Special For You",
  followings = "Followings",
}

export interface I_PROFILE {
  image_url: string;
  profile_name: string;
  user_name: string;
  password: string;
  readonly id: string;
}

export interface I_TWEET {
  readonly from: I_PROFILE | string;
  context: string;
  likes?: number;
  retweets?: number;
  mentions?: number;
}

export interface I_FEED {
  of?: I_PROFILE;
  tweets?: I_TWEET[];
}

export interface I_FEED_STORE {
  feed: I_FEED;
  setFeed: (feed: I_FEED) => void;
  feedType: FEED_OPTIONS;
  setFeedType: (feedType: FEED_OPTIONS) => void;
  tweet: I_TWEET;
  setTweet: (tweet: I_TWEET) => void;
  CreateTweetMutation?: UseMutationResult<void, unknown, void, unknown>;
}
