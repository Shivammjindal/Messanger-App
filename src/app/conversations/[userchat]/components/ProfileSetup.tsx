'use client'
import { Transition,Dialog, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react"
import { Fragment, useState } from "react"
import Avatar from "./Profile"
import { UserModelType } from "@/models/user.model"
import { MdEdit } from "react-icons/md"

interface ProfileSetupProps{
    user: UserModelType
}

const ProfileSetUp:React.FC<ProfileSetupProps> = ({user}) => {

    const [modelOpen, setModelOpen] = useState(false)

    return (
        <>
        <Transition show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { setModelOpen(false) }}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <DialogTitle
                            as="h3"
                            className="leading-6 text-gray-900"
                        >
                            <span className='flex text-sm items-center gap-1'>
                            <div className='text-sm md:text-lg flex justify-center'>
                                Manage Your Profile
                            </div> 
                            </span> 
                        </DialogTitle>
                        <div className="flex flex-col mt-5 mb-4 items-center justify-center gap-3">
                            <div className="relative w-fit">
                                <div className="absolute z-40 right-2 top-4 md:right-1">
                                        <MdEdit className="rounded-full text-xl p-1 bg-neutral-200"/>
                                </div>
                                <div className="mt-4 flex gap-4 justify-center">
                                    <Avatar currentUser={ user }/>
                                </div>
                            </div>
                            
                            <div className="flex gap-1 items-center mt-3">
                                <div id="name">{user.name}</div>
                                <div className="bg-neutral-200 flex gap-1 items-center justify-center mx-1 px-1 rounded-md text-sm">
                                    <div className="text-sm py-1">
                                        <MdEdit/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </DialogPanel>
                    </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    )
}

export { ProfileSetUp }