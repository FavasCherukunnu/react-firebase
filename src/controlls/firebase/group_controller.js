import { addDoc, and, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { modelChannelMembers } from "../../models/channelMembers";
import { modelChannel } from "../../models/channelModel";
import { getAllOtherUsers, getAllUsers } from "./user_controller";
import { modelUser } from "../../models/userModel";

export async function addOneMemberToGroup({
    userId,
    channelId,
    isAdmin=false
}) {

    const grpMemRef = await addDoc(collection(db, "channelMembers"), {
        [modelChannelMembers[1]]:userId,
        [modelChannelMembers[2]]:channelId,
        [modelChannelMembers[4]]:isAdmin,
        [modelChannelMembers[3]]:serverTimestamp(),
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

export async function getAllGroupMembers({
    ownId,
    groupId
}){

    const q = query(collection(db,'channelMembers'),where(modelChannelMembers[2],'==',groupId))
    const querySnapshot = await getDocs(q);
    const membersInGroupObj={}
    const membersInGroup = querySnapshot.docs.map(
        doc =>{
            membersInGroupObj[doc.data()[modelChannelMembers[1]]] = doc.data()
        }
    )
        
    
    const allMembers = await getAllUsers()

    const members = allMembers.filter(
        (member)=>{
            if(membersInGroupObj.hasOwnProperty(member[modelUser[0]])){
                return true
            }
            return false
        }
    )

    const membersFullDetails = members.map(
        member=>({
            ...member,
            [modelChannelMembers[4]]:membersInGroupObj[member[modelUser[0]]][modelChannelMembers[4]]
        })
    )

    return membersFullDetails

}