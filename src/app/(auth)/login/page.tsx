import LoginPage from "@/components/pages/LoginPage/LoginPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Page = async() => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  if (token) {
    redirect("/");
  }

  return (
    <>
      <LoginPage />
    </>
  );
};

export default Page;
