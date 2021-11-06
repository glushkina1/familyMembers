import React, {useState} from 'react';
import {Dimensions, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import UserLocation from "../components/UserLocation";
import MemberList from '../components/MemberList';


const HomeScreen = ({route, navigation}) => {
    const [loading, setLoading] = useState(true);


    // if (loading) {
    //     return <ActivityIndicator color='red' size="large" style={styles.loader}/>;
    // }


    return (
        <View style={styles.homeScreen}>
            <UserLocation/>
            <View style={styles.memberListStyle}>
                <MemberList navigation={navigation}/>
            </View>
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
