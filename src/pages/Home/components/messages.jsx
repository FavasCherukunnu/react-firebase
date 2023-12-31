import React from 'react'
import { auth } from '../../../config/firebase'

export  function PersonalMessage({
    senterName,
    messages,
    senterId
}) {

    const isOwn = senterId===auth.currentUser.uid

  return (
    <div className=' w-full flex'>
        {isOwn&&<div className=' grow'></div>}
        <div className=' px-2 py-2 border bg-white rounded-md shadow-md'>{messages}</div>
        {!isOwn&&<div className='grow'></div>}
    </div>
  )
}
export  function GroupMessage({
    senterName,
    messages,
    senterId
}) {

    const isOwn = senterId===auth.currentUser.uid

  return (
    <div className=' w-full flex'>
        {isOwn&&<div className=' grow'></div>}
        <div className='  border bg-white rounded-md shadow-md flex flex-col'>
          <div className='px-2 py-1 bg-green-500 rounded-t-md leading-none text-white font-semibold'>{senterName}</div>
          <div className=' px-2 py-2'>{messages}</div>
        </div>
        {!isOwn&&<div className='grow'></div>}
    </div>
  )
}
