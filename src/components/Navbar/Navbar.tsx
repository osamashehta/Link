"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
type props = {
  name: string;
  photo: string;
  _id: string;
};
const Navbar = ({ user }: { user: props }) => {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <>
    <div className="bg-white ">

      <div className="flex justify-between  item-center px-4 py-2 h-[80px] shadow-md shadow-slate-100/[0.8] w-[90%] mx-auto">
        <Link
          href="/"
          className="p-2 rounded-[8px] flex items-center "
        >
        <Image src='/logo.png' alt="Link-logo" width={55} height={35}/>
        </Link>
        {/* <input type="search" className='bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'/> */}

        <div className="flex  gap-2 justify-center items-center">
          <div className="flex flex-col items-center justify-between  h-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={36}
              height={36}
              viewBox="0 0 24 24"
            >
              <path
                fill="#155DFC"
                d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"
              ></path>
            </svg>
            <p className="text-[12px] font-medium mt-[-4px]">Home</p>
          </div>

          <div className="flex flex-col items-center justify-between  h-full">
            <Image
              src={user.photo}
              alt="user"
              width={36}
              height={36}
              className=" w-[36px] h-[36px] rounded-full"
            />
            <div className="flex items-center justify-center relative cursor-pointer" onClick={()=> setIsOpen(!isOpen)}>
              <p className="text-[12px] font-medium">Me</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#808080"
                  d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"
                ></path>
              </svg>
            </div>
{isOpen && (

            <div className="w-[200px] h-[230px] absolute top-[96px] right-12">
        <ProfileCard user={user} />
      </div>
)}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
