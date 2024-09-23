"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import { pusherClient } from '@/app/libs/pusher'
import { FullMessageType } from '@/types/model-types'
import useConversation from '@/app/hooks/useConversation'
import axios from 'axios'
import { find } from 'lodash'

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

  useEffect(() => {
    //thats place where we subscribe to our pusher.
    pusherClient.subscribe(conversationId)
    bottomRef.current?.scrollIntoView()

    const handleMessage = (message : FullMessageType) => {

      axios.post(`http://localhost:3000/api/conversations/${conversationId}/seen`)
      // console.log('running')
      setMessage((current) => {

        //Just checking that there is no duplicacy of messages
        if(find(current, {_id: message._id})){
          return current;
        }

        // console.log('current message ',current)
        // console.log("Find : ",find(current,{_id: message._id}))

        return [...current, message]
      })
    }

    pusherClient.bind('new:message',handleMessage)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('new:message',handleMessage);
    }
  },[])

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