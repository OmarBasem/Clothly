import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const CartScreen = () => {
    return (
        <View style={s.container} testID='CartScreen'>
            <Icon name={'cart'} size={80} color='grey'/>
            <Text style={s.emptyText}>Your cart is empty</Text>
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

export default CartScreen;