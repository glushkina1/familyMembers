import React from 'react';
import {Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Provider} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {deleteMember} from '../store/memberActions';
import {getCurrentLocation} from "../firebase.config"
import {distanceCalculation} from "./Distance";


export const MemberList = ({navigation}) => {

    // let test = distanceCalculation(52,52,54,54)
    // console.log(test)

    const dispatch = useDispatch();
    const members = useSelector((state: any) => state.members);
    // console.log(members)


    const handleDistance = (phoneNumber: number) => {
        let data = getCurrentLocation(phoneNumber)
        console.log(data)
        return data
    };

    const deleteMemberHandler = (phoneNumber) => {
        dispatch(deleteMember(phoneNumber))
    };

    const formatPhoneNumberBack = (phoneNumber) => {
        let countryCode = phoneNumber.charAt(0);
        let areaCode = phoneNumber.slice(1, 4);
        let middle = phoneNumber.slice(4, 7);
        let preLast = phoneNumber.slice(7, 9);
        let last = phoneNumber.slice(9, 11);
        return `+${countryCode} (${areaCode}) ${middle}-${preLast}-${last}`
    };


    return (
        <Provider>
            <View style={styles.personComponentStyle}>
                {members.length > 0 ?
                    <FlatList
                        data={members}
                        keyExtractor={item => item.phoneNumber}
                        style={{marginBottom: 5}}
                        renderItem={({item}) => <TouchableOpacity onPress={
                            () => navigation.navigate('NewMemberScreen', {
                                phoneNumber: item.phoneNumber,
                            })}>
                            <View style={styles.allParamsPerson}>
                                {item.image ? <Image source={{uri: item.image}} style={styles.personImage}/>
                                    : <Image source={require('../assets/cat.png')} style={styles.personImage}/>}
                                <View style={styles.personParams}>
                                    <Text style={styles.textParams}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.personParams}>
                                    <Text style={styles.textParams}>
                                        {item.relationship}
                                    </Text>
                                </View>
                                <View style={styles.personParams}>
                                    <Text style={styles.textParams}>
                                        {item.sex}
                                    </Text>
                                </View>
                                <View style={styles.personParams}>
                                    <Text style={styles.textParams}>
                                        {formatPhoneNumberBack(item.phoneNumber)}
                                    </Text>
                                </View>
                                <View style={styles.personParams}>
                                    <Text style={styles.textParams}>
                                        {handleDistance(item.phoneNumber)}
                                    </Text>
                                </View>
                                <View style={styles.personParams}>
                                    <TouchableOpacity onPress={() => deleteMemberHandler(item.phoneNumber)}>
                                        <Ionicons name='close-outline' size={28} color="#A9A9A9"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        }
                    /> : <Text>No members in your family</Text>
                }
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    personComponentStyle: {
        padding: 10,
        marginTop: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                width: Dimensions.get('window').width
            },
            web: {
                width: '100%',
            },
            android: {
                width: Dimensions.get('window').width
            }
        }),
    },
    personImage: {
        width: 70,
        height: 70,
        borderRadius: 45,
    },
    personParams: {
        ...Platform.select({
            ios: {
                width: 10,
            },
            web: {
                minWidth: 120,
            },
            android: {
                width: 30,
            }
        }),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textParams: {},
    infoStyle: {
        fontSize: 22,
    },
    allParamsPerson: {
        ...Platform.select({
            ios: {
                width: Dimensions.get('window').width
            },
            web: {
                width: '100%',

            },
            android: {
                width: Dimensions.get('window').width
            }
        }),
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70
    },
});


export default MemberList;
