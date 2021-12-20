import inputStyles from "../globalStyles/inputStyle"
import {Keyboard, Platform, TextInput, View} from 'react-native';
import React from "react";
import {deleteLastNum, regexPhoneNumber} from "./regexPhoneNumber";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


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
            {Platform.OS === "web" ? <TextInput
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
                /> :
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
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
                </TouchableWithoutFeedback>
            }
        </View>
    )

};

export default PhoneNumberInput;
