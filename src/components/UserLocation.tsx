import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {Text} from "react-native";
import { positionstack_api_key } from "../../config.json"
import {setCurrentLocation} from "../firebase.config";

const UserLocation = () => {
    const [regionName,setRegionName] = useState(null)
    let errorMsg = 'there is an error';

    const phoneNumberAnna = '+79955981630';

    useEffect(() => {
        (async () => {
            try {
                let foregroundPermission = await Location.requestForegroundPermissionsAsync();
                let backgroundPermission = await Location.requestBackgroundPermissionsAsync();

                if (foregroundPermission.status !== 'granted' || backgroundPermission.status !== 'granted') {
                    errorMsg = 'Permission to access location was denied';
                    return;
                } else {
                    console.log('Все разрешения для отслеживания локации даны')
                }

                let currentPosition = await Location.getCurrentPositionAsync();

                if (currentPosition.coords) {
                    const res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${positionstack_api_key}&query=${currentPosition.coords.latitude},${currentPosition.coords.longitude}`);
                    const resJson = await res.json();
                    setRegionName(resJson);
                    setCurrentLocation(phoneNumberAnna, currentPosition.coords.latitude,currentPosition.coords.longitude)
                }
                return;
                } catch (errorMsg) {
                    console.log('something wrong with currentPosition.coords')
                    return;
                }
        })();
    }, []);

    return (
        <Text>
            {regionName ? 'Your current location is: \n' + regionName.data[0].region + ', ' + regionName.data[0].country : 'Waiting...'}
        </Text>
    )
}

export default UserLocation;
