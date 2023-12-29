import { addDoc, and, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { modelChannelMembers } from "../../models/groupMembers";
import { modelChannel } from "../../models/channelModel";
import { getAllOtherUsers } from "./user_controller";

export async function addOneMemberToGroup({
    userId,
    channelId,
}) {

    const grpMemRef = await addDoc(collection(db, "channelMembers"), {
        [modelChannelMembers[1]]:userId,
        [modelChannelMembers[2]]:channelId,
        [modelChannelMembers[3]]:serverTimestamp()
    });

    return grpMemRef;

}

export async function getOtherGroupMembers({
    ownId,
    groupId
}){

    const q = query(collection(db,'channelMembers'),where(modelChannelMembers[2],'==',groupId),where(modelChannelMembers[1],'!=',ownId))
    const querySnapshot = await getDocs(q);
    const membersInGroup = querySnapshot.docs.map(
        doc =>doc.data()[modelChannelMembers[1]]
    )
        
    
    const allMembers = await getAllOtherUsers({
        OwnId:ownId
    })

    const members = allMembers.filter(
        (member)=>membersInGroup.includes(member.id)
    )
    return members 

}