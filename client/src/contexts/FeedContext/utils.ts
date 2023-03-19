import { I_PROFILE, I_TWEET, I_FEED } from "./types";

export const profile_1: I_PROFILE = {
  image_url:
    "https://pbs.twimg.com/media/FrhPMuPWwAMeCvV?format=jpg&name=large",
  profile_name: "tuna",
  user_name: "thlikelym_diorum",
  password: "123",
  id: "123",
};

export const profile_2: I_PROFILE = {
  image_url:
    "https://pbs.twimg.com/media/FrhPMuPWwAMeCvV?format=jpg&name=large",
  profile_name: "tuna",
  user_name: "thlikelym_diorum",
  password: "123",
  id: "123",
};

export const post_1: I_TWEET = {
  from: profile_1,
  context: "Zeynebi çok seviyorum",
  likes: 1,
  retweets: 2,
  mentions: 3,
};
export const post_2: I_TWEET = {
  from: profile_2,
  context:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  likes: 2,
  retweets: 5,
  mentions: 8,
};

export const dummyFeed: I_FEED = {
  of: profile_1,
  tweets: [post_1, post_2, post_1, post_2],
};
