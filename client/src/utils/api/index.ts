import { I_TWEET, I_PROFILE, ObjectId } from "../types";
import { ENDPOINT } from "../constants";
import axios, { AxiosResponse } from "axios";
import ObjectID from "bson-objectid";

export async function getCurrentUser(): Promise<AxiosResponse<I_PROFILE, any>> {
  try {
    const jwt = localStorage.getItem("jwt_token");
    const resp = await axios.get(`${ENDPOINT}/current-user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("get current user: ", resp);
    return resp;
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export async function createTweet(tweet: { context: string }) {
  console.log(tweet);
  try {
    const jwt = localStorage.getItem("jwt_token");
    const resp = await axios.post(`${ENDPOINT}/create-tweet`, tweet, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(resp);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export async function likeTweet(tweetId: ObjectId) {
  let id = null;
  const objectId = new ObjectID(tweetId.timestamp);
  id = objectId.toString();
  const jwt = localStorage.getItem("jwt_token");

  const resp = await axios.post(`${ENDPOINT}/tweet/${id}/like`, null, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log(resp);
  return resp;
}
