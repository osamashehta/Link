import { TComments } from "@/lib/types/types";
import React, { useState } from "react";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CardEditAndDelete from "./CardEditAndDelete";
import AddComment from "./AddComment";

const Comments = ({
  commentId,
  comments,
  token,
}: {
  commentId: string;
  comments: TComments;
  token: string;
}) => {
  const createdAtAgo = useTimeAgo(comments?.createdAt);
  console.log("comments from comments", comments);
  const [editComment, setEditComment] = useState(false);
  return (
    <>
      {!editComment ? (
        <div className="w-full   py-1  border-t border-t-gray-300  bg-gray-100 ">
          <div className="flex items-center justify-between w-full text-sm text-gray-500">
            <div className="flex justify-start items-center gap-1 ">
              <Avatar>
                <AvatarImage
                  src={comments?.commentCreator?.photo}
                  alt={comments?.commentCreator?.name}
                />
                <AvatarFallback className="bg-slate-950 text-white  ">
                  {comments?.commentCreator?.name
                    .split(" ")
                    .map((name) => name[0])}
                </AvatarFallback>
              </Avatar>
              <p>{comments?.commentCreator?.name}</p>
            </div>
            <div>
              <p>{createdAtAgo}</p>{" "}
              <CardEditAndDelete
                setEditComment={setEditComment}
                commentId={commentId}
              />
            </div>
          </div>
          <p className=" w-full text-md text-gray-500 ps-10 pt-2">
            {comments?.content}
          </p>
        </div>
      ) : (
        <AddComment
          token={token}
          post={comments?.post}
          comments={[comments]}
          commentId={commentId}
          setEditComment={setEditComment}
          editComment={editComment}
        />
      )}
    </>
  );
};

export default Comments;
