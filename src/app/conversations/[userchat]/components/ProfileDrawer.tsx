import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/types/model-types"
import { format } from "date-fns"
import { Fragment, useMemo } from "react"
import { Dialog, Transition } from "@headlessui/react"

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
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className={'relative z-50'} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-500"
                >

                </Transition.Child>
            </Dialog>
        </Transition>
    )
}