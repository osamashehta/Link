import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiServiceCall from "@/lib/api/apiServiceCall";
import { toast } from "react-toastify";
type TAddComment = {
  content: string;
  post: string;
};
const AddComment = ({ token, post }: { token: string; post: string }) => {
  const { register, handleSubmit, watch, reset } = useForm<TAddComment>();
  const onSubmit = (data: TAddComment) => {
    const commentData = {
      content: data.content,
      post: post,
    };
    mutate(commentData);
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
          Comment
        </Button>
      )}
    </form>
  );
};

export default AddComment;
