import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import NewMemberScreen from "./screens/NewMemberScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import {Provider} from "react-redux";
import { store } from "./store/configStore";
import { LogBox } from 'react-native';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();

const linking = {
    prefixes: ['my_family://'],
    config: {
        screens: {
            LoginScreen:'loginScreen',
            SignUpScreen:'signupScreen',
            HomeScreen: 'homeScreen',
            NewMemberScreen: 'member/:phoneNumber?',
        }
    },
};


const AppNavigator = () => {
    return (
        <Provider store={store}>
            <NavigationContainer linking={linking}>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen options={{ headerShown: false }} name="SignUpScreen" component={SignUpScreen}/>
                    <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen}/>
                    <Stack.Screen name="HomeScreen" component={HomeScreen}
                                  options={{title: 'Your family members', headerTitleAlign: 'center'}}/>
                    <Stack.Screen name="NewMemberScreen" component={NewMemberScreen}
                                  options={{title: 'Add a new member to your family', headerTitleAlign: 'center'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};


export default AppNavigator;
