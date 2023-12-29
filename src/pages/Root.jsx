import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/home'
import ChannelRoot from './channel/channelRoot'
import { UserPage } from './user/userpage'

export function Root() {
  return (
    <Routes>
        <Route path='*' element={<Home/>} />
        <Route path='/channel/*' element={<ChannelRoot/>} />
        <Route path='/user/:id' element={<UserPage/>} />
    </Routes>
  )
}
