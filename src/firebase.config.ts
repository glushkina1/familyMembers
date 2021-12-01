import {initializeApp} from "@firebase/app";
import {getDatabase, onValue, ref, set} from '@firebase/database';
import {getAuth, onAuthStateChanged, signInWithCredential,} from "@firebase/auth"
import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyBNdOhCueSGCNENM8zLk5ZD1c_ronEDZKo",
    authDomain: "my-family-members-323322.firebaseapp.com",
    databaseURL: "https://my-family-members-323322-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-family-members-323322",
    storageBucket: "my-family-members-323322.appspot.com",
    messagingSenderId: "903414780879",
    appId: "1:903414780879:web:65199bb17e566c744ff8ba",
    measurementId: "G-FVYK2Y7SQ1"
};

export const getCurrentLocation = (phoneNumber: number, setData: (locationParams: any) => void) => {


    const db = getDatabase();
    const reference = ref(db, 'members/' + phoneNumber);
    return onValue(reference, (snapshot) => {
        const data = snapshot.val();
        setData(data);
        console.log('setData',data)
    })
};


export const setCurrentLocation = (phoneNumber: number, latitude: number, longitude: number, timestamp: number) => {
    const db = getDatabase();
    const reference = ref(db, 'members/' + phoneNumber);
    let date = new Date(timestamp * 1000)
    set(reference, {
        latitude: latitude,
        longitude: longitude,
        timestamp: timestamp,
    }).then(() => console.log('setCurrentLocation to mainUser/firebase.config'));
};
// export const auth = firebase.auth()
const app = initializeApp(firebaseConfig);
