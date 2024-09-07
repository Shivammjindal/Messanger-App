import React from 'react'

import { FullMessageType } from '@/types/model-types'

interface BodyProps{
  initialMessages : FullMessageType[],
}

const Body = () => {
  return (
    <div className='flex-1'>Body</div>
  )
}

export default Body