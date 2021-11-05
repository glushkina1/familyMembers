import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import { saveMember} from "../store/memberActions";
import * as ImagePicker from 'expo-image-picker';
import {RadioButton, Button} from 'react-native-paper';
import { useDispatch } from 'react-redux';


const NewMemberScreen = ({ navigation}) => {
    const [personName, setPersonName] = useState('');
    const [personRelationship, setPersonRelationship] = useState('');
    const [personImage, setPersonImage] = useState(null);
    const [personPhoneNumber, setPersonPhoneNumber] = useState('')
    const [showError, setShowError] = useState(false);
    const [personSex, setPersonSex] = useState('male');
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const upperCase = (text: string) => {
        setPersonName(text.charAt(0).toUpperCase() + text.slice(1))
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (result.cancelled === false) {
            setPersonImage(result.uri);
        }
    };
    const regexPhoneNumber = (text) => {
        let phoneNum = '';
        let onlyDigitsString = text.replace(/\D/gi, '') || ''


        if (onlyDigitsString.length > 0) {

            let countryCode = onlyDigitsString.charAt(0);
            let areaCode = onlyDigitsString.slice(1, 4);
            let middle = onlyDigitsString.slice(4, 7);
            let preLast = onlyDigitsString.slice(7, 9);
            let last = onlyDigitsString.slice(9, 11);

            if (onlyDigitsString.length < 4) {
                phoneNum = `+${countryCode} (${areaCode})`
                setPersonPhoneNumber(phoneNum)
            } else if (onlyDigitsString.length < 7) {
                phoneNum = `+${countryCode} (${areaCode}) ${middle}`;
                setPersonPhoneNumber(phoneNum)
            } else if (onlyDigitsString.length < 9) {
                phoneNum = `+${countryCode} (${areaCode}) ${middle}-${preLast}`
                setPersonPhoneNumber(phoneNum)
            } else {phoneNum = `+${countryCode} (${areaCode}) ${middle}-${preLast}-${last}`
                setPersonPhoneNumber(phoneNum)
            }
        }
        setPersonPhoneNumber(phoneNum)
    }



    const saveMemberHandler = () => {
        if (personName && personRelationship && personSex && personPhoneNumber) {
            let newMember = {
                name: personName,
                relationship: personRelationship,
                sex: personSex,
                image: personImage || '',
                phoneNumber: personPhoneNumber,
            }
            dispatch(saveMember(newMember));
            navigation.navigate('HomeScreen');
        } else {
            setShowError(true)
        }
    }

    return (
        <View style={styles.newMemberScreen}>
            <TextInput
                placeholder="Person's name"
                placeholderTextColor='#c0c0c0'
                value={personName}
                onChangeText={text => upperCase(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Relationship to the person"
                placeholderTextColor='#c0c0c0'
                value={personRelationship}
                onChangeText={text => setPersonRelationship(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="phone number"
                placeholderTextColor='#c0c0c0'
                value={personPhoneNumber}
                onChangeText={text => regexPhoneNumber(text)}
                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                        let lastNumber = personPhoneNumber;
                        let lastChar = '';


                        for (let i = lastNumber.length - 1; i >= 0; i--) {
                            console.log(lastNumber, 0,lastChar)
                            lastChar = lastNumber.charAt(i)
                            if (parseFloat(lastChar).toString() == lastChar)
                                break;
                            lastNumber = lastNumber.slice(0, i)
                        }
                        setPersonPhoneNumber(lastNumber);
                    }
                }}
                style={styles.input}
            />
            {showError && <Text style={{color: 'red'}}>Error, fill in all the fields</Text>}
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
            {personImage ?
                <View style={{flexDirection: 'row'}}>
                    <Image
                        source={{uri: personImage}}
                        style={{width: 70, height: 70}}
                    />
                    <Button icon='delete'
                            mode='text'
                            style={{justifyContent: 'center', alignItems: 'center'}}
                            labelStyle={{color: '#D73A3A', fontSize: 25}}
                            onPress={() => setPersonImage(null)}>
                    </Button>
                </View>
                : <Button style={styles.imagePickerButton}
                          icon='camera'
                          mode='text'
                          labelStyle={styles.labelStyleImagePicker}
                          onPress={pickImage}>
                    <Text style={styles.imagePickerButtonText}>Choose an image for your member</Text>
                </Button>}
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
    input: {
        ...Platform.select({
            ios: {
                width: '85%',
                fontSize:20,
            },
            web: {
                width: '40%',
                fontSize: 28,
            },
            android: {
                width: '85%',
                fontSize:20,
            }
        }),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 9,
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
        marginTop:10,
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
    labelStyleImagePicker: {
        color: '#aaa',
        marginTop: 10,
    },
    imagePickerButton: {
        ...Platform.select({
            ios: {
                width: '80%',
            },
            web: {

            },
            android: {
                width: '80%',
            }
        }),
        marginTop: 10,
        backgroundColor: '#ddd'
    },
    imagePickerButtonText: {
        ...Platform.select({
            ios: {
                width: '90%',
                fontSize: 13,
            },
            web: {

            },
            android: {
                width: '90%',
            }
        }),
    },
});

export default NewMemberScreen;
