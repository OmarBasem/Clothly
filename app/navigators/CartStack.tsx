import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {CartScreen} from '../screens';
import {Title} from "../components";

const Stack = createStackNavigator();

export default function CartStack() {
    return (
        <Stack.Navigator initialRouteName="Cart">
            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={({navigation, route}) => ({
                    headerTitle: () => <Title text='Cart'/>,
                })}
            />
        </Stack.Navigator>
    )
}