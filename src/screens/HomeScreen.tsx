import React, {useEffect, useState} from 'react';
import {Dimensions, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import UserLocation from "../components/UserLocation";
import MemberList from '../components/MemberList';
import {getAuth, signOut} from '@firebase/auth';

const HomeScreen = ({ navigation}) => {
    const [userPhoneNumber, setUserPhoneNumber] = useState('0')


    const auth = getAuth();
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigation.navigate('LoginScreen')
        }).catch((error) => {
            console.log('error with log out')
        });
    };
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                let ph = user.email.match(/[0-9]+/) || 0
                setUserPhoneNumber(ph[0])
                navigation.navigate("HomeScreen")
            } else {
                navigation.navigate("LoginScreen")
            }
        })
    }, [])


    return (
        <View style={styles.homeScreen}>
            <View>
                <UserLocation userPhoneNumber={userPhoneNumber}/>
            </View>
            <View style={styles.logOut}>
                <TouchableOpacity onPress={() => handleLogout()}>
                    <Ionicons name='log-out-outline' size={30} color="grey"/>
                    <Text style={{color: 'grey', fontSize: 12}}>log out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.memberListStyle}>
                <MemberList navigation={navigation}/>
            </View>
            <View style={styles.buttonPlus}>
                <TouchableOpacity onPress={() => navigation.navigate('NewMemberScreen')}>
                    <Ionicons name='add-circle-outline' size={60} color="#007FFF"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
    },
    logOut: {
        position: "absolute",
        top: 10,
        right: 23,
    },
    buttonPlusPlus: {
        position: "absolute",
        top: 10,
        left: 10,
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
                width: Dimensions.get('window').width * 0.9,
                height: Dimensions.get('window').height * 0.7,
                paddingBottom: 20,
            },
            web: {
                width: '80%',
            },
            android: {
                width: Dimensions.get('window').width * 0.9,
                height: Dimensions.get('window').height * 0.7,
                paddingBottom: 20,
            }
        }),
    },
});


export default HomeScreen;
