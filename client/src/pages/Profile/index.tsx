import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Tweet } from "../../Components/Tweet/indes";
import { FeedContext } from "../../contexts/FeedContext";
import { I_TWEET } from "../../contexts/FeedContext/types";
import { ABSOLUTE_PATH } from "../../utils/constants";
import BackIcon from "../../utils/images/back.png";
import { getTweetsOfUser } from "./api";

export const Profile = () => {
  const { feed } = useContext(FeedContext);

  const {
    data: tweets,
    status,
    error,
  } = useQuery({
    queryFn: getTweetsOfUser,
    queryKey: ["get-tweets-of-user"],
  });

  return (
    <div>
      <header className="inline-flex box-border h-[48px] items-center px-4 gap-12">
        <Link className="cursor-pointer" to={`${ABSOLUTE_PATH}/home`}>
          <img src={BackIcon} alt="back icon" />
        </Link>
        <div className="flex flex-col">
          <h2 className="text-white opacity-100 font-semibold">
            {feed.of?.profile_name}
          </h2>
          <h4 className="opacity-60 text-sm">486 Tweet</h4>
        </div>
      </header>
      <section>
        <img
          className="w-[100vw] h-[25vh] object-cover"
          src={feed.of?.image_url}
          alt="kapak fotosu"
        />
        <img
          className="w-20 h-20 -translate-y-10 rounded-full border-[2px] ml-4 border-black"
          src={feed.of?.image_url}
          alt="profile image"
        />
        <div className="px-4 -translate-y-4">
          <h2 className="font-semibold">{feed.of?.profile_name}</h2>
          <h3 className="text-sm opacity-60">{feed.of?.user_name}</h3>
        </div>
      </section>
      <section className="grid grid-cols-1">
        {tweets?.data.map((tweet: I_TWEET) => {
          return <Tweet tweet={{ ...tweet, from: feed.of! }} />;
        })}
      </section>
    </div>
  );
};
