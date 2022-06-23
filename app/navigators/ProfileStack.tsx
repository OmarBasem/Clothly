import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {ProfileScreen} from '../screens';
import {Title} from "../components";

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({navigation, route}) => ({
                    headerTitle: () => <Title text='Profile'/>,
                })}
            />
        </Stack.Navigator>
    )
}