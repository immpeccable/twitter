import { I_TWEET } from "./../types";
import { Tweet } from "./../../../Components/Tweet/indes";
import { ENDPOINT } from "./../../../utils/constants";
import axios from "axios";

const jwt = localStorage.getItem("jwt_token");

export async function getCurrentUser() {
  try {
    const resp = await axios.get(`${ENDPOINT}/current-user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return resp.data;
  } catch (err) {
    throw new Error("jwt_token is expired");
  }
}

export async function createTweet(tweet: I_TWEET) {
  console.log(tweet);
  try {
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
