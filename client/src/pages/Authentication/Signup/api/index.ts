import { ENDPOINT } from "./../../../../utils/constants";
import { I_PROFILE } from "./../../../../contexts/FeedContext/types";
import React from "react";
import { FormEvent } from "react";
import axios from "axios";

export async function signUpApiCall(
  e: FormEvent<HTMLInputElement>,
  state: I_PROFILE
) {
  e.preventDefault();
  const resp = await axios.post(`${ENDPOINT}/sign-up`, state);
  console.log(resp);
}
