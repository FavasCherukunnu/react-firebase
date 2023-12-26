import React from 'react'
import { db } from '../../config/firebase'
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'

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

export async function  getAllChannel() {

    const q = query(collection(db, 'channels'));
    const querySnapshot = await getDocs(q);
    const item = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const shot = {
            id:doc.id,
            ...doc.data()
        }
        item.push(shot)
    });
    
    return item;


}
