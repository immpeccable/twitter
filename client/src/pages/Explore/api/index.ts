import { I_PROFILE } from "../../../utils/types";
import { ENDPOINT } from "./../../../utils/constants";
import axios, { AxiosResponse } from "axios";
export async function exploreUsers(
  name: string,
  signal: AbortSignal
): Promise<AxiosResponse<I_PROFILE[], any>> {
  const jwt = localStorage.getItem("jwt_token");
  const response = await axios.get(`${ENDPOINT}/explore-users`, {
    params: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
}
