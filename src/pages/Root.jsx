import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/home'
import { ChannelPage } from './channel/channel'

export function Root() {
  return (
    <Routes>
        <Route index element={<Home/>} />
        <Route path='/channel/:id' element={<ChannelPage/>} />
    </Routes>
  )
}
