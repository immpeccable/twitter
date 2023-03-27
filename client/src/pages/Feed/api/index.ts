import { I_TWEET } from "./../../../utils/types/index";
import { ENDPOINT } from "./../../../utils/constants";
import axios, { AxiosResponse } from "axios";
import ObjectID from "bson-objectid";
export async function getFeed(cursor: {
  date: number;
  timestamp: number;
}): Promise<I_TWEET[]> {
  const jwt = localStorage.getItem("jwt_token");
  console.log("cursor: ", cursor);
  const resp = await axios.get(`${ENDPOINT}/feed`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      cursor: cursor ? cursor.timestamp : null,
    },
  });
  return resp.data;
}
