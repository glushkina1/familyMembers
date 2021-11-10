import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {saveMember, updateMember} from "../store/memberActions";
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import PhoneNumberInput from "../components/PhoneNumberInput";
import OtherInputs from "../components/OtherInputs";
import GenderContainer from "../components/genderContainer";
import ImageComponent from "../components/ImageComponent";


const NewMemberScreen = ({route, navigation}) => {
    const [personName, setPersonName] = useState('');
    const [personRelationship, setPersonRelationship] = useState('');
    const [personImage, setPersonImage] = useState(null);
    const [personPhoneNumber, setPersonPhoneNumber] = useState('')
    const [showErrorAllFields, setShowErrorAllFields] = useState(false);
    const [showErrorUsedNumber, setShowErrorUsedNumber] = useState(false);
    const [showErrorValidPhoneNumber, setShowErrorValidPhoneNumber] = useState(false);
    const [personSex, setPersonSex] = useState('male');
    const dispatch = useDispatch();
    const members = useSelector((state: any) => state.members);


    if (route.params) {
        useEffect(() => {
            const memberFound = members.find(member => member.phoneNumber === route.params.phoneNumber);
            if (memberFound) {
                setPersonName(memberFound.name);
                setPersonSex(memberFound.sex);
                setPersonRelationship(memberFound.relationship);
                setPersonImage(memberFound.image)
                setPersonPhoneNumber(memberFound.phoneNumber)
            }
        }, [members]);
    }


    const modifyPhoneNumber = (personPhoneNumber) => {
        return personPhoneNumber.replace(/\D/gi, '') || ''
    };


    const saveMemberHandler = () => {
        let phoneNumber = modifyPhoneNumber(personPhoneNumber);
        if (route.params) {
            const updMember = {
                name: personName,
                relationship: personRelationship,
                sex: personSex,
                image: personImage || '',
                phoneNumber: phoneNumber,
            }
            dispatch(updateMember(updMember));
            navigation.navigate('HomeScreen');
            return;
        }
        const usedNumber = members.filter(member => member.phoneNumber === phoneNumber)
        if (usedNumber.length > 0) {
            setShowErrorUsedNumber(true)
            return;
        }

        if (personName && personRelationship && personSex && phoneNumber) {
            if (phoneNumber.length < 11) {
                setShowErrorValidPhoneNumber(true)
                return;
            } else {
                setShowErrorValidPhoneNumber(false)
                let newMember = {
                    name: personName,
                    relationship: personRelationship,
                    sex: personSex,
                    image: personImage || '',
                    phoneNumber: phoneNumber,
                    latitude:0,
                    longitude:0,
                }
                dispatch(saveMember(newMember));
                navigation.navigate('HomeScreen');
            }

        } else {
            setShowErrorAllFields(true)
        }

    }

    return (
        <View style={styles.newMemberScreen}>
            <OtherInputs personName={personName}
                         setPersonName={setPersonName}
                         personRelationship={personRelationship}
                         setPersonRelationship={setPersonRelationship}/>
            <PhoneNumberInput personPhoneNumber={personPhoneNumber}
                              setPersonPhoneNumber={setPersonPhoneNumber}/>
            {showErrorUsedNumber && <Text style={{color: 'red'}}>This member is already in your list</Text>}
            {showErrorAllFields && <Text style={{color: 'red'}}>Error, fill in all the fields</Text>}
            {showErrorValidPhoneNumber && <Text style={{color: 'red'}}>Please enter invalid phone number</Text>}
            <GenderContainer personSex={personSex} setPersonSex={setPersonSex}/>
            <ImageComponent personImage={personImage} setPersonImage={setPersonImage}/>
            <View style={styles.buttonsContainer}>
                <Button icon="chevron-down-circle-outline"
                        mode='text'
                        compact={true}
                        style={styles.saveButton}
                        labelStyle={{color: 'white', fontSize: 14}}
                        onPress={() => saveMemberHandler()}>
                    save
                </Button>
                <Button icon="cancel"
                        mode='text'
                        compact={true}
                        style={styles.cancelButton}
                        labelStyle={{color: 'white', fontSize: 14}}
                        onPress={() => navigation.navigate('HomeScreen')}>
                    cancel
                </Button>
            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    newMemberScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8EAED'
    },
    buttonsContainer: {
        marginTop: 8,
        minHeight: 40,
        alignItems: 'center',
        flexDirection: 'row',
    },
    saveButton: {
        width: 85,
        backgroundColor: '#61C964',
    },
    cancelButton: {
        marginLeft: 5,
        width: 105,
        backgroundColor: '#D73A3A',
    },
});

export default NewMemberScreen;
