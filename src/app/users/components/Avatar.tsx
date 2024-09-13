import React from 'react'
import Image from 'next/image'
import { UserModelType } from '@/models/user.model'

interface AvatarProps{
    currentUser: UserModelType | undefined
}

const Avatar: React.FC<AvatarProps> = ({currentUser}) => {
    return (
        <div className='relative'>
            <div className='
                relative
                inline-block
                rounded-full
                overflow-hidden
                h-6
                w-6
                sm:h-7
                sm:w-7
                md:h-8
                md:w-8
                ring-1
                ring-gray-500
            '>
                <Image
                    alt="Avatar"
                    src={currentUser?.image || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                    fill
                />
            </div>
            <span
                className='
                    absolute
                    block
                    rounded-full
                    bg-green-500
                    ring-2
                    ring-white
                    top-0
                    right-0
                    w-[7px]
                    h-[7px]
                    md:h-2
                    md:w-2
                '
            >
            </span>
        </div>
    );
}

export default Avatar