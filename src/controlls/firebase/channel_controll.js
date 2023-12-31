import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { modelChannel } from '../../models/channelModel'
import { getuserGroupIdsObj } from './group_controller'
import { modelChannelMembers } from '../../models/channelMembers'

export async function createChannel({
    channelName,
    adminUid,
    description
}) {

    const channelDataRef = await addDoc(
        collection(db, 'channels'),
        {
            [modelChannel[1]]: channelName,
            [modelChannel[3]]: adminUid,
            [modelChannel[2]]: description
        }
    )
    // console.log(channelDataRef)

    return channelDataRef

}
export async function updateChannel({
    id,
    data={}
}) {

    const channelRef = doc(db, 'channels', id);

    const channelDataRef = await setDoc(
        channelRef,
        data,
        {
            merge:true
        }
    )
    // console.log(channelDataRef)

    return channelDataRef

}

export async function getAllChannel() {

    const q = query(collection(db, 'channels'));
    const querySnapshot = await getDocs(q);
    const item = querySnapshot.docs.map(
        doc => ({
            id: doc.id,
            ...doc.data()
        })
    )

    return item;


}

export async function getUserChannels({
    userId
}) {

    const q = query(collection(db, 'channels'));
    const querySnapshot = await getDocs(q);
    const AllChannels = querySnapshot.docs.map(
        doc => ({
            id: doc.id,
            ...doc.data()
        })
    )
    const grpIds = await getuserGroupIdsObj({userId:userId});

    const userChannels = []
    AllChannels.forEach(
        channel=>{
            if(grpIds.hasOwnProperty(channel.id)){
                userChannels.push({
                    ...channel,
                    [modelChannelMembers[4]]:grpIds[channel.id][modelChannelMembers[4]]
                })
            }
            return false;
        }
    )

    return userChannels;



}

export async function getOneChannel({ id }) {
    const docRef = doc(db, "channels", id);
    const docSnap = await getDoc(docRef);

    return {
        ...docSnap.data(),
        id: docSnap.id
    }
}

export async function deleteChannel({ id }) {

    const res = await deleteDoc(doc(db, 'channels', id));
    return res;

}

