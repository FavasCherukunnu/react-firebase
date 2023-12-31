import { addDoc, and, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { modelChannelMembers } from "../../models/channelMembers";
import { modelChannel } from "../../models/channelModel";
import { getAllOtherUsers, getAllUsers } from "./user_controller";
import { modelUser } from "../../models/userModel";
import { modelGroupMessage } from "../../models/grpMessageModel";

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
export async function getAllGroupMembersObj({
    groupId
}){

    const q = query(collection(db,'channelMembers'),where(modelChannelMembers[2],'==',groupId))
    const querySnapshot = await getDocs(q);
    const membersInGroupObj={}
    const membersInGroup = querySnapshot.docs.forEach(
        doc =>{
            membersInGroupObj[doc.data()[modelChannelMembers[1]]] = doc.data()
        }
    )
        
    
    const allMembers = await getAllUsers()
    const members = {}
    allMembers.forEach(
        (member)=>{
            if(membersInGroupObj.hasOwnProperty(member[modelUser[0]])){
                membersInGroupObj[member[modelUser[0]]][modelUser[1]] = member[modelUser[1]]
                membersInGroupObj[member[modelUser[0]]][modelUser[0]] = member[modelUser[0]]
                membersInGroupObj[member[modelUser[0]]][modelUser[2]] = member[modelUser[2]]
            }
            return false
        }
    )


    return membersInGroupObj

}
export async function getuserGroupIdsObj({
    userId
}){

    const q = query(collection(db,'channelMembers'),where(modelChannelMembers[1],'==',userId))
    const querySnapshot = await getDocs(q);
    let grpObj={}
    querySnapshot.docs.forEach(
        doc => {
            grpObj[doc.data()[modelChannelMembers[2]]] = {
                [modelChannelMembers[2]]:doc.data()[modelChannelMembers[2]],
                [modelChannelMembers[3]]:doc.data()[modelChannelMembers[3]],
                [modelChannelMembers[4]]:doc.data()[modelChannelMembers[4]],
            }
        }
    )
        
    return grpObj

}

