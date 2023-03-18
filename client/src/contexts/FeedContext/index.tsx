import React, { createContext } from "react";
import { I_FEED } from "./types";
import { dummyFeed } from "./utils";

export const FeedContext = React.createContext<I_FEED>(dummyFeed);


