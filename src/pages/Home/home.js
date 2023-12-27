import { IconDotsVertical, IconPlus, IconTrash } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { LogoutMenu } from '../components/menus'
import { MainTopNav } from '../components/topNav'
import { ButtonBasic, Buttonvarients, RoundedIconButton } from '../../components/button'
import SimpleModal from '../../components/Modal'
import { BasicInput } from '../../components/input'
import { LoadingScreenSimple } from '../../components/loadingScreen'
import { createChannel, deleteChannel, getAllChannel } from '../../controlls/firebase/channel_controll'
import { auth } from '../../config/firebase'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import {  ChannelsPage } from './channels/ChannelsPage'
import { UsersPage } from './users/UsersPage'

export default function Home() {


  const tab = [
    {
      name:'Personal',
      href:'users'
    },
    {
      name:'Channels',
      href:'channels',
    }
  ]
 

  return (
    <div className='h-screen w-screen flex flex-col'>
      <MainTopNav />
      <div className=' w-full mt-1 flex items-center justify-center gap-2'>
        {
          tab.map(
            (t,index)=>(
              <NavLink to={t.href} className={
                ({isActive,isPending })=>{
                  return ` rounded-t-md border-t border-x px-2 py-1 cursor-pointer ${isActive?'bg-green-500':'hover:bg-green-200'}`
                }
              } key={index}>{t.name}</NavLink>
            )
          )
        }
      </div>
      <Routes>
        <Route index element={<Navigate replace to={'users'} />} />
        <Route path='users' element={<UsersPage/>}/>
        <Route path='channels' element={<ChannelsPage/>}/>
      </Routes>
    </div>
  )
}
