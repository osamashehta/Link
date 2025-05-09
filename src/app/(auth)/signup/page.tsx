import SignUpPage from "@/components/pages/SignUpPage/SignUpPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup",
};


const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  if (token) {
    redirect("/");
  }
  return <SignUpPage />;
};

export default page;
