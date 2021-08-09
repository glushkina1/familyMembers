import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import NewMemberScreen from "./screens/NewMemberScreen";
import {Provider} from "react-redux";
import {store} from "./store";

const Stack = createStackNavigator();

const MemberNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="My family" component={HomeScreen}
                          options={{title: 'Your family members', headerTitleAlign: 'center'}}/>
            <Stack.Screen name="New Member" component={NewMemberScreen}
                          options={{title: 'Add a new member to your family', headerTitleAlign: 'center'}}/>
        </Stack.Navigator>
    );
}

const AppNavigator = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <MemberNavigator/>
            </NavigationContainer>
        </Provider>
    );
};


export default AppNavigator;
