import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import NewMemberScreen from "./screens/NewMemberScreen";
import {Provider} from "react-redux";
import { store } from "./store/configStore";


const Stack = createStackNavigator();

const linking = {
    prefixes: ['my_family://'],
    config: {
        screens: {
            HomeScreen: 'mainScreen',
            NewMemberScreen: 'member/:phoneNumber?',
        }
    },
};


const AppNavigator = () => {
    return (
        <Provider store={store}>
            <NavigationContainer linking={linking}>
                <Stack.Navigator initialRouteName="HomeScreen">
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
