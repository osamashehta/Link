import Image from 'next/image'
import React from 'react'
import { User } from '@/lib/types/types'

const CreatePost = ({user}: {user: User}) => {
  return (
    <div className='w-full h-[80px] bg-white rounded-[10px] px-3 py-2 shadow-md flex  items-center justify-center gap-2'>
     
        <Image src={user?.photo} alt="user" width={40} height={40} className='rounded-full' />
   <div className='rounded-[20px] border border-slate-300 px-4 py-2 w-full text-gray-700'>
    Start a post
   </div>
    </div>
  )
}

export default CreatePost
