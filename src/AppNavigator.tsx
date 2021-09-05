import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, Link} from "@react-navigation/native";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import NewMemberScreen from "./screens/NewMemberScreen";
import {Provider} from "react-redux";
import {store} from "./store";

const Stack = createStackNavigator();

const linking = {
    prefixes: ['http://localhost:19006/'],
    config: {
        screens: {
            HomeScreen: '',
            NewMemberScreen: 'member/:id',
        }
    },
};

const AppNavigator = () => {
    return (
        <Provider store={store}>
            <NavigationContainer linking={linking} fallback={'Loading...'}>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen name="My family" component={HomeScreen}
                                  options={{title: 'Your family members', headerTitleAlign: 'center'}}/>
                    <Stack.Screen name="New Member" component={NewMemberScreen}
                                  options={{title: 'Add a new member to your family', headerTitleAlign: 'center'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};


export default AppNavigator;
