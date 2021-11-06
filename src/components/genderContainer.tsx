import {Platform, StyleSheet, Text, View} from "react-native";
import {RadioButton} from "react-native-paper";
import React from "react";


type Props = {
    personSex: string,
    setPersonSex: (currency: string) => void,
}

const GenderContainer = ({personSex, setPersonSex}:Props) => {



    return (
        <View style={styles.wholeGenderContainer}>
            <View style={styles.genderContainer}>
                <Text>male</Text>
                <RadioButton
                    value="male"
                    status={personSex === 'male' ? 'checked' : 'unchecked'}
                    color='#0074D9'
                    uncheckedColor='#ddd'
                    onPress={() => {
                        setPersonSex('male');
                    }}
                />
            </View>
            <View style={styles.genderContainer}>
                <Text>female</Text>
                <RadioButton
                    value="female"
                    status={personSex === 'female' ? 'checked' : 'unchecked'}
                    color='pink'
                    uncheckedColor='#ddd'
                    onPress={() => {
                        setPersonSex('female');
                    }}
                />
            </View>
            <View style={styles.genderContainer}>
                <Text>non-binary</Text>
                <RadioButton
                    value="non-binary"
                    status={personSex === 'non-binary' ? 'checked' : 'unchecked'}
                    color='black'
                    uncheckedColor='#ddd'
                    onPress={() => {
                        setPersonSex('non-binary');
                    }}
                />
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    wholeGenderContainer: {
        ...Platform.select({
            ios: {
                flexDirection: 'column',
                borderWidth: 1,
                borderColor: 'black',
            },
            web: {
                width: '40%',
                justifyContent: 'space-around',
                flexDirection: 'row',
            },
            android: {
                flexDirection: 'column',
            }
        }),
        marginTop: 10,
    },
    textGender: {
        fontSize: 22,
        ...Platform.select({
            ios: {
                alignItems: 'center',
            },
            web: {
                alignItems: 'center',
            },
            android: {
                alignItems: 'flex-start',
            }
        }),
        justifyContent: "center",
    },
    genderContainer: {
        ...Platform.select({
            ios: {
                flexDirection: 'row',
                justifyContent: "space-between",
            },
            web: {},
            android: {
                flexDirection: 'row',
            }
        }),
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default GenderContainer;
