"use client"
import React from 'react'
import DesktopItem from './DesktopItem'
import useRoutes from '@/app/hooks/useRoute'
import MobileItem from './MobileItem'
import useConversation from '@/app/hooks/useConversation'

const MobileFooter = () => {

    const routes = useRoutes()
    const { isOpen } = useConversation()

    if(isOpen){
        return null
    }

  return (
    <div
        className='
            lg:hidden
            fixed
            bottom-0
            w-full
            border-t-[1px]
            flex
            justify-center
            items-center
            space-y-2
            z-20
            bg-white
        '
    >
       <nav className='my-2 flex flex-row items-center'>
        <ul
          role='list'
          className='
            flex
            flex-row
            gap-10
            justify-between
            items-center
          '
        >
          {
            routes.map((item) => (
                <MobileItem
                    key={item?.label}
                    label={item?.label}
                    href={item?.href}
                    active={item?.active}
                    icon={item?.icon}
                    onClick={item?.onClick}
                />
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default MobileFooter