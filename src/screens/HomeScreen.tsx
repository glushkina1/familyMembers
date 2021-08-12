import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PersonComponent from '../components/Person'
import {getMembers} from "../store/actions/memberActions";
import {useAppDispatch} from "../store";
import * as Location from "expo-location";

const HomeScreen = ({route, navigation}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log('HERE', location.coords.longitude)
        })();
    }, []);

    useEffect(() => {
        dispatch(getMembers(() => setLoading(false)));
    }, [dispatch]);

    if (loading) {
        return <ActivityIndicator color='red' size="large" style={styles.loader}/>;
    }


    let textLocation = 'Waiting..';
    if (errorMsg) {
        textLocation = errorMsg;
    } else if (location) {
        textLocation = JSON.stringify(location);
    }

    const coords = textLocation[0];
    console.log(location)
    console.log()

    return (
        <View style={styles.homeScreen}>
            <Text>
                Ваша локация:  {"\n"}
            </Text>
            <PersonComponent navigation={navigation} route={route}/>
            <View style={styles.buttonPlus}>
                <TouchableOpacity onPress={() => navigation.navigate('New Member', {id: 0})}>
                    <Ionicons name='add-circle-outline' size={60} color="blue"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E8EAED'
    },
    buttonPlus: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    loader: {
        marginTop: 20,
    }
});


export default HomeScreen;
