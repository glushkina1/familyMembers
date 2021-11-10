import {initializeApp} from "@firebase/app";
import {getDatabase, onValue, ref, set} from '@firebase/database';
import {updateMemberLocation} from "../src/store/memberActions";
import {useDispatch, useSelector} from 'react-redux';
import {distanceCalculation} from "./components/Distance";

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

export const getCurrentLocation = (phoneNumber:number) => {

    const dispatch = useDispatch();

    phoneNumber = 79955981630;

    const db = getDatabase();
    const reference = ref(db, 'members/' + phoneNumber);
    return onValue(reference, (snapshot) => {
        const data = snapshot.val();
        // dispatch(updateMemberLocation(data))
        console.log('firebase.config','getCurrentLocation()', data)
        return data
    })
};


export const setCurrentLocation = (phoneNumber: number, latitude:number, longitude:number, date: Date) => {
     const db = getDatabase();
     const reference = ref(db, 'members/' + phoneNumber);
     set(reference, {
         latitude: latitude,
         longitude: longitude,
         date: date,
     }).then(() => console.log('firebase.config','setCurrentLocation()', latitude, longitude));
 };


const app = initializeApp(firebaseConfig);
