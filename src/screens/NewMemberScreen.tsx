import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Image} from 'react-native';
import {useAppSelector, useAppDispatch} from "../store";
import {createMember, updateMember} from "../store/actions/memberActions";
import * as ImagePicker from 'expo-image-picker';

const NewMemberScreen = ({route, navigation}) => {
    const [personName, setPersonName] = useState('');
    const [personRelationship, setPersonRelationship] = useState('');
    const [personSex, setPersonSex] = useState('')
    const [personImage, setPersonImage] = useState(null);
    const [showError, setShowError] = useState(false);
    const {members} = useAppSelector(state => state.member);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const memberFound = members.find(mem => mem.id === route.params.id);
        if (memberFound) {
            setPersonName(memberFound.name);
            setPersonSex(memberFound.sex);
            setPersonRelationship(memberFound.relationship);
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
        if (personName && personRelationship && personSex && personImage && !route.params.id) {
            dispatch(createMember(personName, personRelationship, personSex, personImage, navigation.navigate('My family'), null));
        } else if (personName && personRelationship && personSex && personImage && route.params.id) {
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
                value={personName}
                onChangeText={text => setPersonName(text)}
                style={styles.inputName}
            />
            <TextInput
                placeholder="Relationship to the person"
                value={personRelationship}
                onChangeText={text => setPersonRelationship(text)}
                style={styles.inputRelationship}
            />
            {showError && <Text style={{color: 'red'}}>Error, fill in all the fields</Text>}
            <View style={styles.genderContainer}>
                <Text style={styles.textGender}>Gender is...</Text>
                <Button title={'male'} onPress={() => setPersonSex('male')}/>
                <Button title={'female'} onPress={() => setPersonSex('female')}/>
                <Button title={'non-binary gender'} onPress={() => setPersonSex('non-binary gender')}/>
            </View>
            <Button title="Pick an image from camera roll" onPress={pickImage}/>
            {personImage && <Image source={{uri: personImage}} style={{width: 70, height: 70}}/>}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handlePerson()}>
                    <Text style={styles.saveButton}>
                        save
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButton}>
                        back
                    </Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
        width: '40%',
        borderBottomWidth: 1,
    },
    inputRelationship: {
        borderBottomWidth: 1,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
    },
    buttonsContainer: {
        width: 105,
        minHeight: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    saveButton: {
        backgroundColor: '#90EE90',
        fontSize: 22,
        color: 'white',
    },
    cancelButton: {
        color: 'white',
        backgroundColor: '#DC143C',
        fontSize: 22,
    },
    genderContainer: {
        width: '40%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textGender: {
        fontSize: 22,
        alignItems: 'center',
        justifyContent: "center",
    },
    btnText: {},
});

export default NewMemberScreen;
