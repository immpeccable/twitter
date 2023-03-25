import { I_TWEET } from "./../../../utils/types/index";
import { ENDPOINT } from "./../../../utils/constants";
import axios, { AxiosResponse } from "axios";
export async function getFeed(cursor: String): Promise<I_TWEET[]> {
  console.log("cursor: ", cursor);
  const jwt = localStorage.getItem("jwt_token");
  const resp = await axios.get(`${ENDPOINT}/feed`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      cursor: cursor,
    },
  });
  return resp.data;
}
