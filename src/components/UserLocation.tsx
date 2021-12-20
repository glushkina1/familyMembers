import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {Text} from "react-native";
import {positionstack_api_key} from "../../config.json"
import {updateMainUser} from "../store/memberActions";
import {useDispatch} from "react-redux";
import { setCurrentLocation } from '../memberLocationListener';


type Props = {
    userPhoneNumber: string,
}

const UserLocation = ({userPhoneNumber}:Props) => {
    const [regionName,setRegionName] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            try {
                let foregroundPermission = await Location.requestForegroundPermissionsAsync();
                let backgroundPermission = await Location.requestBackgroundPermissionsAsync();

                if (foregroundPermission.status !== 'granted' || backgroundPermission.status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }

                    //обновление локации гл пользователя
                    let currentPosition = await Location.getCurrentPositionAsync();

                console.log(currentPosition)

                    if (currentPosition.coords) {
                        const res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${positionstack_api_key}&query=${currentPosition.coords.latitude},${currentPosition.coords.longitude}`);
                        const resJson = await res.json();
                        setRegionName(resJson);
                        let timestamp = new Date().getTime()/1000;
                        let latitude = parseFloat(currentPosition.coords.latitude.toFixed(2));
                        let longitude = parseFloat(currentPosition.coords.longitude.toFixed(2));
                        if (userPhoneNumber.length > 0 && currentPosition.coords) {
                            setCurrentLocation(parseInt(userPhoneNumber), latitude, longitude, timestamp)
                            dispatch(updateMainUser(latitude, longitude, timestamp))
                        }
                    }
                const  interval = setInterval(async () => {

                }, 20000);

                return () => clearInterval(interval);

                } catch (errorMsg) {
                    console.log('something wrong with currentPosition.coords')
                    return;
                }
        })();
    }, [userPhoneNumber]);



    return (
        <Text>
            {regionName ?
                'Your current location is: ' +
                regionName.data[0].region + ', ' +
                regionName.data[0].country  + "\n"
                : 'Updating location...'}
        </Text>

    )
}

export default UserLocation;
