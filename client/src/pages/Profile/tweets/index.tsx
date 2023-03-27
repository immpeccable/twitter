import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { Tweet } from "../../../Components/Tweet/indes";
import { I_PROFILE, I_TWEET } from "../../../utils/types";
import { getTweetsOfUser, getUserByUsername } from "../api";

type Props = {
  from: I_PROFILE;
};

export const TweetsOfUser = () => {
  const { user_name } = useParams();

  const {
    data: user,
    status: userStatus,
    error: userError,
  } = useQuery({
    queryFn: () => getUserByUsername(user_name!),
    queryKey: ["get-user", user_name],
  });

  const {
    data: tweets,
    status: tweetsStatus,
    error: tweetsError,
  } = useQuery({
    queryFn: () => getTweetsOfUser(user_name!),
    queryKey: ["tweets", user_name],
  });

  return (
    <section className="grid grid-cols-1 mb-12">
      {tweets?.map((tweet: I_TWEET, index: number) => {
        return <Tweet key={index} tweet={{ ...tweet, from: user! }} />;
      })}
    </section>
  );
};
