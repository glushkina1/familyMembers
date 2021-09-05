import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {Text} from "react-native";
import { positionstack_api_key } from "../../config.json"

const City = () => {
    const [regionName,setRegionName] = useState(null)
    const [errorMsg, setErrorMsg] = useState('there is an error');

    useEffect(() => {
        (async () => {
            try {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let {coords} = await Location.getCurrentPositionAsync();

                if (coords) {
                    let {longitude, latitude} = coords;
                    const res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${positionstack_api_key}&query=${latitude},${longitude}`);
                    const resJson = await res.json();
                    setRegionName(resJson);
                }
                return;
            } catch (errorMsg) {
                setErrorMsg(errorMsg)
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
