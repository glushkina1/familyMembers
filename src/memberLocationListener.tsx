import {getDatabase, onValue, ref, set} from "@firebase/database";
import {useDispatch} from "react-redux";
import {updateMemberLocation} from "./store/memberActions";
import {initializeApp} from "@firebase/app";
import { firebaseConfig } from "./firebase.config";

const app = initializeApp(firebaseConfig);

export const startListenLocation = (phoneNumber: number) => {
    const dispatch = useDispatch();
    const db = getDatabase();

    const reference = ref(db, 'members/' + phoneNumber);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        dispatch(updateMemberLocation(phoneNumber, data.latitude, data.longitude, data.timestamp))
    })
};

export const setCurrentLocation = (phoneNumber: number, latitude: number, longitude: number, timestamp: number) => {
    const db = getDatabase();
    const reference = ref(db, 'members/' + phoneNumber);
    set(reference, {
        latitude: latitude,
        longitude: longitude,
        timestamp: timestamp,
    }).then(() => null);
};

