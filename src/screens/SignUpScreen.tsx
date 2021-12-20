import React, {useState} from 'react'
import {createUserWithEmailAndPassword, getAuth} from "@firebase/auth"
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {deleteLastNum, regexPhoneNumber} from "../components/regexPhoneNumber";

const SignUpScreen = ({ navigation}) => {

    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(false);

    const auth = getAuth();

    const handleSignUp = (phoneNumber, password) => {
        let modifiedNum = phoneNumber.replace(/\D/gi, '') || ''
        let email = modifiedNum + '@domain.com';
        if (password.length < 7) {
            setError(true);
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email, 'phoneNumber:', phoneNumber);
            })
            .catch(error => alert(error.message))
        navigation.navigate('HomeScreen');
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(regexPhoneNumber(text))}
                    style={styles.input}
                    onKeyPress={({nativeEvent}) => {
                        if (nativeEvent.key === 'Backspace') {
                            setPhoneNumber(deleteLastNum);
                        }
                    }}
                />
                <TextInput
                    placeholder="Create a password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                {error && <Text style={{color:'#CE3032'}}>password should be longer than 6 chars</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Go back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSignUp(phoneNumber, password)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>


        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        ...Platform.select({
            ios: {
                width: '80%',
            },
            web: {
                width: '50%',
            },
            android: {
                width: '80%',
            }
        }),
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        ...Platform.select({
            ios: {
                width: '60%',
            },
            web: {
                width: '25%',
            },
            android: {
                width: '60%',
            }
        }),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 13,
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: 'grey',
        fontWeight: '700',
        fontSize: 13,
    },

})

export default SignUpScreen;
