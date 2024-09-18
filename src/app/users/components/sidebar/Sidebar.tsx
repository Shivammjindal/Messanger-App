import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import getCurrentUser from '@/app/actions/getCurrentUser'
import MobileFooter from './MobileFooter'
import { UserModelType } from '@/models/user.model'
import { ProfileSetUp } from '@/app/conversations/[userchat]/components/ProfileSetup'

export default async function Sidebar({
  children
}:{
  children:React.ReactNode
}){

  const { user } : { user: UserModelType} = await getCurrentUser()

  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={ user } />
      <ProfileSetUp user={user}/>
      <MobileFooter/>
      {/* Making Side Taskmanager here */}
      <main className='h-full'>
        {children}
      </main>
    </div>
  )
}