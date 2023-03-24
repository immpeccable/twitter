import { I_TWEET, I_PROFILE } from "../types";
import { ENDPOINT } from "../constants";
import axios, { AxiosResponse } from "axios";

export async function getCurrentUser(): Promise<AxiosResponse<I_PROFILE, any>> {
  try {
    const jwt = localStorage.getItem("jwt_token");
    const resp = await axios.get(`${ENDPOINT}/current-user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return resp;
  } catch (err) {
    throw new Error("jwt_token is expired");
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
