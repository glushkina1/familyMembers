import React, {useState} from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {Person, savePerson, updatePerson} from "./store/MemberStore";
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonComponent from './Person'
import {ButtonGroup} from "react-native-elements";

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
    return (
        <View style={styles.homeScreen}>
            <PersonComponent text={'Popa'} personSex={'male'}/>
            <View style={styles.buttonPlus}>
                <TouchableOpacity onPress={() => navigation.navigate('New Member')}>
                    <Ionicons name='add-circle-outline' size={60} color="blue"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}


function NewMemberScreen({navigation}) {

    let person: Person | undefined = undefined;
    const [personName, setPersonName] = useState(person ? person.name : '');
    const [personRelationship, setPersonRelationship] = useState(person ? person.relationship : '');
    const genders = ['male', 'female', 'non-binary gender'];
    // const [personPicture, setPersonPicture] = useState(person ? person.picture : '')
    const [showError, setShowError] = useState(false);


    function addMember() {
        if (!personName) {
            setShowError(true)
        } else {
            if (person) {
                person.name = name;
                // person.relationship = rela
                updatePerson(name)
            } else {
                savePerson(name)
            }
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
            <ButtonGroup
                buttons = {genders}
                containerStyle={{height: 70, justifyContent:'flex-end',  }}
            />


            {showError && <Text style={{ color: 'red' }}>Error, fill in all the fields</Text>}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => savePerson(person)}>
                    <Text style={styles.saveButton}>
                        Save
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButton}>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default function App() {

    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="My family" component={HomeScreen}/>
                    <Stack.Screen name="New Member" component={NewMemberScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        alignItems: 'center',
        marginTop:30,
        backgroundColor: '#E8EAED'
    },
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
    buttonPlus: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    buttonsContainer:{
        width:85,
        height:25,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'row',
    },
    eachButtonStyle:{
        fontSize:30,
    },
    saveButton:{
        color:'#90EE90',
    },
    cancelButton:{
        color:'#DC143C',
    },
});


