import React from "react";


export const regexPhoneNumber = (text) => {


    let phoneNum = '';
    let onlyDigitsString = text.replace(/\D/gi, '') || ''


    if (onlyDigitsString.length > 0) {

        let countryCode = onlyDigitsString.charAt(0);
        let areaCode = onlyDigitsString.slice(1, 4);
        let middle = onlyDigitsString.slice(4, 7);
        let preLast = onlyDigitsString.slice(7, 9);
        let last = onlyDigitsString.slice(9, 11);


        if (onlyDigitsString.length < 2) {
            phoneNum = `+${countryCode}`
        } else if (onlyDigitsString.length < 7) {
            phoneNum = `+${countryCode} (${areaCode}) ${middle}`;
        } else if (onlyDigitsString.length < 9) {
            phoneNum = `+${countryCode} (${areaCode}) ${middle}-${preLast}`
        } else {
            phoneNum = `+${countryCode} (${areaCode}) ${middle}-${preLast}-${last}`
        }
    }
    console.log('file', phoneNum)
    return phoneNum;

}

export const deleteLastNum = (phoneNumber) => {
    let lastNumber = phoneNumber;
    let lastChar = '';

    for (let i = lastNumber.length - 1; i >= 0; i--) {
        lastChar = lastNumber.charAt(i)
        if (parseInt(lastChar).toString() == lastChar)
            break;
        lastNumber = lastNumber.slice(0, i)
    }
    return lastNumber;
};
