import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { exploreUsers } from "./api";
import { FeedContext } from "../../contexts/FeedContext";
import SearchIcon from "../../utils/images/search.png";
import useDebounceValue from "./utils/useDebounceValue";
import { I_PROFILE } from "../../contexts/FeedContext/types";
import { Link } from "react-router-dom";
import { ABSOLUTE_PATH } from "../../utils/constants";

export const Explore = () => {
  const { feed } = useContext(FeedContext);
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearchValue = useDebounceValue({
    value: searchValue,
    delay: 300,
  });
  const {
    data: users,
    status,
    error,
    refetch,
  } = useQuery({
    queryFn: () => {
      console.log("fetching userrs...");
      return exploreUsers(debouncedSearchValue);
    },
    queryKey: ["explore-users", debouncedSearchValue],
    enabled: searchValue !== "",
  });

  return (
    <section className="p-6">
      <div className="inline-flex gap-4 w-full items-center">
        <img
          src={feed.of?.image_url}
          alt="profile image"
          className="w-8 h-8 rounded-full border-black border-2"
        />
        <img
          src={SearchIcon}
          alt="search icon"
          className="w-4 h-4 translate-x-12 pointer-events-none"
        />
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="bg-white bg-opacity-[0.07] rounded-full text-white pl-12 py-2 focus:outline-blue-600 focus:outline-2"
        />
      </div>

      <div className="grid grid-cols-1 mt-8">
        {users?.data.map((user: I_PROFILE) => (
          <Link to={`${ABSOLUTE_PATH}/profile/${user.user_name}`}>
            <div className="flex flex-row gap-4 py-2">
              <img
                className="w-12 h-12 rounded-full border-black border-2"
                src={user.image_url}
                alt="explore-image"
              />
              <div className="flex flex-col">
                <h2 className="text-white font-semibold">
                  {user.profile_name}
                </h2>
                <h4 className="opacity-60 text-sm">{"@" + user.user_name}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
