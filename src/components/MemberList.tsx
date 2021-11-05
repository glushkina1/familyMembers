import React from 'react';
import {Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Provider} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {deleteMember, updateMember} from '../store/memberActions';


export const MemberList = () => {

    const dispatch = useDispatch();
    const members = useSelector((state: any) => state.members);
    console.log(members)


    const deleteMemberHandler = (phoneNumber) => {
        dispatch(deleteMember(phoneNumber))
    };

    const updateMemberHandler = (member) => {
        dispatch(updateMember(member))
    };


    return (
        <Provider>
            <View style={styles.personComponentStyle}>
                {members.length > 0 ?
                    <FlatList
                        data={members}
                        keyExtractor={item => item.phoneNumber}
                        style={{marginBottom: 5}}
                        renderItem={({item}) => <TouchableOpacity onPress={() => updateMemberHandler(item)}>
                            <View style={styles.allParamsPerson}>
                                {item.image?  <Image source={{uri: item.image}} style={styles.personImage}/>
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
                                        100 m {"\n"} away
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
                minWidth: 135,
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
