import HomePage from "@/components/pages/HomePage/HomePage";
import { fetchUserProfile } from "@/lib/serverActions/serverActions";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const profileData = await fetchUserProfile();
  return <HomePage token={token || ""} user={profileData?.data?.user || ""} />;
}
