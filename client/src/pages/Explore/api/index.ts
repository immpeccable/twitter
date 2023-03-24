import { I_PROFILE } from "./../../../contexts/FeedContext/types";
import { ENDPOINT } from "./../../../utils/constants";
import axios, { AxiosResponse } from "axios";
export async function exploreUsers(
  name: string
): Promise<AxiosResponse<I_PROFILE[], any>> {
  const jwt = localStorage.getItem("jwt_token");
  console.log("explore jwt: ", jwt);
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
