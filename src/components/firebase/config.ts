import {initializeApp} from "firebase/app";
import {initializeAuth, indexedDBLocalPersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const app = initializeApp({
    apiKey: "AIzaSyCk_pKEYorFLpSk6EX-ZIIMyRa5UXse15g",
    authDomain: "orlik-37a9a.firebaseapp.com",
    projectId: "orlik-37a9a",
    storageBucket: "orlik-37a9a.appspot.com",
    messagingSenderId: "51651776314",
    appId: "1:51651776314:web:46a7a0b1e1f5b8caee4a03"
})

export const firebaseAuth = initializeAuth(app, {persistence: [indexedDBLocalPersistence]});
export const firestore = getFirestore(app);