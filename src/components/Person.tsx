import React from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform, Dimensions} from "react-native";
import {useAppSelector} from "../store";
import {useDispatch} from "react-redux";
import {deleteMember} from "../store/actions/memberActions";
import {Ionicons} from "@expo/vector-icons";


const PersonComponent = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {members} = useAppSelector(state => state.member);

    const updateMemberHandler = (member) => {
        navigation.navigate('NewMemberScreen', {id: member.id});
    }
    const deleteMemberHandler = (id) => {
        dispatch(deleteMember(id, () => navigation.navigate('HomeScreen'), null))
    }

    return (
        <View style={styles.personComponentStyle}>
            {members.length > 0 ? <FlatList
                data={members}
                keyExtractor={(member) => member.id}
                renderItem={({item}) => <TouchableOpacity onPress={() => updateMemberHandler(item)}>
                    <View style={styles.allParamsPerson}>
                        <Image source={{uri: item.image}} style={styles.personImage}/>
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
                            <TouchableOpacity onPress={() => deleteMemberHandler(item.id)}>
                                <Ionicons name='close-outline' size={28} color="#A9A9A9" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                }
            /> : <Text>No members in your family</Text>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    personComponentStyle: {
        padding:10,
        marginTop: 40,
        borderRadius:10,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                width: Dimensions.get('window').width
            },
            web: {
                width: '60%',
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
                width:10,
            },
            web: {
                minWidth: 120,
            },
            android: {
                width:30,
            }
        }),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textParams: {

    },
    infoStyle: {
        fontSize: 22,
    },
    allParamsPerson: {
        ...Platform.select({
            ios: {
                width: Dimensions.get('window').width
            },
            web: {
                width: '40%',
            },
            android: {
                width: Dimensions.get('window').width
            }
        }),
        marginLeft:30,
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70
    },
})

export default PersonComponent
