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
        // borderWidth:2,
        // borderColor:'red',
        flexDirection: 'row',
        justifyContent: 'space-around',
        ...Platform.select({
            ios: {
                width: '80%',
            },
            web: {
                width: '40%',
            },
            android: {
                width: '80%',
            }
        }),
        marginTop: 15,
    },
    textGender: {
        fontSize: 22,
        ...Platform.select({
            ios: {
                alignItems: 'flex-start',
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
        flexDirection: 'row',
        justifyContent: "space-around",
        ...Platform.select({
            ios: {

            },
            web: {

            },
            android: {

            }
        }),
        alignItems: 'center'
    },
});

export default GenderContainer;
