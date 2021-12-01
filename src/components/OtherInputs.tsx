import inputStyles from "../globalStyles/inputStyle"
import {Keyboard, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";

type Props = {
    personName: string,
    setPersonName: (currency: string) => void,
    personRelationship: string,
    setPersonRelationship: (currency: string) => void,
}

const OtherInputs = ({personName, setPersonName, personRelationship, setPersonRelationship}: Props) => {

    const upperCase = (text: string) => {
        setPersonName(text.charAt(0).toUpperCase() + text.slice(1))
    }
    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}> {children}
        </TouchableWithoutFeedback>
    );


    return (
        <View style={inputStyles.containerInput}>
            <TextInput
                placeholder="Person's name"
                placeholderTextColor='#c0c0c0'
                value={personName}
                onChangeText={text => upperCase(text)}
                style={inputStyles.input}
            />
            <TextInput
                placeholder="Relationship to the person"
                placeholderTextColor='#c0c0c0'
                value={personRelationship}
                onChangeText={text => setPersonRelationship(text)}
                style={inputStyles.input}
            />
        </View>

    )

};

export default OtherInputs;
