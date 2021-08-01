import React from "react";
import { TextInput, View, Text, StyleSheet} from "react-native";


const PersonComponent = (props) => {
    return (
    <View style={styles.personComponentStyle}>
        <Text style={styles.infoStyle}>
            if you dont see a picture here, you are a gay
        </Text>
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