import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Platform, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import UserLocation from "../components/UserLocation";
import {setCurrentLocation} from "../firebase.config"
import MemberList from '../components/MemberList';
import {useDispatch} from "react-redux";


const HomeScreen = ({route, navigation}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();


    // if (loading) {
    //     return <ActivityIndicator color='red' size="large" style={styles.loader}/>;
    // }


    return (
        <View style={styles.homeScreen}>
            <UserLocation/>
            <View style={styles.memberListStyle}>
                <MemberList navigation={navigation} route={route}/>
            </View>
            {/*<TouchableOpacity onPress={()=> {setCurrentLocation(phoneNumber, lat, long)}}>*/}
            {/*    <Text>Test</Text>*/}
            {/*</TouchableOpacity>*/}
            <View style={styles.buttonPlus}>
                <TouchableOpacity onPress={() => navigation.navigate('NewMemberScreen')}>
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
        backgroundColor: '#F8F8FF'
    },
    buttonPlus: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    loader: {
        marginTop: 20,
    },
    memberListStyle: {
        ...Platform.select({
            ios: {
                width: Dimensions.get('window').width
            },
            web: {
                width: '80%',
            },
            android: {
                width: Dimensions.get('window').width
            }
        }),
    },
});


export default HomeScreen;
