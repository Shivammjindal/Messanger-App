"use client"
import React from "react";
import UserBox from "./UserBox";
import { UserModelType } from "@/models/user.model";

interface UserListProps{
    items: UserModelType[]
}

export const UserList = ({items}:UserListProps) => {
    
    return(
        <aside className="
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
                items.map((item) => (
                    <UserBox key={`${item._id}`} data={item}/>
                ))
            }
        </aside>
    )
}