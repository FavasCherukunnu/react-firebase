import React from 'react'
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { IconCheck, IconSelector } from '@tabler/icons-react'

export function BasicInput({
    placeholder,
    title,
    onChange = () => { },
    className,
    type,
    name,
    value = '',
    innerClass
}) {
    return (
        <div className={`flex flex-col gap-1 py-1 ${className}`}>
            {title ? <div>{title}</div> : null}
            <input value={value} className={` transition-all duration-100 border-2 rounded h-9 w-72 placeholder:text-gray-400 ps-3 ring-2 ring-transparent focus:ring-2 focus-within:ring-green-500 focus:border-transparent focus:outline-none ${innerClass}`} placeholder={placeholder} type={type ? type : 'text'} name={name} onChange={(event) => onChange(event)} ></input>
        </div>
    )
}



export function SelectBoxInputBox({
    option=[
    ],
    value,
    onChange=(value)=>{}
}) {

    const people = [
        ...option
    ]
    const [selected, setSelected] = useState({ id: null, name: 'Select' })
    const [query, setQuery] = useState('')
    

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
            <Combobox value={value===null || value===undefined || typeof value !== 'object'?{ id: null, name: 'Select' }:value} onChange={onChange}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(person) => person.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <IconSelector
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                            }`}
                                                    >
                                                        <IconCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
    )


}