import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { exploreUsers } from "./api";
import { FeedContext } from "../../contexts/FeedContext";
import SearchIcon from "../../utils/images/search.png";
import useDebounceValue from "./utils/useDebounceValue";

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
  console.log(users);

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
    </section>
  );
};
