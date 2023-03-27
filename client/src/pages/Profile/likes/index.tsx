import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { Tweet } from "../../../Components/Tweet/indes";
import { I_TWEET } from "../../../utils/types";
import { getLikesOfUser, getUserByUsername } from "../api";

export const LikesOfUser = () => {
  const { user_name } = useParams();

  const {
    data: tweets,
    status,
    error,
  } = useQuery({
    queryFn: () => getLikesOfUser(user_name!),
    queryKey: ["likes", user_name],
  });

  const {
    data: user,
    status: userStatus,
    error: userError,
  } = useQuery({
    queryFn: () => getUserByUsername(user_name!),
    queryKey: ["get-user", user_name],
  });

  return (
    <section className="grid grid-cols-1 mb-12">
      {user &&
        tweets?.map((tweet: I_TWEET, index: number) => {
          return (
            <Tweet
              key={index}
              tweet={{
                ...tweet,
                from: user,
              }}
            />
          );
        })}
    </section>
  );
};
