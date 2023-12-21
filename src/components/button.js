import React from 'react'

export  function ButtonBasic({
    text,
    onClick
}) {
  return (
    <button className=' px-3 py-1 font-bold bg-green-500  hover:bg-green-600 text-white rounded shadow-sm' onClick={onClick}>
        {text}
    </button>
  )
}
