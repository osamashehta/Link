import Image from "next/image";
import React, { useState } from "react";
import { Post, User } from "@/lib/types/types";
import CreateModal from "./CreateModal";

const CreatePost = ({
  user,
  token,
  post,
}: {
  user: User;
  token: string;
  post?: Post;
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="w-full h-[80px] bg-white rounded-[10px] px-3 py-2 shadow-md flex  items-center justify-center gap-2"
        onClick={() => setShowModal(true)}
      >
        <Image
          src={user?.photo}
          alt="user"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="rounded-[20px] border border-slate-300 px-4 py-2 w-full text-gray-700 cursor-pointer">
          Start a post
        </div>
      </div>
      {showModal && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80dvw] mx-auto min-h-[80dvh] rounded-[10px] shadow-lg  bg-white flex justify-center items-center z-50">
          <CreateModal
            post={post}
            user={user}
            setShowModal={setShowModal}
            token={token}
          />
        </div>
      )}
    </>
  );
};

export default CreatePost;
