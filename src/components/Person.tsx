import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button} from "react-native";
import {useAppSelector} from "../store";
import {useDispatch} from "react-redux";
import {deleteMember, updateMember} from "../store/actions/memberActions";
import {Ionicons} from "@expo/vector-icons";


const PersonComponent = ({route, navigation}) => {
    const dispatch = useDispatch();
    const { members } = useAppSelector(state => state.member);
    console.log({ members })

    const updateMemberHandler = (member) => {
        dispatch(updateMember(member, () => navigation.navigate('New Member', {id: member.id}), null))
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
                <View style={{flexDirection:'row',justifyContent:'space-around', }}>
                <Text style={styles.personInList}>
                    {item.name}
                </Text>
                <Text style={styles.personInList}>
                    {item.relationship}
                </Text>
                <Text style={styles.personInList}>
                    {item.sex}
                </Text>
                <View style={styles.buttonCancel}>
                    <TouchableOpacity onPress={() => deleteMemberHandler(item.id)}>
                        <Ionicons name='close' size={17} color="red"/>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableOpacity>
            }
                /> : 'No members in your family'
            }
    </View>
    )
}
const styles = StyleSheet.create({
    personComponentStyle: {
        marginTop:40,
        width:'100%',
        borderWidth: 1,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-around',
    },
    personsPicture:{

    },
    personInList:{
        marginLeft:20,
    },
    infoStyle:{
        fontSize:22,
    },
    buttonCancel: {
    },
})

export default PersonComponent
