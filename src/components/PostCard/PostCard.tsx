import { useTimeAgo } from "@/hooks/useTimeAgo";
import { Post } from "@/lib/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ForwardedRef, useState } from "react";
import Comments from "../Comments/Comments";
import AddComment from "../Comments/AddComment";
import Image from "next/image";

const PostCard = ({
  post,
  ref,
  token,
}: {
  post: Post;
  ref: ForwardedRef<HTMLDivElement>;
  token: string;
}) => {
  const createdAtAgo = useTimeAgo(post.createdAt);
  const [showComments, setShowComments] = useState(false);
  const [editComment, setEditComment] = useState(false);

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
        <div className="relative w-full h-[220px] ">
          <Image fill className="object-cover" src={post?.image} alt={post?.user?.name} />
        </div>

        <div className="w-full cursor-pointer flex flex-col items-center justify-center border border-slate-700/[0.4] rounded-[10px] py-1 px-[16px] mt-[-10px] bg-gray-100 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 28 28"
            onClick={() => setShowComments(!showComments)}
          >
            <path
              fill="808080"
              d="M5.75 4.5A2.25 2.25 0 0 0 3.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25H8.5v4.796c0 .203.23.322.396.202l6.928-4.998h6.426a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25zM2 6.75A3.75 3.75 0 0 1 5.75 3h16.5A3.75 3.75 0 0 1 26 6.75v10.5A3.75 3.75 0 0 1 22.25 21h-5.941l-6.535 4.715C8.616 26.55 7 25.723 7 24.295V21H5.75A3.75 3.75 0 0 1 2 17.25z"
            />
          </svg>

          {showComments && (
            <>
              <div className="w-full flex flex-col items-start justify-start gap-2 mt-3">
                {post.comments.length > 0 ? (
                  <>
                    {post.comments.map((comment) => (
                      <Comments
                        key={comment._id}
                        commentId={comment._id}
                        comments={comment}
                        token={token}
                      />
                    ))}
                    <AddComment
                      token={token}
                      post={post._id}
                      comments={post.comments}
                      commentId=""
                      setEditComment={setEditComment}
                      editComment={editComment}
                    />
                  </>
                ) : (
                  <AddComment
                    token={token}
                    post={post._id}
                    comments={post.comments}
                    commentId=""
                    setEditComment={setEditComment}
                    editComment={editComment}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div ref={ref}></div>
    </>
  );
};

export default PostCard;
