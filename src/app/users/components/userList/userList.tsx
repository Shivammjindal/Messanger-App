"use client"
import React, { useEffect, useState } from "react";
import UserBox from "./UserBox";
import { UserModelType } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import axios from "axios";

interface UserListProps{
    items: UserModelType[]
}

export const UserList = ({items}:UserListProps) => {

    const [listItems, setlistItems] = useState<UserModelType[]>(items)
    const [loading, setLoading] = useState<boolean>(true)
    const session = useSession()

    useEffect(() => {
        if(session){
            setLoading(false)
        }
    },[session?.data?.user?.email])

    useEffect(() => {

        if(!session.data?.user?.email) return

        const handleUserList = async () => {

            console.log('Updateing List Recieved');

            const { data } = await axios.post('http://localhost:3000/api/allusers',{ email:session?.data?.user?.email })
            
            setlistItems(data.users);
        }

        pusherClient.subscribe(session.data?.user?.email!)
        pusherClient.bind('userlist:update',handleUserList)

        return () => {
            pusherClient.unsubscribe(session?.data?.user?.email!)
            pusherClient.unbind('userlist:update',handleUserList)
        }
    },[session?.data?.user?.email])
    
    return(
        <div>
            {!loading ? <aside className="
                fixed
                inset-y-0
                pb-20
                lg:pb-0
                lg:left-16
                overflow-y-auto
                border-r-[1px]
                border-gray-300
                block
                w-full
                left-0
            ">
                <div className="text-2xl font-semibold antialiased lg:mt-3 pb-2 lg:block mt-2 border-b-[1px] lg:border-b-[1px] flex justify-center">
                    <div className="lg:ml-3">
                        Chats
                    </div>
                </div>
                {
                    listItems.map((item) => (
                        <UserBox key={`${item._id}`} data={item}/>
                    ))
                }
            </aside> : <div>Loading...</div>}
        </div>
    )
}