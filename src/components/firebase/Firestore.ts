import { doc, getDoc, setDoc } from "firebase/firestore";
import {firestore} from './config';
import {FirebasePath} from "../../model/Firebase";
import {IUser} from "../../model/User";

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

export const generateUserDocument = async (id: string,user: {email: string, name: string}): Promise<any> => {
    const { name, email } = user;
    const docRef = doc(firestore, FirebasePath.users, id);
    const snapshot = await getDoc(docRef);
    try {
        if (!snapshot.exists()) {
            return await setDoc(docRef, { id, name, email });
        } else {
            console.log(`User document already exists`);
        }
    } catch (error) {
        console.log(error);
    }
};