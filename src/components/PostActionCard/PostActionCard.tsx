import apiServiceCall from "@/lib/api/apiServiceCall";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post, User } from "@/lib/types/types";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ReportModal from "../ReportModal/ReportModal";
import CreateModal from "../CreatePost/CreateModal";

const PostActionCard = ({
  post,
  token,
  setShowEditPost,
  showEditPost,
  isOwner,
  user,
}: {
  post: Post;
  token: string;
  setShowEditPost: (showEditPost: boolean) => void;
  showEditPost: boolean;
  isOwner: boolean;
  user: User;
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [reportReason, setReportReason] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowEditPost(false);
      }
    };
    if (showEditPost) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showEditPost, setShowEditPost]);
  const handleDelete = (id: string) => {
    setShowEditPost(true);
    mutate(id);
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) =>
      apiServiceCall({
        endPoint: `posts/${id}`,
        method: "DELETE",
        headers: {
          token: token,
        },
      }),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      setShowEditPost(false);
    },
    onError: () => {
      toast.error("Error deleting post");
    },
  });

  return (
    <>
      <div
        className="relative z-[200] flex flex-col items-center justify-center gap-2"
        ref={cardRef}
      >
        {/* <div
          className="cursor-pointer hover:bg-gray-300/[0.4] rounded-full p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#dc8d8d"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
            />
          </svg>
        </div> */}
        {showEditPost && (
          <div className="absolute top-2 right-1 shadow-lg bg-white rounded-md p-2 flex flex-col gap-2">
            {isOwner ? (
              <>
                <div
                  onClick={() => setEditPost(true)}
                  className="flex items-center justify-start gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="808080"
                      d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
                    />
                  </svg>
                  <p>Edit</p>
                  {editPost && (
                    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50dvw] mx-auto min-h-[80dvh] rounded-[10px] shadow-lg  bg-white flex justify-center items-center z-50">
                      <CreateModal
                        isEdit={true}
                        post={post}
                        user={user}
                        setShowModal={setShowEditPost}
                        token={token}
                      />
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center justify-start gap-2 cursor-pointer"
                  onClick={() => handleDelete(post._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="808080"
                      d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"
                    />
                  </svg>
                  <p>Delete</p>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => setReportReason(true)}
                  className="flex items-center justify-start gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#808080"
                      d="M12 16.423q.262 0 .439-.177q.176-.177.176-.438t-.177-.439t-.438-.177t-.438.177t-.177.439t.177.438t.438.177m-.5-2.961h1V7.384h-1zM8.673 20L4 15.336V8.673L8.664 4h6.663L20 8.664v6.663L15.336 20zm.427-1h5.8l4.1-4.1V9.1L14.9 5H9.1L5 9.1v5.8zm2.9-7"
                    />
                  </svg>
                  <p>Report</p>
                </div>
                <ReportModal
                  reportReason={reportReason}
                  setReportReason={setReportReason}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PostActionCard;
