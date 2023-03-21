import { ENDPOINT } from "./../../../utils/constants";
import axios from "axios";

const jwt = localStorage.getItem("jwt_token");
export async function getTweetsOfUser() {
  const tweets = await axios.get(`${ENDPOINT}/tweets-of-user`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log("tweets: ", tweets);
  return tweets;
}
