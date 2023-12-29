import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { modelChannelMembers } from "../../models/groupMembers";

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