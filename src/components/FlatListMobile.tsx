import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Provider} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {deleteMember} from '../store/memberActions';
import flatListStyles from "../globalStyles/flatListStyles";


export const FlatListMobile = ({navigation}) => {

    // const userPhoneNumber: number = 79955981630;
    const dispatch = useDispatch();

    const members = useSelector((state: any) => state.members);

    const deleteMemberHandler = (phoneNumber) => {
        dispatch(deleteMember(phoneNumber))
    };


    return (
        <Provider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                                    <Text style={flatListStyles.textParams}>
                                        {item.relationship}
                                    </Text>
                                </View>
                                <View style={flatListStyles.personParams}>
                                    <Text style={flatListStyles.textParams}>
                                        {item.distance}km
                                    </Text>
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
            </TouchableWithoutFeedback>
        </Provider>
    )
}

// const styles = StyleSheet.create({
//
// });


export default FlatListMobile;
