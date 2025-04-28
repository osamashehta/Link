import Navbar from "@/components/Navbar/Navbar";
// import LoginPage from "@/components/pages/LoginPage/LoginPage";
import { fetchUserProfile } from "@/lib/serverActions/serverActions";
import { cookies } from "next/headers";
import Page from "../(auth)/login/page";
// import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  // if (!token) {
  //   redirect("/login");
  // }

  const profileData = await fetchUserProfile();
if(!token) return <Page/>
  return (
    <>
      <Navbar user={profileData?.data?.user || ""} />

      {children}
    </>
  );
}
