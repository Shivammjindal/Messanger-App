"use client"

import React from 'react'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from "date-fns"
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import Avatar from '@/app/users/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/types/model-types'
import { UserModelType } from '@/models/user.model'

interface ConversationPropsType{
    data:FullConversationType
    selected?:boolean
}

function ConversationBox({data,selected}:ConversationPropsType) {

    const router = useRouter();
    const otherUser = useOtherUser(data);
    const session = useSession();
    const handleClick = useCallback(() => {
        router.push(`/conversations/${data._id}`)
    },[data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.message || []
        return messages[messages.length-1]
    },[data.message])  

    const userEmail = useMemo(() =>{
        return session?.data?.user?.email
    },[session?.data?.user?.email])

    const hasSeen = useMemo(() => {

        if(!lastMessage){
            return false;
        }

        const seenArray = lastMessage.seen || []

        if(!userEmail)
            return false;

        return seenArray.filter((user:UserModelType) => user.email === userEmail).length !== 0

    },[userEmail,lastMessage])

    const lastMessageText = useMemo(() => {
        if(lastMessage?.body ){
            return lastMessage.body
        }

        return 'Started a Conversation'
    },[])

  return (
    <div
        onClick={handleClick}
        className={clsx(`
                w-64
                relative
                flex
                items-center
                space-x-3
                rounded-lg
                transition
                cursor-pointer
                p-3
            `,
            selected?`bg-neutral-100` : `bg-white`,
        )}
    >
        <Avatar currentUser={otherUser} />
        <div
            className='min-w-0 flex-1'
        >
            <div className='flex justify-between items-center mb-1'>
                {data.name || otherUser.name}
            </div>
            <div>
                {lastMessage?.createdAt && (
                    <p>{format(new Date(lastMessage.createdAt), 'p')}</p>
                )}
            </div>
            <div className={clsx(`
                    text-sm
                    m-0`,
                !hasSeen &&`font-semibold`)}>
                {lastMessageText}
            </div>
        </div>
    </div>
  )
}

export default ConversationBox