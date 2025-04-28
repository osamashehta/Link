import { User } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = ({
  user,
  profile,
  nav,
}: {
  user: User;
  profile?: boolean;
  nav?: boolean;
}) => {
  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.href = "/login";
    }
  };
  return (
    <div className="bg-white w-full h-full rounded-[14px] shadow-lg flex flex-col justify-start items-center py-4">
      <Image
        src={user.photo || "/imgPlaceholder.svg"}
        alt={"ProfileName"}
        width={100}
        height={100}
        className="rounded-full"
      />
      <p className="mt-1 text-[16px] font-medium">{user.name}</p>
      <p className="my-1 text-[14px] font-medium">Software Engineer</p>
      {!profile && (
        <div className="flex justify-center items-center gap-2">
          <Link
            href="/profile"
            className="rounded-[8px] flex justify-center items-center border border-gray-400/[0.4] px-3 py-1 text-[18px] font-light"
          >
            View profile
          </Link>
          {nav && (
            <svg
              onClick={handleLogout}
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#EE0028"
                d="M12 3.25a.75.75 0 0 1 0 1.5a7.25 7.25 0 0 0 0 14.5a.75.75 0 0 1 0 1.5a8.75 8.75 0 1 1 0-17.5"
              />
              <path
                fill="#EE0028"
                d="M16.47 9.53a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H10a.75.75 0 0 1 0-1.5h8.19z"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
