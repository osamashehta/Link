import { TComments } from '@/lib/types/types'
import Image from 'next/image'
import React from 'react'
import { useTimeAgo } from '@/hooks/useTimeAgo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Comments = ({comments}:{comments:TComments} ) => {
      const createdAtAgo = useTimeAgo(comments?.createdAt);
    
  return (
    <div className="w-full border border-slate-700/[0.4] rounded-[10px] py-1 px-[16px] mt-[-10px] bg-gray-100 ">
        <div className="flex items-center justify-between w-full ">
          <div className="flex justify-start items-center gap-1">
            <Avatar>
              <AvatarImage src={comments?.commentCreator?.photo} alt={comments?.commentCreator?.name} />
              <AvatarFallback className="bg-slate-950 text-white  ">
                {comments?.commentCreator?.name.split(" ").map((name) => name[0])}
              </AvatarFallback>
            </Avatar>
            <p>{comments?.commentCreator?.name}</p>
          </div>
          <p>{createdAtAgo}</p>
        </div>

    </div>
  )
}

export default Comments