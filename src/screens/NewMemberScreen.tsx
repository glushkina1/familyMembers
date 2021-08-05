import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useAppSelector} from "../store";
import {createMember} from "../store/actions/memberActions";

const NewMemberScreen = ({ route, navigation }) => {
    const [personName, setPersonName] = useState('');
    const [personRelationship, setPersonRelationship] = useState('');
    const [personSex, setPersonSex] = useState('')
    // const [personPicture, setPersonPicture] = useState(person ? person.picture : '')
    const [showError, setShowError] = useState(false);
    const { members } = useAppSelector(state => state.member);
    const dispatch = useDispatch();

    if (members.length > 0 && route.params) {
        useEffect(() => {
            const memberFound = members.find(t => t.id === route.params.id);
            if (memberFound) {
                setPersonName(memberFound.name);
                // setLoading(false);
            }
        }, [members, route.params.id]);
    }

    const addPerson = () => {
        dispatch(createMember(personName, navigation.navigate('My family'), null));
    }

    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                {showError && <Text style={{ color: 'red' }}>Error, fill in all the fields</Text>}
                <View style={styles.genderContainer}>
                    <Text style={styles.textGender}>Gender is...</Text>
                    <Button title={'male'} onPress={() => setPersonSex('male')} />
                    <Button title={'female'} onPress={() => setPersonSex('female')} />
                    <Button title={'non-binary gender'} onPress={() => setPersonSex('non-binary gender')} />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => addPerson()}>
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
        // </TouchableWithoutFeedback>
    );


}

const styles = StyleSheet.create({
    newMemberScreen:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8EAED'
    },
    inputName:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
        width:'40%',
        borderBottomWidth:1,
    },
    inputRelationship:{
        borderBottomWidth:1,
        width:'40%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
    },
    buttonsContainer:{
        width:105,
        minHeight:40,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'row',
    },
    saveButton:{
        backgroundColor:'#90EE90',
        fontFamily:'bold',
        fontSize:22,
        color:'white',
    },
    cancelButton:{
        color:'white',
        backgroundColor:'#DC143C',
        fontFamily:'bold',
        fontSize:22,
    },
    genderContainer:{
        width:'40%',
        justifyContent:'space-between',
        flexDirection:'row',
    },
    textGender:{
        fontSize:22,
        alignItems: 'center',
        justifyContent:"center",
    },
});

export default NewMemberScreen;
