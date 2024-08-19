import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import getCurrentUser from '@/app/actions/getCurrentUser'
import MobileFooter from './MobileFooter'

export default async function Sidebar({
  children
}:{
  children:React.ReactNode
}){

  const { data } = await getCurrentUser()

  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={data.user} />
      <MobileFooter/>
      {/* Making Side Taskmanager here */}
      <main className='h-full'>
        {children}
      </main>
    </div>
  )
}