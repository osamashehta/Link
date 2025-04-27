import ProfilePage from '@/components/pages/ProfilePage/ProfilePage'
import { fetchUserProfile } from '@/lib/serverActions/serverActions';
import { cookies } from 'next/headers';
import React from 'react'

const page = async() => {
    const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const profileData = await fetchUserProfile();
  console.log("profileData",profileData);
  
  return (
    <>
        <ProfilePage token={token || ""} user={profileData?.data?.user || ""} />
    </>
  )
}

export default page
