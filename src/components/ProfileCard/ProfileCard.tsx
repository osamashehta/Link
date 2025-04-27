import { User } from '@/lib/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileCard = ({user,profile}:{user:User,profile?:boolean}) => {
  return (
    <div className='bg-white w-full h-full rounded-[14px] shadow-lg flex flex-col justify-start items-center py-4'>
      <Image src={ user.photo || '/imgPlaceholder.svg'}  alt={"ProfileName"} width={100} height={100} className="rounded-full"/>
      <p className='mt-1 text-[16px] font-medium'>{user.name}</p>
      <p className='my-1 text-[14px] font-medium'>Software Engineer</p>
      {!profile && (


      <Link href="/profile" className='rounded-[8px] flex justify-center items-center border border-gray-400/[0.4] px-3 py-1 text-[18px] font-light' >
    View profile
      </Link>
      )}
    </div>
  )
}

export default ProfileCard
