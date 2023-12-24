import React from 'react'
import { db } from '../../config/firebase'
import { addDoc, collection } from 'firebase/firestore'

export async function createChannel({
    channelName,
    adminUid,
    description
}) {

    const channelDataRef = await addDoc(
        collection(db, 'channels'),
        {
            channel_name: channelName,
            admin: adminUid,
            description: description
        }
    )
    // console.log(channelDataRef)

    return channelDataRef

}
