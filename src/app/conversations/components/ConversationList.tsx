"use client"
import React from 'react'
import clsx from 'clsx'
import useConversation from '@/app/hooks/useConversation'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'
import { FullConversationType } from '@/types/model-types'

interface ConversationListProps{
    initialItems:FullConversationType[]
}

function ConversationList({initialItems}:ConversationListProps) {

  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const { conversationId, isOpen } = useConversation()

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
            <div className='text-gray-700 p-[.4rem] bg-gray-200 rounded-lg'>
              <MdOutlineGroupAdd size={20} cursor={'pointer'}/>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div>
          {items.map((item) => {
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