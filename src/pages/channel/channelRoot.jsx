import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ChannelPage } from './channel'
import { ChannelDetails } from './channelDetails'

export default function ChannelRoot() {
  return (
    <Routes>
        <Route path='channelDetails/:id' element={<ChannelDetails/>} />
        <Route path=':id' element={<ChannelPage/>} />
    </Routes>
  )
}
