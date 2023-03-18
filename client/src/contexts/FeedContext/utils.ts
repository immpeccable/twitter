import { I_PROFILE, I_POST, I_FEED } from "./types";

export const profile_1: I_PROFILE = {
  image_url:
    "https://pbs.twimg.com/media/FrhPMuPWwAMeCvV?format=jpg&name=large",
  profile_name: "tuna",
  user_name: "thlikelym_diorum",
};

export const profile_2: I_PROFILE = {
  image_url:
    "https://pbs.twimg.com/media/FrhPMuPWwAMeCvV?format=jpg&name=large",
  profile_name: "tuna",
  user_name: "thlikelym_diorum",
};

export const post_1: I_POST = {
  from: profile_1,
  context: "Zeynebi çok seviyorum",
  likes: 1,
  retweets: 2,
  mentions: 3,
};
export const post_2: I_POST = {
  from: profile_2,
  context: "Tunayı çok seviyorum",
  likes: 2,
  retweets: 5,
  mentions: 8,
};

export const dummyFeed: I_FEED = {
  of: profile_1,
  posts: [post_1, post_2],
};
