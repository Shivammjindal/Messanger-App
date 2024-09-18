import React from 'react'
import EmptySpace from './components/EmptySpace'
import { ProfileSetUp } from '../conversations/[userchat]/components/ProfileSetup'
import getCurrentUser from '../actions/getCurrentUser'

export function Users() {

  // const user = await getCurrentUser()

  return (
    <div className='hidden h-full lg:block lg:pl-80'>
      <EmptySpace/>
    </div>
  )
}

export default Users