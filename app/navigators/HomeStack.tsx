import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {HomeScreen, ProductScreen} from '../screens';
import {Title, Back} from '../components'
import {HomeStackParamList} from "./types";

const Stack = createStackNavigator<HomeStackParamList>();

// A stack function to render the different screens in a stack
export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation, route}) => ({
                    headerTitle: () => <Title text='Clothly'/>,
                    headerTitleAlign: 'center'
                })}
            />
            <Stack.Screen
                name="Product"
                component={ProductScreen}
                options={({navigation, route}) => ({
                    headerTitle: () => <Title text='Clothly'/>,
                    headerLeft: () => <Back onPress={() => navigation.goBack()}/>,
                    headerTitleAlign: 'center'
                })}
            />
        </Stack.Navigator>
    )
}
