"use client"

import React from 'react'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from "date-fns"
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/types/model-types'

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

  return (
    <div>ConversationBox</div>
  )
}

export default ConversationBox