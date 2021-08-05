import React from "react";
import { View, Text, StyleSheet} from "react-native";
import {useAppSelector} from "../hooks";


const PersonComponent = () => {

    const { members } = useAppSelector(state => state.member);
    console.log(members);

    const renderList  = () => {
        const list = members.map(member => {
            return (
                <View style={styles.personComponentStyle}>
                    <Text>{member.name}</Text>
                </View>
            );
        });

        return (
            <View>
                {list}
            </View>
        );
    }

    return (
    <View style={styles.personComponentStyle}>
        <Text style={styles.infoStyle}>
            if you dont see a picture here, you are a gay
        </Text>
        <Text style={styles.infoStyle}>

        </Text>
        <Text style={styles.infoStyle}>

        </Text>
        <Text style={styles.infoStyle}>
            fucker
        </Text>
        <Text style={styles.infoStyle}>
            100 metrov away
        </Text>
        {renderList()}
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
    infoStyle:{

        fontSize:22,

    },
})

export default PersonComponent
