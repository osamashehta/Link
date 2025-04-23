import { useTimeAgo } from "@/hooks/useTimeAgo";
import { Post } from "@/lib/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ForwardedRef } from "react";
import Comments from "../Comments/Comments";

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
      <div className="w-full bg-white  pt-4 rounded-t-[10px] flex flex-col justify-center items-start gap-4 ">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex justify-start items-center gap-1">
            <Avatar>
              <AvatarImage src={post?.image} alt={post?.user?.name} />
              <AvatarFallback className="bg-slate-950 text-white  ">
                {post?.user?.name.split(" ").map((name) => name[0])}
              </AvatarFallback>
            </Avatar>
            <p>{post?.user?.name}</p>
          </div>
          <p>{createdAtAgo}</p>
        </div>
        <p className="text-start font-light px-4">{post?.body}</p>


        {post.comments.slice(0, 1).map((comment) => (
          <Comments key={comment._id} comments={comment} />
        ))}

      </div>
      <div ref={ref}></div>
    </>
  );
};

export default PostCard;
