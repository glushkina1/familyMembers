import React, {useState} from 'react';
import {FlatList, Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Provider} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {deleteMember} from '../store/memberActions';
import flatListStyles from "../globalStyles/flatListStyles";
import Distance from "./Distance";
import Timestamp from "./Timestamp";

type Props = {
    members: any,
    mainUser: any,
    navigation:any,
}

export const FlatListMobile = ({navigation, members, mainUser} : Props) => {
    const dispatch = useDispatch();

    const deleteMemberHandler = (phoneNumber) => {
        dispatch(deleteMember(phoneNumber))
    };


    return (
        <Provider>
            <View style={flatListStyles.personComponentStyle}>
                {members.length > 0 ?
                    <FlatList
                        data={members}
                        keyExtractor={item => item.phoneNumber}
                        style={flatListStyles.flatListStyle}
                        renderItem={({item}) => <TouchableOpacity onPress={
                            () => navigation.navigate('NewMemberScreen', {
                                phoneNumber: item.phoneNumber,
                            })}>
                            <View style={flatListStyles.allParamsPerson}>
                                {item.image ? <Image source={{uri: item.image}} style={flatListStyles.personImage}/>
                                    : <Image source={require('../assets/cat.png')} style={flatListStyles.personImage}/>}
                                <View style={flatListStyles.personParams}>
                                    <View>
                                        <Text style={flatListStyles.textParams}>
                                            {item.name}
                                        </Text>
                                        <Text style={flatListStyles.textParams}>
                                            {item.relationship}
                                        </Text>
                                    </View>
                                </View>
                                <View style={flatListStyles.personParams}>
                                    <Distance MainUserLatitude={mainUser.latitude} MainUserLongitude={mainUser.longitude}
                                              MemberLatitude={item.latitude} MemberLongitude={item.longitude}/>
                                </View>
                                <View style={flatListStyles.personParams}>
                                    <Timestamp MemberTimestamp={item.timestamp}/>
                                </View>
                                <View style={{...flatListStyles.personParams,...flatListStyles.deleteIcon}}>
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


export default FlatListMobile;
