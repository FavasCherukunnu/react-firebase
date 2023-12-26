import React from 'react'
import ReactDOM from 'react-dom'

export default function SimpleModal({
    isOpen = true,
    onClose = () => { },
    children,
    zIndex = 100
}) {
    return isOpen && ReactDOM.createPortal(
        <>
            <div onClick={() => {  onClose() }} className=' fixed inset-0 h-screen w-screen bg-gray-500/50 flex items-center justify-center' style={{ zIndex: zIndex }}>
            </div>
            <div onClick={() => { console.log('inner clicked') }} style={{ zIndex: zIndex + 1,left:'50%',top:'50%',transform:'translate(-50%,-50%)' }} className='fixed w-[95vw] max-h-[80vh] md:w-[75vw] xl:w-[900px] bg-white border border-gray-400 rounded-md shadow-lg overflow-hidden'>
                {children}
            </div>
            {/* <div  className=' fixed inset-0 h-screen w-screen bg-transparent flex items-center justify-center' style={{ zIndex: zIndex }}>
            </div> */}
        </>,
        document.body
    )
}

export  function QuestionModal({
    isOpen = true,
    onClose = () => { },
    children,
    zIndex = 200,
    className
}) {
    return isOpen && ReactDOM.createPortal(
        <>
            <div onClick={() => {  onClose() }} className=' fixed inset-0 h-screen w-screen bg-gray-500/50 flex items-center justify-center' style={{ zIndex: zIndex }}>
            </div>
            <div onClick={() => { console.log('inner clicked') }} style={{ zIndex: zIndex + 1,left:'50%',top:'50%',transform:'translate(-50%,-50%)' }} className={`fixed px-2 py-3 bg-white border border-gray-400 rounded-md shadow-lg overflow-hidden ${className}`}>
                {children}
            </div>
            {/* <div  className=' fixed inset-0 h-screen w-screen bg-transparent flex items-center justify-center' style={{ zIndex: zIndex }}>
            </div> */}
        </>,
        document.body
    )
}
