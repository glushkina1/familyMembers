import {initializeApp} from "@firebase/app";
import {getDatabase, ref, set} from '@firebase/database';

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



export const setCurrentLocation = (phoneNumber, latitude, longitude) => {
     const db = getDatabase();
     const reference = ref(db, 'members/' + phoneNumber);
     set(reference, {
         latitude: latitude,
         longitude: longitude,
     }).then(() => console.log(' setCurrentLocation is succeed'));
 };


const app = initializeApp(firebaseConfig);
