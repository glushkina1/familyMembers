import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PersonComponent from '../components/Person'
import {getMembers} from "../store/actions/memberActions";
import {useAppDispatch} from "../store";

const HomeScreen = ({route, navigation}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMembers(() => setLoading(false)));
    }, [dispatch]);

    if (loading) {
        return <ActivityIndicator color='red' size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.homeScreen}>
            <PersonComponent navigation={navigation} route={route}/>
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
