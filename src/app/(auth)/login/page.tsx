import LoginPage from "@/components/pages/LoginPage/LoginPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Page = async() => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
console.log("token login page",token)
  if (token) {
    console.log("token login page if inside",token)
    redirect("/");
  }

  return (
    <>
      <LoginPage />
    </>
  );
};

export default Page;
