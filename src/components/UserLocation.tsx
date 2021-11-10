import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {Text} from "react-native";
import { positionstack_api_key } from "../../config.json"
import {setCurrentLocation} from "../firebase.config";


const UserLocation = () => {
    const [regionName,setRegionName] = useState(null)

    const userPhoneNumber: number = 79955981630;

    // let test = DistanceCalculation(52,52,54,54)
    // console.log(test)


    useEffect(() => {
        (async () => {
            try {
                let foregroundPermission = await Location.requestForegroundPermissionsAsync();
                let backgroundPermission = await Location.requestBackgroundPermissionsAsync();

                if (foregroundPermission.status !== 'granted' || backgroundPermission.status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                } else {
                    // console.log('Все разрешения для отслеживания локации даны')
                }

                let currentPosition = await Location.getCurrentPositionAsync();

                if (currentPosition.coords) {
                    const res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${positionstack_api_key}&query=${currentPosition.coords.latitude},${currentPosition.coords.longitude}`);
                    const resJson = await res.json();
                    setRegionName(resJson);

                    function refresh(): Promise<number> {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(Math.floor(Math.random() * 100));
                            }, 100);
                        });
                    }

                    const  interval = setInterval(async () => {
                        let fakeLat = await refresh();
                        let fakeLon = await refresh();
                        let date = await new Date();

                        setCurrentLocation(userPhoneNumber, fakeLat, fakeLon, date)
                        console.log('Updating your location every 1 min to firebase', fakeLat, fakeLon);
                    }, 60000);

                    return () => clearInterval(interval);
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
            {regionName ? 'Your current location is: \n' + regionName.data[0].region + ', ' + regionName.data[0].country  + "\n" + regionName.data[0].latitude + "\n" + regionName.data[0].longitude: 'Waiting...'}
        </Text>

    )
}

export default UserLocation;
