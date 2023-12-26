import React from 'react'
import { db } from '../../config/firebase'
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'

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
    const item = querySnapshot.docs.map(
        doc=>({
            id:doc.id,
            ...doc.data()
        })
    )
    
    return item;


}

export async function deleteChannel({id}){

    const res = await deleteDoc(doc(db,'channels',id));
    return res;

}
