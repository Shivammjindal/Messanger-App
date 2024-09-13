"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import MessageBox from './MessageBox'

import { FullMessageType } from '@/types/model-types'
import useConversation from '@/app/hooks/useConversation'
import axios from 'axios'

interface BodyProps{
  initialMessages : FullMessageType[],
}

const Body: React.FC<BodyProps> = ({initialMessages}) => {

  const [message, setMessage] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { conversationId } = useConversation();

  useEffect(() => {

    axios.post(`http://localhost:3000/api/conversations/${conversationId}/seen`)
    
  },[conversationId])

  return (
    <div className='flex-1 overflow-y-auto'>
      {/* use ref helps in percisting value throughout rerender */}
      {
        message.map((msg,i) => (
          <MessageBox key={msg._id || msg.id} isLast={i === message.length-1} data={msg}/>
        ))
      }
    </div>
  )
}

export default Body