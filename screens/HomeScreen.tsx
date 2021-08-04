import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {Person, savePerson, getPerson} from "../store/MemberStore";
import {Ionicons} from '@expo/vector-icons';
import PersonComponent from '../Person'
import {getMembers} from "../store/actions/memberActions";

const HomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getMembers(() => setLoading(false)));
    }, [dispatch]);

    if (loading) {
        return <ActivityIndicator color='red' size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.homeScreen}>
            <PersonComponent text={'Popa'} personSex={'male'}/>
            <View style={styles.buttonPlus}>
                <TouchableOpacity onPress={() => navigation.navigate('New Member')}>
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
    loader:{
        marginTop: 20,
    }
});


export default HomeScreen;