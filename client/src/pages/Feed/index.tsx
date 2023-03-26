import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTweet, getCurrentUser, likeTweet } from "../../utils/api";
import { Header } from "../../Components/Header";
import { Tweet } from "../../Components/Tweet/indes";
import { I_TWEET, ObjectId } from "../../utils/types";
import { getFeed } from "./api";

export const Feed = () => {
  const navigate = useNavigate();
  const contextRef = useRef<HTMLTextAreaElement>(null);
  const [tweet, setTweet] = useState<{ context: string }>({
    context: "",
  });

  const [cursor, setCursor] = useState<ObjectId>({
    date: 0,
    timestamp: 0,
  });

  const {
    status,
    error,
    data: user,
    refetch: fetchCurrentUser,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["current-user"],
  });

  const {
    data: infiniteFeed,
    error: infiniteError,
    status: infiniteStatus,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = "" }): Promise<I_TWEET[]> => {
      const resp = await getFeed(pageParam);
      console.log(resp);
      return resp;
    },
    queryKey: ["infinite-feed"],
    getNextPageParam: (lastPage: I_TWEET[]) => {
      if (lastPage && lastPage.length > 0) {
        if (cursor != lastPage[lastPage.length - 1].id) {
          setCursor(lastPage[lastPage.length - 1].id);
        }
        return lastPage[lastPage.length - 1].id;
      }
      return "";
    },
  });

  const CreateTweetMutation = useMutation({
    mutationFn: () => createTweet(tweet),
    onSuccess: () => refetch(),
  });

  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (
        bottomBoundaryRef.current &&
        bottomBoundaryRef.current.getBoundingClientRect().top <=
          window.innerHeight + 500 &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [cursor]);

  if (status == "loading") {
    return (
      <div className="text-white font-bold top-1/2 left-1/2 absolute -translate-x-32 -translate-y-10 w-64 h-20">
        Your feed is loading, please hold on...
      </div>
    );
  }

  if (status == "error") {
    return (
      <button
        className="m-auto absolute left-1/2 box-border w-80 h-20 top-1/2 -translate-x-40 -translate-y-10 rounded-full bg-black text-white font-semibold"
        onClick={() => navigate("/login")}
      >
        Your session is expired, please login again
      </button>
    );
  }
  return (
    <>
      <Header />
      <div className="p-4">
        <section className="flex flex-row w-[90vw] mx-auto border-b-[1px] border-gray-400 border-opacity-60 pb-2">
          <img
            src={user?.data?.image_url}
            className="w-12 h-12 rounded-full border-[2px] border-black"
          />
          <form className="flex flex-col ml-4">
            <textarea
              ref={contextRef}
              placeholder="Neler oluyor"
              className="w-[66vw] outline-none bg-inherit"
              rows={2}
              onChange={(e) => setTweet({ ...tweet, context: e.target.value })}
            />

            <div className="inline-flex justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  CreateTweetMutation?.mutate();
                  contextRef!.current!.value = "";
                }}
                className="bg-blue-500 font-bold text-lg text-white rounded-full w-28 box-border py-2"
              >
                Tweetle
              </button>
            </div>
          </form>
        </section>
        {infiniteFeed?.pages.map((page, index) => (
          <section className="grid grid-cols-1">
            {page.map((tweet: I_TWEET) => (
              <Tweet tweet={tweet} />
            ))}
          </section>
        ))}
        <div ref={bottomBoundaryRef} style={{ height: "10px" }}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </div>
      </div>
    </>
  );
};
