import React from 'react'
import Image from 'next/image'
import { UserModelType } from '@/models/user.model'

interface AvatarProps{
    currentUser?: UserModelType
}

const Avatar: React.FC<AvatarProps> = ({currentUser}) => {
    return (
        <div className='relative'>
            <div className='
                relative
                inline-block
                rounded-full
                overflow-hidden
                h-9
                w-9
                md:h-10
                md:w-10
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
                    w-2
                    h-2
                    md:h-3
                    md:w-3
                '
            >
            </span>
        </div>
    );
}

export default Avatar