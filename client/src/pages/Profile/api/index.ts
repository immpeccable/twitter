import { Header } from "./../../../Components/Header/index";
import { ENDPOINT } from "./../../../utils/constants";
import axios, { AxiosResponse } from "axios";
import { I_TWEET, I_PROFILE } from "../../../utils/types";

export async function getTweetsOfUser(
  user_name: string
): Promise<AxiosResponse<I_TWEET[], any>> {
  const jwt = localStorage.getItem("jwt_token");
  const tweets = await axios.get(`${ENDPOINT}/tweets-of-user`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: { user_name: user_name },
  });
  console.log("tweets: ", tweets);
  return tweets;
}

export async function getUserByUsername(
  user_name: string
): Promise<AxiosResponse<I_PROFILE, any>> {
  const jwt = localStorage.getItem("jwt_token");
  const user = await axios.get(`${ENDPOINT}/get-user-by-username`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      user_name: user_name,
    },
  });
  console.log("fetched user:", user);
  return user;
}

export async function follow(
  fromUsername: string,
  toUsername: string
): Promise<AxiosResponse<I_PROFILE[], any>> {
  const jwt = localStorage.getItem("jwt_token");
  console.log(fromUsername, toUsername);
  const resp = await axios.post(
    `${ENDPOINT}/follow`,
    {
      fromUsername: fromUsername,
      toUsername: toUsername,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  console.log("follow response: ", resp);
  return resp;
}
