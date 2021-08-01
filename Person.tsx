import React from "react";
import { TextInput, View, Text, StyleSheet} from "react-native";


const PersonComponent = (props) => {
    return (
    <View style={styles.personComponentStyle}>
        <View style={styles.infoStyle}>
            this is a picture
        </View>
            <Text style={styles.infoStyle}>
                {props.text}
            </Text>
            <Text style={styles.infoStyle}>
                {props.personSex}
            </Text>
    </View>
    )
}
const styles = StyleSheet.create({
    personComponentStyle: {
        width:'100%',
        borderWidth: 1,
        flexDirection:'row',
        alignItems:'flex-start',
    },
    personsPicture:{

    },
    infoStyle:{
        justifyContent:'space-between',
        fontSize:22,
        borderRightWidth: 1,

    },
})

export default PersonComponent