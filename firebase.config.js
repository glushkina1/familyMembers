import {initializeApp} from "firebase/app";
import { updateDoc, serverTimestamp } from "firebase/firestore"
import {getFirestore, doc, getDocs, setDoc, collection} from "firebase/firestore/lite";


const firebaseConfig = {
    apiKey: "AIzaSyAZEQsdDViGyqzZhStqiRklWTVEcF9O1ao",
    authDomain: "find-family-members.firebaseapp.com",
    projectId: "find-family-members",
    storageBucket: "find-family-members.appspot.com",
    messagingSenderId: "155110974389",
    appId: "1:155110974389:web:a9b8f7796c8d52f582affc",
    measurementId: "G-GSKKB6MBJK"
};

const app = initializeApp(firebaseConfig);

export const loadMembersFromFirebase = async () => {
        const db = getFirestore(app);
        const members = collection(db, 'members');
        const membersSnapshot = await getDocs(members);
        const memberList = membersSnapshot.docs.map(doc => doc.data());
        console.log(memberList)

}

export const addMemberToFirestore = async () => {
    const db = getFirestore(app);
    const membersRef = doc(db, 'members', 'phone_number_anna');
    await setDoc(membersRef, {
        coords: [40, 33],
        nickname: "CA",
    });
}

export const updateLocation = async () => {
    const db = getFirestore(app);
    const docRef = doc(db, 'members', 'phone_number_anna');
    const updateTimestamp = await updateDoc(docRef, {
        timestamp: serverTimestamp(3)
    });
}
