import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/home'
import { ChannelPage } from './channel/channel'
import { UserPage } from './user/userpage'

export function Root() {
  return (
    <Routes>
        <Route path='*' element={<Home/>} />
        <Route path='/channel/:id' element={<ChannelPage/>} />
        <Route path='/user/:id' element={<UserPage/>} />
    </Routes>
  )
}
