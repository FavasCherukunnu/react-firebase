import React, { useEffect, useState } from 'react'
import { getOtherGroupMembers } from '../../controlls/firebase/group_controller'
import { auth } from '../../config/firebase'
import { Link, useParams } from 'react-router-dom'
import { UserPage } from '../user/userpage';
import { modelUser } from '../../models/userModel';
import { LoadingScreenSimple } from '../../components/loadingScreen';

export function ChannelDetails() {
  const { id } = useParams();
  const [groupUsers, setGroupUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    () => {
      const loadUsers = async () => {
        setIsLoading(true)
        try {
          const members = await getOtherGroupMembers({
            ownId: auth.currentUser.uid,
            groupId: id
          })
          setGroupUsers(members)
        } catch (err) {
          console.log(err)
          alert('error loading users')
        }
        setIsLoading(false)
      }

      loadUsers()
    }, []
  )

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      bottom: '0',
      right: '0',
      left: '0'
    }}
      className=' flex flex-col '
    >
      {
        isLoading && <LoadingScreenSimple />
      }
      <div className=' flex items-center w-full min-h-12 bg-green-500 text-white font-bold ps-3 overflow-hidden truncate'>
        Channel Members
      </div>
      <div className=' w-full flex flex-col gap-2 px-3 pt-2'>
        {
          groupUsers.map(
            (list, index) => (
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
    </div>
  )
}
