import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {Text} from "react-native";
import { positionstack_api_key } from "../../config.json"
import {setCurrentLocation} from "../firebase.config";

const City = () => {
    const [regionName,setRegionName] = useState(null)
    let errorMsg = 'there is an error';

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
                }
                return;
                } catch (errorMsg) {
                    console.log(errorMsg)
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

export default City;
