import {firebaseAuth} from './config';
import {
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    User,
} from 'firebase/auth';

export function firebaseSignOut(): Promise<void> {
    return signOut(firebaseAuth);
}

export function loginWithEmailAndPassword(email:string, password: string): Promise<any> {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
}

export function registerUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

export function checkIsAuth(callback: (user: User | null) => void) {
    return onAuthStateChanged(firebaseAuth, callback);
}