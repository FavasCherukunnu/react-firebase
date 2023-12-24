import { IconDotsVertical } from '@tabler/icons-react'
import React, { useState } from 'react'
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export function LogoutMenu() {
    const [showMenu,setShowMenu] = useState(false)
    const navigate = useNavigate()

    const signOutApp = async ()=>{
        try {
            const result = await signOut(auth);
            // navigate('/',{replace:true})

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    return (
        <div className=' relative'>
            <div onClick={()=>{setShowMenu(!showMenu)}} className={`rounded-md py-1 cursor-pointer hover:bg-gray-400/40 ${showMenu&&'bg-gray-500/40'}`}>
                <IconDotsVertical />
            </div>
            {
                showMenu&&(
                    <div onClick={signOutApp} className=' absolute right-0 border rounded-md shadow-md top-9 flex flex-col bg-white px-2 py-2'>
                        <div className=' hover:bg-gray-500/30 rounded-md cursor-pointer px-2'>Logout</div>
                    </div>
                )
            }
        </div>
    )
}
