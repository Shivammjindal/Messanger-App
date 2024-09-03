import React from 'react'
import { getConversationbyId } from '@/app/actions/getConversationByid'
import getMessages from '@/app/actions/getMessages'
import EmptySpace from '@/app/users/components/EmptySpace'
import Header from './components/Header'
import Body from './components/Body'
import Form from './components/Form'

interface IParams{
  params:{
    userchat:string
  }
}

async function page({ params }:IParams) {

  const messages = await getMessages(params.userchat)
  const conversation = await getConversationbyId({conversationId: params.userchat})

  if(!conversation){
    return (
      <div
        className='lg:pl-80 h-full'
      >
        <div className='h-full flex flex-col'>
          <EmptySpace/>
        </div>
      </div>
    )
  }
  
  return (
    <div className='lg:pl-80 h-full w-full'>
      <div className="h-full lg:border-l-[1px] lg:border-gray-200  flex flex-col">
        <Header conversation={conversation}/>
        <Body/>
        <Form/>
      </div>
    </div>
  )
}

export default page