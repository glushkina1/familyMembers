import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Provider} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {deleteMember} from '../store/memberActions';
import flatListStyles from "../globalStyles/flatListStyles";

export const FlatListWeb = ({navigation}) => {

    const userPhoneNumber: number = 79955981630;
    const dispatch = useDispatch();


    const members = useSelector((state: any) => state.members);





    // const handleDistance = (phoneNumber: number) => {
    //     // let hours = date.getHours();
    //     // let minutes = "0" + date.getMinutes();
    //     // let seconds = "0" + date.getSeconds();
    //
    //     // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    //
    //
    //     return 0;
    // };


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
                                    <Text style={flatListStyles.textParams}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={flatListStyles.personParams}>
                                    <Text style={flatListStyles.textParams}>
                                        {item.relationship}
                                    </Text>
                                </View>
                                <View style={flatListStyles.personParams}>
                                    <Text style={flatListStyles.textParams}>
                                        {item.sex}
                                    </Text>
                                </View>
                                <View style={flatListStyles.personParams}>
                                    <Text style={flatListStyles.textParams}>
                                        {formatPhoneNumberBack(item.phoneNumber)}
                                    </Text>
                                </View>
                                <View style={flatListStyles.personParams}>
                                    <Text style={flatListStyles.textParams}>
                                        {item.distance}km
                                    </Text>
                                </View>
                                <View style={flatListStyles.personParams}>
                                    <Text style={flatListStyles.textParams}>
                                        lat:{item.latitude}
                                        lon:{item.longitude}
                                    </Text>
                                </View>
                                <View style={flatListStyles.personParams}>
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
};

export default FlatListWeb;
