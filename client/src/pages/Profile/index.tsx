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

  function isAlreadyFollowing(): boolean {
    if (visitedProfile?.data && owner?.data) {
      const vpr = visitedProfile.data;
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
      follow(owner?.data?.user_name!, visitedProfile?.data?.user_name!),
    mutationKey: ["follow"],
    onError: (er) => console.log(JSON.stringify(er)),
    onSuccess: () => {
      refetchVisitedProfile();
      refetchOwner();
    },
  });

  const unFollowMutation = useMutation({
    mutationKey: ["unfollow"],
  });

  return (
    <div>
      <header className="inline-flex box-border h-[48px] items-center px-4 gap-12">
        <Link className="cursor-pointer" to={`${ABSOLUTE_PATH}/home`}>
          <img src={BackIcon} alt="back icon" />
        </Link>
        <div className="flex flex-col">
          <h2 className="text-white opacity-100 font-semibold">
            {visitedProfile?.data?.profile_name}
          </h2>
          <h4 className="opacity-60 text-sm">486 Tweet</h4>
        </div>
      </header>
      <section>
        <img
          className="w-[100vw] h-[25vh] object-cover"
          src={visitedProfile?.data?.image_url}
          alt="kapak fotosu"
        />
        <img
          className="w-20 h-20 -translate-y-10 rounded-full border-[2px] ml-4 border-black"
          src={visitedProfile?.data?.image_url}
          alt="profile image"
        />
        <div className="flex flex-row justify-between">
          <div className="px-4 -translate-y-4">
            <h2 className="font-semibold">
              {visitedProfile?.data.profile_name}
            </h2>
            <h3 className="text-sm opacity-60">
              {visitedProfile?.data.user_name}
            </h3>
          </div>
          {owner?.data?.user_name !== visitedProfile?.data?.user_name && (
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
      <section className="grid grid-cols-1 mb-12">
        {visitedProfile?.data &&
          visitedProfile?.data?.tweets?.map((tweet: I_TWEET) => {
            return <Tweet tweet={{ ...tweet, from: visitedProfile?.data }} />;
          })}
      </section>
    </div>
  );
};
