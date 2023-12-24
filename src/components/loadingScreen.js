import React from 'react'
import ReactDOM from 'react-dom'

export function LoadingScreenSimple() {
    return ReactDOM.createPortal(
        <div style={{zIndex:200}} className=' fixed inset-0 h-screen w-screen bg-black/20 flex justify-center items-center'>
            <div className='flex gap-4'>
                <div className=' rounded-full w-9 h-9 animate-ping  bg-green-800' style={{animationDelay:'100ms'}}></div>
                <div className=' rounded-full w-9 h-9 animate-ping bg-green-800' style={{animationDelay:'150ms'}}></div>
                <div className=' rounded-full w-9 h-9 animate-ping bg-green-800' style={{animationDelay:'200ms'}}></div>

            </div>
        </div>,
        document.body
    )
}
