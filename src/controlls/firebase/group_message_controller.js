import { addDoc, and, collection, onSnapshot, or, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { modelGroupMessage } from "../../models/grpMessageModel";
import { modelMessage } from "../../models/messageModl";


export async function sentGroupMessage({
    sentFrom,
    textMessage,
    groupId,
    createdAt = serverTimestamp()
}){

    const docRef = await addDoc(collection(db,'groupMessages'),{
        [modelGroupMessage[1]]:sentFrom,
        [modelGroupMessage[2]]:groupId,
        [modelGroupMessage[3]]:textMessage,
        [modelGroupMessage[4]]:createdAt
    })

    return docRef

}

export function readGroupMessageSnapshot({
    groupId,

}, onUpdate = (messages) => { }) {

    const q = query(collection(db, 'groupMessages'),
        orderBy(modelGroupMessage[4], 'asc'),where(modelGroupMessage[2], '==', groupId)
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map(
            doc => ({
                ...doc.data(),
                id: doc.id
            })
        )
        onUpdate(messages)
    });
    return unsubscribe;

}