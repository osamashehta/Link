import React, { useEffect, useRef, useState } from "react";

const CardEditAndDelete = ({
  setEditComment,
}: {
  commentId: string;
  setEditComment: (editComment: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);
  const handleUpdate = () => {
    setEditComment(true);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2"
      ref={cardRef}
    >
      <div
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
      </div>
      {isOpen && (
        <div className="absolute top-8 right-1 shadow-md bg-white rounded-md p-2 flex flex-col gap-2">
          <div
            className="flex items-center justify-start gap-2"
            onClick={() => handleUpdate()}
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
          </div>
          {/* <div className="flex items-center justify-start gap-2" onClick={() => handleUpdate(commentId)}>
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
          </div> */}
        </div>
      )}
    </div>
  );
};

export default CardEditAndDelete;
