import React from 'react'

export function BasicInput({
    placeholder,
    title,
    onChange = () => { },
    className,
    type,
    name,
    value='',
    innerClass
}) {
    return (
        <div className={`flex flex-col gap-1 py-1 ${className}`}>
            {title?<div>{title}</div>:null}
            <input value={value} className={` transition-all duration-100 border-2 rounded h-9 w-72 placeholder:text-gray-400 ps-3 ring-2 ring-transparent focus:ring-2 focus-within:ring-green-500 focus:border-transparent focus:outline-none ${innerClass}`} placeholder={placeholder} type={type?type:'text'} name={name} onChange={(event)=>onChange(event)} ></input>
        </div>
    )
}
