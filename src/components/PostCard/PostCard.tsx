import { useTimeAgo } from "@/hooks/useTimeAgo";
import { Post } from "@/lib/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ForwardedRef } from "react";

const PostCard = ({
  post,
  ref,
}: {
  post: Post;
  ref: ForwardedRef<HTMLDivElement>;
}) => {
  const createdAtAgo = useTimeAgo(post.createdAt);

  return (
    <>
      <div className="w-full bg-white p-4 rounded-[10px] flex flex-col justify-center items-start gap-4 ">
        <div className="flex items-center justify-between w-full ">
          <div className="flex justify-start items-center gap-1">
            <Avatar>
              <AvatarImage src={post?.image} alt={post?.user?.name} />
              <AvatarFallback>
                {post?.user?.name.split(" ").map((name) => name[0])}
              </AvatarFallback>
            </Avatar>
            <p>{post?.user?.name}</p>
          </div>
          <p>{createdAtAgo}</p>
        </div>
        <p className="text-start font-light ">{post?.body}</p>
      </div>
      <div ref={ref}></div>
    </>
  );
};

export default PostCard;
