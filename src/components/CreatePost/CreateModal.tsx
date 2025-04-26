import React, { useEffect, useState } from "react";
import { User } from "@/lib/types/types";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/api/apiServiceCall";
import { toast } from "react-toastify";
type FormData = {
  body: string;
  image?: File | null;
};
const CreateModal = ({
  user,
  setShowModal,
  token,
}: {
  user: User;
  setShowModal: (showModal: boolean) => void;
  token: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  console.log("getValues    ", getValues());
  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append("body", data.body);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };

  // Clean up the object URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      apiServiceCall({
        endPoint: "posts",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      }),
    onSuccess: (data) => {
      console.log("post created", data);
      toast.success("Post created successfully");
      setShowModal(false);
    },
    onError: (error) => {
      console.log("error creating post", error);
      toast.error("Error creating post");
    },
  });

  return (
    <div className="w-full h-full flex flex-col gap-2 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={user?.photo}
            alt="user"
            width={60}
            height={60}
            className="rounded-full"
          />
          <p>{user?.name}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          onClick={() => setShowModal(false)}
        >
          <path
            fill="#808080"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          />
        </svg>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder={`What's on your mind, ${user?.name}?`}
          {...register("body", { required: true })}
          className="flex items-start justify-start w-full h-[250px] resize-none outline-none border-none border-b-2 border-gray-300 bg-gray-100/[0.5] px-6 py-2"
        ></textarea>
        {errors.body && <span>{errors.body.message}</span>}
        <div className="my-2 flex items-center justify-between">
          <div className="w-[80px] h-[50px]  relative border border-emerald-700/[0.4] rounded-[3px] flex items-center justify-center">
            <input
              type="file"
              {...register("image")}
              className="invisible w-full h-full"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            <label
              htmlFor="image"
              className="cursor-pointer  w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="preview"
                  fill
                  className="object-cover p-1"
                />
              ) : (
                <p className="text-emerald-600  w-full h-full text-[14px] flex items-center justify-center ">
                  Choose file
                </p>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-[24px] text-[16px] cursor-pointer"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateModal;
