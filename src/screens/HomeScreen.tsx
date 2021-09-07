import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PersonComponent from '../components/Person'
import {getMembers} from "../store/actions/memberActions";
import {useAppDispatch} from "../store";
import City from "../components/City";

const HomeScreen = ({route, navigation}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(getMembers(() => setLoading(false)));
    }, [dispatch]);


    if (loading) {
        return <ActivityIndicator color='red' size="large" style={styles.loader}/>;
    }


    return (
        <View style={styles.homeScreen}>
            <City/>
            <PersonComponent navigation={navigation} route={route}/>
            <View style={styles.buttonPlus}>
                <TouchableOpacity onPress={() => navigation.navigate('NewMemberScreen', {id: 0})}>
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
    }
});


export default HomeScreen;
