import React from 'react'
import { LogoutMenu } from './menus'

export function MainTopNav() {
    return (
        <div className='sticky top-0 w-full min-h-10 bg-green-100 flex items-center justify-between px-3'>
            <div></div>
            <div>
                <LogoutMenu />
            </div>
        </div>
    )
}
