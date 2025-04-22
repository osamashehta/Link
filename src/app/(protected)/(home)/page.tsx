import HomePage from "@/components/pages/HomePage/HomePage";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  return <HomePage token={token || ""} />;
}
