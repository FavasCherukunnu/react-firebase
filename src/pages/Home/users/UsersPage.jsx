import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllChannel } from '../../../controlls/firebase/channel_controll';
import { auth } from '../../../config/firebase';
import { LoadingScreenSimple } from '../../../components/loadingScreen';
import { getAllUsers } from '../../../controlls/firebase/user_controller';
import { modelUser } from '../../../models/userModel';

export function UsersPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [channelName, setChannelName] = useState('')
    const [channelDescription, setChannelDescription] = useState('');
    const [users, setUsers] = useState([])
    const [update, setUpdate] = useState(false)


    const updateUI = () => {
        setUpdate(!update)
    }



    useEffect(
        () => {

            const loadUsers = async () => {
                setIsLoading(true)
                try {

                    const users = await getAllUsers({OwnId:''});
                    setUsers(users)
                } catch (error) {
                    console.log(error);
                    alert('Error Loading channels')
                }
                setIsLoading(false)
            }

            loadUsers()


        }, [update]
    )


    return (
        <div className=' grow flex flex-col w-full px-3 gap-2'>

            {isLoading && <LoadingScreenSimple />}
            {
                users.map(
                    (list,index) => (
                        <Link to={`/user/user/${list.id}`} key={index} className=' border px-2 py-3 flex gap-2 w-full items-center cursor-pointer hover:bg-gray-100 rounded-lg'>
                            <div className=' bg-gray-400 min-h-[40px] max-h-[40px] min-w-[40px] max-w-[40px] rounded-full'>
                            </div>
                            <div className=' flex flex-col gap-1 overflow-hidden '>
                                <div className=' font-bold leading-[14px] text-nowrap truncate'>
                                    {list[modelUser[2]]}
                                </div>
                                <div className='leading-[14px] text-nowrap truncate'>{list[modelUser[1]]}</div>
                            </div>
                        </Link >

                    )
                )
            }
        </div>
    )
}
