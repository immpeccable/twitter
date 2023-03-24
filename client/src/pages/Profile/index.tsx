import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getCurrentUser } from "../../utils/api";
import { Tweet } from "../../Components/Tweet/indes";
import { ABSOLUTE_PATH } from "../../utils/constants";
import BackIcon from "../../utils/images/back.png";
import { I_TWEET } from "../../utils/types";
import { follow, getTweetsOfUser, getUserByUsername } from "./api";

export const Profile = () => {
  const { user_name } = useParams();

  const {
    data: user,
    status: userStatus,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryFn: () => getUserByUsername(user_name!),
    queryKey: ["get-user-by-username", user_name],
  });

  const {
    status,
    error,
    data: owner,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["current-user-profile"],
    onError: () => localStorage.removeItem("jwt_token"),
    refetchInterval: 1000,
  });

  const followMutation = useMutation({
    mutationFn: () => follow(owner?.data?.user_name!, user?.data?.user_name!),
    mutationKey: ["follow"],
    onError: (er) => console.log(JSON.stringify(er)),
  });

  return (
    <div>
      <header className="inline-flex box-border h-[48px] items-center px-4 gap-12">
        <Link className="cursor-pointer" to={`${ABSOLUTE_PATH}/home`}>
          <img src={BackIcon} alt="back icon" />
        </Link>
        <div className="flex flex-col">
          <h2 className="text-white opacity-100 font-semibold">
            {user?.data?.profile_name}
          </h2>
          <h4 className="opacity-60 text-sm">486 Tweet</h4>
        </div>
      </header>
      <section>
        <img
          className="w-[100vw] h-[25vh] object-cover"
          src={user?.data?.image_url}
          alt="kapak fotosu"
        />
        <img
          className="w-20 h-20 -translate-y-10 rounded-full border-[2px] ml-4 border-black"
          src={user?.data?.image_url}
          alt="profile image"
        />
        <div className="flex flex-row justify-between">
          <div className="px-4 -translate-y-4">
            <h2 className="font-semibold">{user?.data.profile_name}</h2>
            <h3 className="text-sm opacity-60">{user?.data.user_name}</h3>
          </div>
          {owner?.data?.user_name !== user?.data?.user_name && (
            <div className="-translate-y-16 px-4">
              <button
                onClick={() => followMutation.mutate()}
                className="py-2 px-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 active:bg-slate-300"
              >
                Takip Et
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="grid grid-cols-1 mb-12">
        {user?.data &&
          user?.data?.tweets?.map((tweet: I_TWEET) => {
            return <Tweet tweet={{ ...tweet, from: user?.data }} />;
          })}
      </section>
    </div>
  );
};
