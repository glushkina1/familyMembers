import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {getAuth, onAuthStateChanged, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth"
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ParamListBase } from '@react-navigation/native'

const LoginScreen = ({route, navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    // const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const auth = getAuth();
    const user = auth.currentUser;


    // useEffect(() => {
    //     onAuthStateChanged(auth, user => {
    //         if (user != null) {
    //             console.log('We are authenticated now!');
    //         }
    //
    //         // Do other things
    //     });
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.replace("Home")
    //         }
    //     })
    //
    //     return unsubscribe
    // }, [])

    // const handleSignUp =  (username, password) => {
    //     let email = username + '@domain.com'
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then(userCredentials => {
    //             const user = userCredentials.user;
    //             console.log('Registered with:', user.email, 'username:', username);
    //         })
    //         .catch(error => alert(error.message))
    //     navigation.navigate('HomeScreen');
    // }

    // const handleLogin = () => {
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then(userCredentials => {
    //             const user = userCredentials.user;
    //             console.log('Logged in with:', user.email);
    //         })
    //         .catch(error => alert(error.message))
    // }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => null}
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
