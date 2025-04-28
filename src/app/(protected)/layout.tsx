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

  let profileData = null;

  if (token) {
    try {
      profileData = await fetchUserProfile();
    } catch () {
      // fetch failed (invalid token maybe)
      redirect("/login");
    }
  } else {
    // no token at all
    redirect("/login");
  }

  return (
    <>
      <Navbar user={profileData?.data?.user || ""} />

      {children}
    </>
  );
}
