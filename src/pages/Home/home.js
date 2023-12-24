import { IconDotsVertical } from '@tabler/icons-react'
import React from 'react'
import { LogoutMenu } from '../components/menus'

export default function Home() {
  return (
    <div className='h-screen w-screen'>
        <div className='sticky top-0 w-full h-10 bg-green-100 flex items-center justify-between px-3'>
          <div></div>
          <div>
            <LogoutMenu/>
          </div>
        </div>

        <p className=' text-center text-2xl font-bold'>HomePage</p>
    </div>
  )
}
