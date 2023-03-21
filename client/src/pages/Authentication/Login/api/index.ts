import { ENDPOINT } from "./../../../../utils/constants";
import { I_LOG_INFO } from "../types";
import React from "react";
import { FormEvent } from "react";
import axios from "axios";

export async function loginApiCall(
  e: FormEvent<HTMLInputElement>,
  logInfo: I_LOG_INFO
) {
  const resp = await axios.post(`${ENDPOINT}/sign-in`, logInfo);
  console.log("token: ", resp.data.user.token);
  localStorage.setItem("jwt_token", resp.data.user.token);
  return resp;
}
