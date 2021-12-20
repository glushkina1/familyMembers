import React, {useEffect, useState} from 'react'
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth"
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {deleteLastNum, regexPhoneNumber} from "../components/regexPhoneNumber";

const LoginScreen = ({navigation}) => {


    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);


    const auth = getAuth();

    const handleLogin = (phoneNumber) => {
        let modifiedNum = phoneNumber.replace(/\D/gi, '') || ''
        let email = modifiedNum + '@domain.com';
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate('HomeScreen')
            })
            .catch((error) => {
                setError(true)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error in login screen', errorCode, errorMessage)
            });
    };

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
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            {error && <Text style={{color: '#D73A3A'}}>Phone Number or password is incorrect</Text>}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => handleLogin(phoneNumber)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
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
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 13,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 13,
    },
})

export default LoginScreen;
