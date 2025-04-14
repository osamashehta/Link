'use client'

import { userStore } from "@/stores/user-store";


const HomePage = () => {
  const user  = userStore((state:any) => state.user);
  console.log("user,", user);
  
   return (
    <>
      <div>{user.name}</div>
    
    </>
   )
}

export default HomePage