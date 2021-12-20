import inputStyles from "../globalStyles/inputStyle"
import {TextInput, View} from 'react-native';
import React from "react";
import {deleteLastNum, regexPhoneNumber} from "./regexPhoneNumber";


type Props = {
    personPhoneNumber: string,
    setPersonPhoneNumber: (currency: string) => void,
}

const PhoneNumberInput = ({personPhoneNumber, setPersonPhoneNumber}: Props) => {

    const handlePhoneNumber = (text) => {
        return setPersonPhoneNumber(regexPhoneNumber(text));
    }



    return (
        <View style={inputStyles.containerInput}>
            <TextInput
                style={inputStyles.input}
                placeholder="phone number"
                placeholderTextColor='#c0c0c0'
                value={personPhoneNumber}
                keyboardType={"number-pad"}
                onChangeText={text => handlePhoneNumber(text)}
                onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                        setPersonPhoneNumber(deleteLastNum(personPhoneNumber));
                    }
                }}
            />
        </View>
    )

};

export default PhoneNumberInput;
