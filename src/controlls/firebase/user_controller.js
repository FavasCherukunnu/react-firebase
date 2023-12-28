import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { modelUser } from "../../models/userModel";


export async function getAllUsers() {

    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const item = querySnapshot.docs.map(
        doc => ({
            id: doc.id,
            ...doc.data()
        })
    )

    return item;


}

export async function getAllOtherUsers({ OwnId }) {

    if (OwnId) {
        const q = query(collection(db, 'users'), where(modelUser[0], '!=', OwnId));
        const querySnapshot = await getDocs(q);
        const item = querySnapshot.docs.map(
            doc => ({
                id: doc.id,
                ...doc.data()
            })
        )

        return item;
    }
    return []


}

export async function getOneUser({ id }) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    return {
        ...docSnap.data(),
        id: id
    }
}