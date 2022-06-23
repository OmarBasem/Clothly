import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {enableScreens} from 'react-native-screens';
import {Platform} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import CartStack from "./CartStack";
import WishlistStack from "./WishlistStack";
import {theme} from '../styles';

enableScreens(); // enable native screens


const Tab = createBottomTabNavigator();

// Bottom Tab function where we define the different tabs
export function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route, navigation}) => ({
                    headerShown: false,
                    tabBarActiveTintColor: theme.mainColor,
                    tabBarInactiveTintColor: '#888888',
                    tabBarAllowFontScaling: false,
                    tabBarHideOnKeyboard: true,
                    headerTitleAlign: 'center',
                    tabBarStyle: Platform.OS === 'android' ? {
                        paddingBottom: 0,
                        height: 49,
                    } : {},
                }
            )}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={({navigation, route}) => ({
                    tabBarLabel: 'Home',
                    tabBarTestID: 'home-tab',
                    tabBarIcon: ({color, size, focused}) => {
                        return <Icon name={focused ? 'ios-home-sharp' : 'ios-home-outline'} size={28} color={color}/>
                    },
                })}
            />
            <Tab.Screen
                name="WishlistTab"
                component={WishlistStack}
                options={{
                    tabBarLabel: 'Wishlist',
                    tabBarTestID: 'wishlist-tab',
                    tabBarIcon: ({color, size, focused}) => {
                       return <Icon name={focused ? 'heart' : 'heart-outline'} size={28} color={color}/>
                    },
                }}
            />
            <Tab.Screen
                name="CartTab"
                component={CartStack}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarTestID: 'cart-tab',
                    tabBarIcon: ({color, size, focused}) => {
                        return <Icon name={focused ? 'cart' : 'cart-outline'} size={28} color={color}/>
                    },
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarTestID: 'profile-tab',
                    tabBarIcon: ({color, size, focused}) => {
                        return <Icon name={focused ? 'person' : 'person-outline'} size={28} color={color}/>
                    },
                }}
            />
        </Tab.Navigator>
    )
}