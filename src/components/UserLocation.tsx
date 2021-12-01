import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {Text} from "react-native";
import { positionstack_api_key } from "../../config.json"
import {setCurrentLocation} from "../firebase.config";


const UserLocation = () => {
    const [regionName,setRegionName] = useState(null);

    const userPhoneNumber: number = 79955981630;

    // setCurrentLocation(1111111111, 11.11, 11.11, 1637613747.789)
    // setCurrentLocation(9999999999, 88.99, 88.99, 1636613747.789)

    useEffect(() => {
        (async () => {
            try {
                let foregroundPermission = await Location.requestForegroundPermissionsAsync();
                let backgroundPermission = await Location.requestBackgroundPermissionsAsync();

                if (foregroundPermission.status !== 'granted' || backgroundPermission.status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }

                const  interval = setInterval(async () => {

                    let currentPosition = await Location.getCurrentPositionAsync();

                    if (currentPosition.coords) {
                        const res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${positionstack_api_key}&query=${currentPosition.coords.latitude},${currentPosition.coords.longitude}`);
                        const resJson = await res.json();
                        setRegionName(resJson);
                        let timestamp = new Date().getTime()/1000;
                        let lat = parseFloat(currentPosition.coords.latitude.toFixed(2));
                        let long = parseFloat(currentPosition.coords.longitude.toFixed(2));
                        console.log('set location every 1 min');
                        setCurrentLocation(userPhoneNumber, lat, long, timestamp)
                    }
                    return;
                }, 3000000);

                return () => clearInterval(interval);

                } catch (errorMsg) {
                    console.log('something wrong with currentPosition.coords')
                    return;
                }
        })();
    }, []);


    return (
        <Text>
            {regionName ?
                'Your current location is: \n' +
                regionName.data[0].region + ', ' +
                regionName.data[0].country  + "\n" +
                regionName.data[0].latitude + "\n" +
                regionName.data[0].longitude
                : 'Waiting...'}
        </Text>

    )
}

export default UserLocation;
