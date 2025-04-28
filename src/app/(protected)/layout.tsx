import Navbar from "@/components/Navbar/Navbar";
import { fetchUserProfile } from "@/lib/serverActions/serverActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
console.log("token layout",token)
  if (!token) {
    console.log("No token found layout",token);
    redirect("/login");
  }

  const profileData = await fetchUserProfile();

  return (
    <>
      <Navbar user={profileData?.data?.user || ""} />

      {children}
    </>
  );
}
