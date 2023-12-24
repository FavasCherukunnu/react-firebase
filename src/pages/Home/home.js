import { IconDotsVertical, IconPlus } from '@tabler/icons-react'
import React, { useState } from 'react'
import { LogoutMenu } from '../components/menus'
import {MainTopNav} from '../components/topNav'
import { ButtonBasic, Buttonvarients, RoundedIconButton } from '../../components/button'
import SimpleModal from '../../components/Modal'
import { BasicInput } from '../../components/input'
import { LoadingScreenSimple } from '../../components/loadingScreen'
import { createChannel } from '../../controlls/firebase/channel_controll'
import { auth } from '../../config/firebase'

export default function Home() {

  const [showaddChannelModal,setShowAddChannelModal] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [channelName,setChannelName]  = useState('')
  const [channelDescription,setChannelDescription]  = useState('')


  const onAddChannel = async()=>{
    setIsLoading(true)
    if(channelName!=='' && channelDescription!==''){
      try {

        const channelref = await createChannel({
          channelName,
          adminUid:auth.currentUser.uid,
          description:channelDescription
        })

        console.log(channelref)
        
      } catch (error) {
        console.log(error)
        alert('error adding channel')
      }
    }else{
      alert('please fill the form')
    }
    setIsLoading(false)
  }

  return (
    <div className='h-screen w-screen'>
        <MainTopNav/>
        {isLoading&&<LoadingScreenSimple/>}
        <p className=' text-center text-2xl font-bold'>Channels</p>
        <div className=' fixed bottom-5 right-5'>
            <RoundedIconButton className={'h-12 w-12'} icon={<IconPlus />} onClick={()=>setShowAddChannelModal(true)}/>
        </div>

        <SimpleModal isOpen={showaddChannelModal} onClose={()=>setShowAddChannelModal(false)}>
          <div className=' w-full '>
            <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 '>
              Add Channel
            </div>
            <div className=' px-1 md:px-4 md:py-3 flex flex-col items-center '>
              <BasicInput onChange={(e)=>setChannelName(e.target.value)} value={channelName} className={'items-center'} title={'Channel name'} placeholder={'channel name'} />
              <BasicInput onChange={(e)=>setChannelDescription(e.target.value)} value={channelDescription} className={'items-center'} title={'Description'} placeholder={'channel description'} />
            </div>
            <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 flex justify-end gap-2 px-2 '>
              <ButtonBasic varients={Buttonvarients.secondary} text={'Cancel'} onClick={()=>setShowAddChannelModal(false)}/>
              <ButtonBasic text={'Add'} onClick={onAddChannel}/>
            </div>
          </div>
        </SimpleModal>

    </div>
  )
}
