import { ENDPOINT } from "./../../../utils/constants";
import axios from "axios";
export async function exploreUsers(name: string) {
  const jwt = localStorage.getItem("jwt_token");
  console.log("hwt: ", jwt);
  const response = await axios.get(`${ENDPOINT}/explore-users`, {
    params: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log("response: ", response);
  return response;
}
