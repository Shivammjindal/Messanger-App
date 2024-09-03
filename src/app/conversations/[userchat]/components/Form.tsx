"use client"
import useConversation from '@/app/hooks/useConversation'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';

function Form() {

    const { conversationId } = useConversation();
    const {
        register,
        handleSubmit,
        setValue,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message:''
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        //reset the message back to nothing
        setValue('message','',{ shouldValidate: true })
        axios.post('http://localhost:3000/api/message',{
            data,
            conversationId
        })
    }

  return (
    <div
        className='
            py-4
            px-4
            bg-white
            border-t-[1px]
            flex
            items-center
            gap-2
            lg:gap-4
            w-full
        '
    >
        <HiPhoto size={30} className='text-sky-500'/>
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className='flex items-center gap-2 lg:gap-4 w-full'
        >
            <MessageInput
                id="message"
                register={register}
                errors={errors}
                required
                placeholder="Write a Message"
            />
        </form>
    </div>
  )
}

export default Form