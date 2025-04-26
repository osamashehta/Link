"use client";
import apiServiceCall from "@/lib/api/apiServiceCall";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Post, User } from "@/lib/types/types";
import PostCard from "@/components/PostCard/PostCard";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import CreatePost from "@/components/CreatePost/CreatePost";


const HomePage = ({ token, user }: { token: string, user: User }) => {
  const { ref, inView } = useInView();
  const [totalPage, setTotalPage] = useState<number | null>(null);
  const { data: pagination, isLoading: paginationLoading } = useQuery({
    queryKey: ["pagination"],
    queryFn: () =>
      apiServiceCall({
        endPoint: `posts?page=1&limit=10`,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }),
  });
  useEffect(() => {
    if (pagination) {
      setTotalPage(pagination?.data?.paginationInfo?.numberOfPages);
      console.log("totalPage", totalPage);
    }
  }, [pagination, totalPage]);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feedPosts"],
      enabled: totalPage !== null,
      initialPageParam: totalPage,

      queryFn: ({ pageParam }) =>
        apiServiceCall({
          endPoint: `posts?page=${pageParam}&limit=10`,
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }).then((response) => ({
          ...response.data,
        })),
      getNextPageParam: (lastPage) => {
        return lastPage.paginationInfo?.prevPage ?? undefined;
      },
    });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      console.log("in view", inView);

      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-1 max-w-[450px] w-[95%] mx-auto my-4">
    <CreatePost user={user} />
        {isLoading ||
          (paginationLoading &&
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-8 mt-4 w-full  "
              >
                <Skeleton className="h-14 w-14 rounded-full bg-white shadow" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px] bg-white shadow " />
                  <Skeleton className="h-6 w-[200px] bg-white shadow" />
                </div>
              </div>
            )))}

        {data?.pages?.map((page) =>
          page.posts.map((post: Post) => (
            <>
              <PostCard token={token} key={post._id} post={post} ref={ref} />
            </>
          ))
        )}
        <div>{isFetchingNextPage && "Loading...."}</div>
      </div>
    </>
  );
};

export default HomePage;
