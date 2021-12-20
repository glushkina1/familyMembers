import {Platform, StyleSheet} from "react-native";


const inputStyles = StyleSheet.create({
    input: {
        width: '100%',
        ...Platform.select({
            ios: {
                fontSize: 20,
            },
            web: {
                fontSize: 28,
            },
            android: {
                fontSize: 20,
            }
        }),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 9,
    },
    containerInput: {
        width:'100%',
        // borderWidth:5,
        // borderColor:'green',
        alignItems:'center',
        ...Platform.select({
            ios: {
                width:'100%',
                fontSize: 20,
            },
            web: {
                width: '40%',
                fontSize: 28,
            },
            android: {
                width:'100%',
                fontSize: 20,
            }
        }),
    }
    });

export default inputStyles;
