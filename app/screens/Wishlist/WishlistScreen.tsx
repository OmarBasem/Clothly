import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const WishlistScreen = () => {
    return (
        <View style={s.container} testID='WishlistScreen'>
            <Icon name={'heart'} size={80} color='grey'/>
            <Text style={s.emptyText}>Your wishlist is empty</Text>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 20,
        color: 'grey',
        fontWeight: 'bold'
    }
})

export default WishlistScreen;