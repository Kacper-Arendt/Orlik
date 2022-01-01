import {doc, getDoc, setDoc, updateDoc, increment} from "firebase/firestore";
import {firestore} from './config';
import {FirebasePath} from "../../model/Firebase";
import {IUser} from "../../model/User";

export const updateDocument = async <T>(path: FirebasePath, id: string, data: T, version: number) => {
    const docRef = await doc(firestore, path, id);
    await updateDoc(docRef, {
        ...data,
        version: increment(1),
    });
    const response  = await getDoc(docRef);
    if (response.exists()) {
        const responseDoc = response.data();
        if (responseDoc.version !== version){
                return 'Done'
        } else return 'Something went wrong, try again'
    }
}


export const getUserDocument = async (id: string) => {
    try {
        const docRef = doc(firestore, FirebasePath.users, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const response = docSnap.data();
            return response as IUser;
        }
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const getFirebaseDoc = async (path: FirebasePath, id: string) => {
    try {
        const docRef = doc(firestore, path, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch (error) {
        console.log('Error fetching data', error);
    }
}

export const generateUserDocument = async (
    id: string,
    email: string,
    createdAt: string,
    name: string,
    gender: string): Promise<any> => {
    try {
        const docRef = doc(firestore, FirebasePath.users, id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
            return await setDoc(docRef, {id, email, createdAt, name, gender});
        } else {
        }
    } catch (error) {
        console.log(error);
    }
};