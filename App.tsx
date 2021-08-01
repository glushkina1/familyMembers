import React, {useState} from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text, Button,
} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {Person, savePerson, updatePerson} from "./store/MemberStore";
import {Ionicons} from '@expo/vector-icons';
import PersonComponent from './Person'

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
    const [personSex, setPersonSex] = useState(person? person.sex: '')
    // const genders = ['male', 'female', 'non-binary gender'];
    // const [personPicture, setPersonPicture] = useState(person ? person.picture : '')
    const [showError, setShowError] = useState(false);


    function addMember() {
        if (!personName) {
            setShowError(true)
        } else {
            if (person) {
                person.name = name;
                person.sex = sex;
                updatePerson(name)
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



            {showError && <Text style={{ color: 'red' }}>Error, fill in all the fields</Text>}
            <View style={styles.genderContainer}>
                <Button title={'male'} onPress={setPersonSex('male')} />
                <Button title={'female'} onPress={setPersonSex('female')} />
            </View>






            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => savePerson(person)}>
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
        flexDirection:'row',
    }
});


