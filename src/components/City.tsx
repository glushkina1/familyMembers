import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {Text} from "react-native";

const City = () => {
    let api_key = 'AIzaSyAqMaNkSRJH22vnZ14dy1EjggLJZ847A-Q';
    let textLocation = 'Waiting..';
    let regionName;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                Location.setGoogleApiKey(api_key);


                let {coords} = await Location.getCurrentPositionAsync();
                setLocation(coords);

                if (coords) {
                    let {longitude, latitude} = coords;

                    regionName = await Location.reverseGeocodeAsync({
                        longitude,
                        latitude,
                    });
                }

                textLocation = JSON.stringify(location);
                return;
            } catch (errorMsg) {
                textLocation = errorMsg;
                console.log(errorMsg)
                return;
            }
        })();
    }, []);

    console.log(location ?  regionName : 'pappy')

    return (
        <Text>
            Your location:  {"\n"}
            {location ? location.latitude : 'Waiting...'}
        </Text>

    )
}

export default City;
