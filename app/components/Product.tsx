import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useDispatch} from "react-redux";
import FastImage from "react-native-fast-image";
import {useNavigation} from '@react-navigation/native';
import {selectProduct} from "../reducers/products";

import {W} from '../utils'
import {product} from "../types";
import {HomeScreenNavigationProp} from "../navigators/types";


interface IProductProps {item: product, row: number, col: number}

// Product item on the HomeScreen
const Product = ({item, row, col} : IProductProps) => { // row and col are needed for testing purposes
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const dispatch = useDispatch()
    const openProduct = () => {
        dispatch(selectProduct(item.id))
        navigation.navigate('Product')
    }
    return (
        <TouchableOpacity activeOpacity={1} style={s.container} onPress={() => openProduct()} testID={`item-${row}-${col}`}>
            <FastImage source={{uri: item.imageURL}} style={s.image} resizeMode='contain'/>
            <Text style={s.title} testID={`title-${row}-${col}`}>{item.title}</Text>
            <Text style={s.price}>AED {item.price}</Text>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    image: {
        width: W(40),
        height: W(60),
    },
    container: {
        width: W(45),
        padding: 8,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 8,
        marginLeft: 12
    },
    title: {
        fontSize: 16
    },
    price: {
        fontSize: 16
    }
})

export default Product;