import LoginPage from "@/components/pages/LoginPage/LoginPage";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

const Page = async () => {
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
