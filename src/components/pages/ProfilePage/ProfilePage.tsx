"use client";
import apiServiceCall from "@/lib/api/apiServiceCall";

import { Post, User } from "@/lib/types/types";
import PostCard from "@/components/PostCard/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = ({token,user}:{token:string,user:User}) => {
  
  console.log("user._id",user._id);
  

  const { data, isLoading } =
    useQuery({
      queryKey: ["myPosts"],

      queryFn: () =>
        apiServiceCall({
          endPoint: `users/${user._id}/posts?limit=50`,
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }).then((response) => ({
          ...response.data,
        })),
    
    });

    

  console.log("data........",data);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start max-w-[800px] w-[95%] mx-auto my-4">
    <div className="max-w-[450px] w-[95%] mx-auto h-[230px]">
      <ProfileCard user={user} profile={true}/>
    </div>
    <div className="flex flex-col justify-center items-center gap-1 max-w-[450px] w-[95%] mx-auto my-4">
      {isLoading &&
        (
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

{data?.posts.length > 0 ? (

    data?.posts?.map((post:Post) =>
        <>
          <PostCard token={token} key={post._id} post={post}/>
        </>
    )
) : (
    <div className="text-center mt-4 text-[15px] font-medium">{"You haven't published any posts yet."}</div>
)}
    </div>
  </div>
  )
}

export default ProfilePage
