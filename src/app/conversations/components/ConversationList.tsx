"use client"
import React, { useMemo } from 'react'
import clsx from 'clsx'
import useConversation from '@/app/hooks/useConversation'
import { useState,useEffect } from 'react'
import GroupChatModel from './GroupChat'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'
import { FullConversationType, FullMessageType } from '@/types/model-types'
import { UserModelType } from '@/models/user.model'
import { pusherClient } from '@/app/libs/pusher'
import { useSession } from 'next-auth/react'
import { find } from 'lodash'
import axios from 'axios'

interface ConversationListProps{
    initialItems:FullConversationType[],
    users:UserModelType[],
    currentUser:UserModelType
}

interface conversationUpdateProps{
  id:string,
  messages:FullMessageType
}

function ConversationList({currentUser,initialItems,users}:ConversationListProps) {

  const [items, setItems] = useState(initialItems)
  const { conversationId, isOpen } = useConversation()
  const [ openModal, setOpenModel ] = useState(false);
  const session = useSession()

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email
  },[])

  useEffect(() => {
    if(!pusherKey){
      console.log("Pusher Key : ",pusherKey)
      return ;
    }

    const handleConversationNew = (conversation:FullConversationType) => {

      setItems((current:FullConversationType[]) => {
        if(find(current, {_id: conversation._id})){
          return current;
        }

        return [...current, conversation]
      })
    }

    const handleConversationUpdate = async ({id,messages}:conversationUpdateProps) => {
      console.log('Updating Conversations')
      const { data } = await axios.post('http://localhost:3000/api/getconversations',{userId : currentUser._id,email: currentUser.email})
      setItems(data);
      // setItems((current:FullConversationType[]) => current.map((conversations:FullConversationType) => {
      //   if(conversations._id === id){
      //     conversations.message.push(messages)
      //     return conversations
      //   }

      //   return conversations
      // }))
    }

    pusherClient.subscribe(pusherKey)
    pusherClient.bind('conversation:new',handleConversationNew)
    pusherClient.bind('conversation:Update',handleConversationUpdate)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new',handleConversationNew)
      pusherClient.unbind('conversation:Update',handleConversationUpdate)
    }
  },[pusherKey])

  useEffect(() => {
    console.log('UPDATED ITEMS CONSOLE LOG THE ITEMS GETS UPDATED',items)
  },[items])

  return (
    <div
      className={clsx(
        'lg:fixed overflow-y-scroll lg:left-[2.7rem] lg:top-0 pb-20',
          isOpen? "hidden lg:block" : "block w-full left-0"
      )}
    >
      <div className='px-5'>
        <div className='flex justify-center lg:justify-between pl-4 mb-4 pt-3'>
          <div className='flex flex-row justify-between w-56 items-center text-xl lg:text-[1.5rem] font-medium'>
            Messages
            <div className='text-gray-700 p-[.2rem] bg-gray-200 rounded-lg' onClick={() => {
              setOpenModel(!openModal)
            }}>
              <MdOutlineGroupAdd size={20} cursor={'pointer'}/>
              {openModal && <GroupChatModel active={openModal} setActive={setOpenModel} users={users}/>}
            </div>
          </div>
        </div>
        <div className='flex flex-col overflow-scroll'>
          {
            items.map((item) => {
              return <ConversationBox
                key={`${item._id || ''}`}
                data={item}
                selected={conversationId === item._id}
              />
          })}
        </div>
      </div>
    </div>
  )
}

export default ConversationList