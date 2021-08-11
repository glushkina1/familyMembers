import React from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import {useAppSelector} from "../store";
import {useDispatch} from "react-redux";
import {deleteMember} from "../store/actions/memberActions";
import {Ionicons} from "@expo/vector-icons";


const PersonComponent = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {members} = useAppSelector(state => state.member);


    const updateMemberHandler = (member) => {
        navigation.navigate('New Member', {id: member.id})
    }
    const deleteMemberHandler = (id) => {
        dispatch(deleteMember(id, () => navigation.navigate('My family'), null))
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
                        <View style={styles.buttonCancel}>
                            <TouchableOpacity onPress={() => deleteMemberHandler(item.id)}>
                                <Ionicons name='close' size={17} color="red"/>
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
        marginTop: 40,
        width: '90%',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    personImage: {
        width: 70,
        height: 70
    },
    personParams: {
        minWidth: 120,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textParams: {},
    infoStyle: {
        fontSize: 22,
    },
    buttonCancel: {},
    allParamsPerson: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70
    },
})

export default PersonComponent
