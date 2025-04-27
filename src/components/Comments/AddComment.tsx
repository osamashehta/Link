import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiServiceCall from "@/lib/api/apiServiceCall";
import { toast } from "react-toastify";
import { TComments } from "@/lib/types/types";
import { useForm } from "react-hook-form";
type TAddComment = {
  content: string;
  post: string;
};
const AddComment = ({
  token,
  post,
  comments,
  commentId,
  setEditComment,
  editComment,
}: {
  token: string;
  post: string;
  comments: TComments[];
  commentId: string;
  setEditComment: (editComment: boolean) => void;
  editComment: boolean;
}) => {
  const { register, handleSubmit, watch, reset } = useForm<TAddComment>({
    defaultValues: {
      content:
        comments.find((comment) => comment._id === commentId)?.content || "",
    },
  });
  const onSubmit = (data: TAddComment) => {
    const commentData = {
      content: data.content,
      post: post,
    };
    console.log("commentId.......", commentId);
    console.log("commentData.......", commentData);
    if (commentId) {
      updateComment(data.content);
    } else {
      mutate(commentData);
    }
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (commentData: TAddComment) =>
      apiServiceCall({
        endPoint: "comments",
        method: "POST",
        body: commentData,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }),
    onSuccess: (response: { data: { message: string } }) => {
      console.log("response.....", response);
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      reset();
    },
    onError: (response: { data: { error: string } }) => {
      console.log("response.....", response);
      toast.error(response.data.error);
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: (commentData: string) =>
      apiServiceCall({
        endPoint: `comments/${commentId}`,
        method: "PUT",
        body: {
          content: commentData,
        },
        headers: {
          token: token,
        },
      }),
    onSuccess: (response: { data: { message: string } }) => {
      console.log("response.....", response);
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      setEditComment(false);
    },
    onError: (response: { data: { error: string } }) => {
      console.log("response.....", response);
      toast.error(response.data.error);
    },
  });
  useEffect(() => {
    if (commentId) {
      reset({
        content:
          comments.find((comment) => comment._id === commentId)?.content || "",
      });
    }
  }, [reset, commentId, comments]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-sm items-center space-x-2 my-2"
    >
      <Input
        {...register("content")}
        type="text"
        placeholder="Add a comment..."
        className="border-gray-400"
      />
      {watch("content") && (
        <Button type="submit" className="bg-blue-500 text-white cursor-pointer">
          {editComment ? "Update" : "Comment"}
        </Button>
      )}
    </form>
  );
};

export default AddComment;
