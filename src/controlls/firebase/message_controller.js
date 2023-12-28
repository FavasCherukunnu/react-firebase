import { collection, addDoc, query, where, getDocs, or, and, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { modelMessage } from "../../models/messageModl";

export async function sentPersonalMessage({
    textMessage,
    sentFrom,
    sentTo,
    createdAt,
}) {

    const docRef = await addDoc(collection(db, "messages"), {
        [modelMessage[3]]: textMessage,
        [modelMessage[1]]: sentFrom,
        [modelMessage[2]]: sentTo,
        [modelMessage[4]]: createdAt
    });

    return docRef;

}


export async function readPersonalMessage({
    ofUser,
    sentFrom
}) {
    const q = query(collection(db, 'messages'),
        orderBy(modelMessage[4], 'asc'),
        or(
            and(where(modelMessage[1], '==', sentFrom), where(modelMessage[2], '==', ofUser)),
            and(where(modelMessage[1], '==', ofUser), where(modelMessage[2], '==', sentFrom))
        )
    )
    const querySnaphot = await getDocs(q);

    return querySnaphot.docs.map(
        doc => ({
            ...doc.data(),
            id: doc.id
        })
    )
}

export function readPersonalMessageSnapshot({
    ofUser,
    sentFrom,
    onUpdate = (messages)=>{}
}){

    const q = query(collection(db, 'messages'),
        orderBy(modelMessage[4], 'asc'),
        or(
            and(where(modelMessage[1], '==', sentFrom), where(modelMessage[2], '==', ofUser)),
            and(where(modelMessage[1], '==', ofUser), where(modelMessage[2], '==', sentFrom))
        )
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map(
            doc=>({
                ...doc.data(),
                id:doc.id
            })
        )
        onUpdate(messages)
    });
    return unsubscribe;

}