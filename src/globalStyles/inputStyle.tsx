import {Platform, StyleSheet} from "react-native";


const inputStyles = StyleSheet.create({
    input: {
        ...Platform.select({
            ios: {
                width: '85%',
                fontSize: 20,
            },
            web: {
                width: '100%',
                fontSize: 28,
            },
            android: {
                width: '85%',
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
        ...Platform.select({
            ios: {
                width: '85%',
                fontSize: 20,
            },
            web: {
                width: '40%',
                fontSize: 28,
            },
            android: {
                width: '85%',
                fontSize: 20,
            }
        }),
    }
    });

export default inputStyles;
