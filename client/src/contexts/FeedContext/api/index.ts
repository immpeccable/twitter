import { ENDPOINT } from "./../../../utils/constants";
import axios from "axios";

export async function getCurrentUser() {
  const jwt = localStorage.getItem("jwt_token");
  try {
    const resp = await axios.get(`${ENDPOINT}/current-user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    throw new Error("jwt_token is expired");
  }
}
