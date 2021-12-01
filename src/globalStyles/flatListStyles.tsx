import {Dimensions, Platform, StyleSheet} from "react-native";


const flatListStyles = StyleSheet.create({
    flatListStyle: {
        flexDirection:'row',
        marginBottom: 5,
    },
    deleteIcon: {
        width: 30,
    },
    personComponentStyle: {
        padding: 10,
        marginTop: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                width: Dimensions.get('window').width * 0.9,
                minHeight:30,
            },
            web: {
                width: '100%',
            },
            android: {
                width: Dimensions.get('window').width * 0.9,
                minHeight:30,
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
                width: 70,
            },
            web: {
                minWidth: 120,
            },
            android: {
                width: 30,
            }
        }),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textParams: {
        fontVariant:['small-caps'],
    },
    infoStyle: {
        fontSize: 22,
    },
    allParamsPerson: {
        justifyContent:'space-around',
        ...Platform.select({
            ios: {
                width: Dimensions.get('window').width * 0.85,
            },
            web: {
                width: '100%',

            },
            android: {
                width: Dimensions.get('window').width * 0.85,
            }
        }),
        marginTop: 10,
        flexDirection: 'row',
        height: 70
    },
});


export default flatListStyles;
