import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {WishlistScreen} from '../screens';
import {Title} from "../components";

const Stack = createStackNavigator();

export default function WishlistStack() {
    return (
        <Stack.Navigator initialRouteName="Wishlist">
            <Stack.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={({navigation, route}) => ({
                    headerTitle: () => <Title text='Wishlist'/>,
                })}
            />
        </Stack.Navigator>
    )
}