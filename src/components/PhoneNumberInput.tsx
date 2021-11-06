import inputStyles from "../globalCss/inputStyle"
import {TextInput, View} from 'react-native';
import React from "react";

type Props = {
    personPhoneNumber: string,
    setPersonPhoneNumber: (currency: string) => void,
}

const PhoneNumberInput = ({personPhoneNumber, setPersonPhoneNumber}: Props) => {


    const regexPhoneNumber = (text) => {
        let phoneNum = '';
        let onlyDigitsString = text.replace(/\D/gi, '') || ''


        if (onlyDigitsString.length > 0) {

            let countryCode = onlyDigitsString.charAt(0);
            let areaCode = onlyDigitsString.slice(1, 4);
            let middle = onlyDigitsString.slice(4, 7);
            let preLast = onlyDigitsString.slice(7, 9);
            let last = onlyDigitsString.slice(9, 11);

            //+7 (995)598-16-30

            if (onlyDigitsString.length < 2) {
                phoneNum = `+${countryCode}`
                setPersonPhoneNumber(phoneNum)
            } else if (onlyDigitsString.length < 7) {
                phoneNum = `+${countryCode} (${areaCode}) ${middle}`;
                setPersonPhoneNumber(phoneNum)
            } else if (onlyDigitsString.length < 9) {
                phoneNum = `+${countryCode} (${areaCode}) ${middle}-${preLast}`
                setPersonPhoneNumber(phoneNum)
            } else {
                phoneNum = `+${countryCode} (${areaCode}) ${middle}-${preLast}-${last}`
                setPersonPhoneNumber(phoneNum)
            }
        }
        setPersonPhoneNumber(phoneNum)
    }

    return (
        <View style={inputStyles.containerInput}>
            <TextInput
                style={inputStyles.input}
                placeholder="phone number"
                placeholderTextColor='#c0c0c0'
                value={personPhoneNumber}
                onChangeText={text => regexPhoneNumber(text)}
                onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {

                        let lastNumber = personPhoneNumber;
                        let lastChar = '';

                        for (let i = lastNumber.length - 1; i >= 0; i--) {
                            lastChar = lastNumber.charAt(i)
                            if (parseInt(lastChar).toString() == lastChar)
                                break;
                            lastNumber = lastNumber.slice(0, i)
                        }
                        setPersonPhoneNumber(lastNumber);
                    }
                }}
            />
        </View>
    )

};

export default PhoneNumberInput;
