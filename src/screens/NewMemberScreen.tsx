import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from "../store";
import {createMember, updateMember} from "../store/actions/memberActions";
import * as ImagePicker from 'expo-image-picker';
import {RadioButton, Button} from 'react-native-paper';

const NewMemberScreen = ({route, navigation}) => {
    console.log(navigation,"here",route);
    const [personName, setPersonName] = useState('');
    const [personRelationship, setPersonRelationship] = useState('');
    const [personSex, setPersonSex] = useState('male')
    const [personImage, setPersonImage] = useState(null);
    const [showError, setShowError] = useState(false);
    const {members} = useAppSelector(state => state.member);
    const [checked, setChecked] = useState('male');
    const dispatch = useAppDispatch();


    useEffect(() => {
        const memberFound = members.find(mem => mem.id === route.params.id);
        if (memberFound) {
            setPersonName(memberFound.name);
            setPersonSex(memberFound.sex);
            setPersonRelationship(memberFound.relationship);
            setPersonImage(memberFound.image)
        }
    }, [members, route.params.id]);


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

    const handlePerson = () => {
        if (personName && personRelationship && personSex && !route.params.id) {
            dispatch(createMember(personName, personRelationship, personSex, personImage, navigation.navigate('HomeScreen'), null));
        } else if (personName && personRelationship && personSex && route.params.id) {
            const updMember = {
                name: personName,
                relationship: personRelationship,
                sex: personSex,
                id: route.params.id,
                image: personImage,
            }
            dispatch(updateMember(updMember, navigation.goBack(), null))
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
                onChangeText={text => setPersonName(text)}
                style={styles.inputName}
            />
            <TextInput
                placeholder="Relationship to the person"
                placeholderTextColor='#c0c0c0'
                value={personRelationship}
                onChangeText={text => setPersonRelationship(text)}
                style={styles.inputRelationship}
            />
            {showError && <Text style={{color: 'red'}}>Error, fill in all the fields</Text>}
            <View style={styles.wholeGenderContainer}>
                <View style={styles.genderContainer}>
                    <Text>male</Text>
                    <RadioButton
                        value="male"
                        status={checked === 'male' ? 'checked' : 'unchecked'}
                        color='#0074D9'
                        uncheckedColor='#ddd'
                        onPress={() => {
                            setChecked('male');
                            setPersonSex('male');
                        }}
                    />
                </View>
                <View style={styles.genderContainer}>
                    <Text>female</Text>
                    <RadioButton
                        value="female"
                        status={checked === 'female' ? 'checked' : 'unchecked'}
                        color='pink'
                        uncheckedColor='#ddd'
                        onPress={() => {
                            setChecked('female');
                            setPersonSex('female');
                        }}
                    />
                </View>
                <View style={styles.genderContainer}>
                    <Text>non-binary</Text>
                    <RadioButton
                        value="non-binary"
                        status={checked === 'non-binary' ? 'checked' : 'unchecked'}
                        color='black'
                        uncheckedColor='#ddd'
                        onPress={() => {
                            setChecked('non-binary');
                            setPersonSex('non-binary ');
                        }}
                    />
                </View>
            </View>
            {personImage ?
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={{uri: personImage}}
                        style={{width: 70, height: 70}}
                    />
                    <Button icon='delete'
                            mode='text'
                            style={{justifyContent:'center', alignItems:'center'}}
                            labelStyle={{color:'#D73A3A', fontSize:25}}
                            onPress={() => setPersonImage(null)}>
                    </Button>
                </View>
                : <Button style={styles.imagePickerButton}
                          icon='camera'
                          mode='text'
                          labelStyle={styles.labelStyleImagePicker}
                          onPress={pickImage}>
                    <Text>Choose an image for your member</Text>
                </Button>}
            <View style={styles.buttonsContainer}>
                <Button icon="chevron-down-circle-outline"
                        mode='text'
                        compact={true}
                        style={styles.saveButton}
                        labelStyle={{color: 'white', fontSize: 14}}
                        onPress={() => handlePerson()}>
                    save
                </Button>
                <Button icon="cancel"
                        mode='text'
                        compact={true}
                        style={styles.cancelButton}
                        labelStyle={{color: 'white', fontSize: 14}}
                        onPress={() => navigation.goBack()}>
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
    inputName: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        width: '40%',
        borderBottomWidth: 1,
    },
    inputRelationship: {
        textAlign: 'center',
        borderBottomWidth: 1,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 9,
        fontSize: 28,
        marginBottom: 15,
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
        width: '40%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    textGender: {
        fontSize: 22,
        alignItems: 'center',
        justifyContent: "center",
    },
    genderContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelStyleImagePicker: {
        color: '#aaa',
        marginTop: 10,
    },
    imagePickerButton: {
        marginTop: 10,
        backgroundColor: '#ddd'
    },
});

export default NewMemberScreen;
