'use client'
import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/types/model-types"
import { format } from "date-fns"
import { Fragment, useMemo } from "react"
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"

interface ProfileDrawerProps{
    isOpen?:boolean,
    data:FullConversationType,
    onClose:() => void
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({isOpen,data,onClose}) => {

    //showing conversations Details
    //#1 Fetching other Users
    const OtherUsers = useOtherUser(data)
    const date = new Date(OtherUsers.createdAt || Date.now())
    //Showing Joining Date
    const joiningDate = useMemo(() => {
        format(new Date(date),'PP')
    },[OtherUsers.createdAt])

    const title = useMemo(() => {
        return data.name || OtherUsers.name
    },[data.name, OtherUsers.name])

    const statusText = useMemo(() => {
        if(data.isGroup){
            return `${data.users.length} members`
        }

        return 'Active'
    },[data])

    return (
        <Transition show={isOpen}>
            {/* Background overlay */}
            {/* <TransitionChild
                enter="transition-opacity ease-linear duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-500"
                leaveFrom="opacity-0"
                leaveTo="opacity-0"
            >
                <div>
                    MOJA
                </div>
            </TransitionChild> */}
            <div className="flex flex-row fixed z-10 w-screen">
                <div className="flex w-screen">
                <TransitionChild
                        enter="transition ease-in-out duration-500 transform"
                        enterFrom="-translate-x-full opacity-0"
                        enterTo="bg-blue-300"
                        leave="transition ease-in-out duration-500 transform"
                        leaveFrom="translate-x-full opacity-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="h-screen flex-1 w-screen overflow-x-hidden opacity-10 bg-neutral-400" onClick={onClose}>
    
                        </div>
                    </TransitionChild>
                    <TransitionChild
                        enter="transition ease-in-out duration-500 transform"
                        enterFrom="translate-x-full opacity-0"
                        enterTo="bg-blue-300"
                        leave="transition ease-in-out duration-500 transform"
                        leaveFrom="translate-x-full opacity-0"
                        leaveTo="translate-x-full"
                    >
                        <div className="flex flex-col items-center inset-0 w-56 bg-white">
                            <div className="mt-3">
                                Profile
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </div>
            
            </Transition>
    )
}