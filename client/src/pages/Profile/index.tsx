import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { getCurrentUser } from "../../utils/api";
import { Tweet } from "../../Components/Tweet/indes";
import { ABSOLUTE_PATH } from "../../utils/constants";
import BackIcon from "../../utils/images/back.png";
import { I_TWEET } from "../../utils/types";
import { follow, getUserByUsername } from "./api";

export const Profile = () => {
  const { user_name } = useParams();

  const {
    data: visitedProfile,
    status: visitedProfileStatus,
    error: visitedProfileError,
    refetch: refetchVisitedProfile,
  } = useQuery({
    queryFn: () => getUserByUsername(user_name!),
    queryKey: ["get-user-by-username"],
  });

  const {
    status,
    error,
    data: owner,
    refetch: refetchOwner,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["current-user-profile"],
  });

  const followMutation = useMutation({
    mutationFn: () =>
      follow(owner?.data?.user_name!, visitedProfile?.user_name!),
    mutationKey: ["follow"],
    onError: (er) => console.log(JSON.stringify(er)),
    onSuccess: () => {
      refetchVisitedProfile();
      refetchOwner();
    },
  });

  function isAlreadyFollowing(): boolean {
    if (visitedProfile && owner?.data) {
      const vpr = visitedProfile;
      const own = owner.data;
      console.log(
        "visited profile followers: ",
        vpr.followers,
        "main profiel: ",
        own
      );
      let isFollowing = false;

      for (let i = 0; i < vpr.followers.length; i++) {
        if (vpr.followers[i].user_name == own.user_name) {
          isFollowing = true;
          break;
        }
      }
      return isFollowing;
    }
    return false;
  }

  function getFormattedDate(dateArray: number[]) {
    if (!dateArray) {
      return "";
    }
    const dateObject = new Date(
      Date.UTC(
        dateArray[0],
        dateArray[1],
        dateArray[2],
        dateArray[3],
        dateArray[4],
        dateArray[5]
      )
    ); // convert the array to a Date object
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    });
    const formattedDate = formatter.format(dateObject);
    return formattedDate;
  }

  console.log("location: ", window.location.pathname);

  return (
    <div>
      <header
        className="inline-flex w-full box-border h-[48px] items-center
       px-4 gap-12 bg-opacity-90 bg-[#16202a] fixed top-0"
      >
        <Link className="cursor-pointer" to={`${ABSOLUTE_PATH}/home`}>
          <img src={BackIcon} alt="back icon" />
        </Link>
        <div className="flex flex-col">
          <h2 className="text-white opacity-100 font-semibold">
            {visitedProfile?.profile_name}
          </h2>
          <h4 className="opacity-60 text-sm">
            {visitedProfile?.tweets?.length} Tweet
          </h4>
        </div>
      </header>
      <section>
        <img
          className="w-[100vw] h-[25vh] object-cover"
          src={visitedProfile?.image_url}
          alt="kapak fotosu"
        />
        <img
          className="w-20 h-20 -translate-y-10 rounded-full border-[2px] ml-4 border-black"
          src={visitedProfile?.image_url}
          alt="profile image"
        />
        <div className="flex flex-row justify-between">
          <div className="px-4 -translate-y-4">
            <h2 className="font-semibold">{visitedProfile?.profile_name}</h2>
            <h3 className="text-sm opacity-60">{visitedProfile?.user_name}</h3>
            <div className="inline-flex mt-2">
              {visitedProfile?.tweets!.length! > 0 && (
                <h3 className="opacity-70 text-sm">
                  Joined{" "}
                  {getFormattedDate(visitedProfile?.tweets![0].createdDate!)}
                </h3>
              )}
            </div>
            <div className="flex flex-row items-center gap-4 mt-4">
              <Link
                to="/followings"
                className="flex items-center cursor-pointer"
              >
                <h2 className="">
                  <span className="opacity-100 text-white text-opacity-100 font-semibold">
                    {visitedProfile?.followings.length}
                  </span>{" "}
                  <span className="opacity-60">followings</span>
                </h2>
              </Link>
              <Link
                to="/followers"
                className="flex items-center cursor-pointer"
              >
                <h2 className="">
                  <span className="opacity-100 text-white text-opacity-100 font-semibold">
                    {visitedProfile?.followers.length}
                  </span>{" "}
                  <span className="opacity-60">followers</span>
                </h2>
              </Link>
            </div>
          </div>
          {owner?.data?.user_name !== visitedProfile?.user_name && (
            <div className="-translate-y-16 px-4">
              {isAlreadyFollowing() ? (
                <button
                  className="py-2 px-4 bg-black border-white border-opacity-30 border-[1px]
                 rounded-full font-semibold text-white opacity-100"
                >
                  Takip ediliyor
                </button>
              ) : (
                <button
                  onClick={() => followMutation.mutate()}
                  className="py-2 px-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 active:bg-slate-300"
                >
                  Takip et
                </button>
              )}
            </div>
          )}
        </div>
      </section>
      <nav className="w-full flex justify-between items-center border-b-[1px] border-gray-300 border-opacity-20">
        <Link
          className="hover:bg-black hover:bg-opacity-10 grow text-center py-4 font-semibold"
          to={`${ABSOLUTE_PATH}/profile/${user_name}`}
        >
          <span
            className={
              window.location.pathname.endsWith(`${user_name}`)
                ? "text-white opacity-100 border-b-4 border-blue-600 py-4 rounded-sm font-semibold"
                : "text-white opacity-60 font-semibold"
            }
          >
            Tweets
          </span>
        </Link>
        <Link
          className="hover:bg-black hover:bg-opacity-10 grow text-center py-4 font-semibold"
          to={`${ABSOLUTE_PATH}/profile/${user_name}/likes`}
        >
          <span
            className={
              window.location.pathname.endsWith(`${user_name}/likes`)
                ? "text-white opacity-100 border-b-4 border-blue-600 py-4 rounded-sm font-semibold"
                : "text-white opacity-60 font-semibold"
            }
          >
            Likes
          </span>
        </Link>
        <Link
          className="hover:bg-black hover:bg-opacity-10 grow text-center py-4 font-semibold"
          to={`${ABSOLUTE_PATH}/profile/${user_name}/replies`}
        >
          <span
            className={
              window.location.pathname.endsWith(`${user_name}/replies`)
                ? "text-white opacity-100 border-b-4 border-blue-600 py-4 rounded-sm font-semibold"
                : "text-white opacity-60 font-semibold"
            }
          >
            Replies
          </span>
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};
