import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {theme} from "../styles";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';

import {changeCategory} from "../reducers/products";
import {HomeScreenNavigationProp} from "../navigators/types";
import {IApplicationState} from "../types";
import {fetchProductsAction} from "../actions";

const TopBar = () => {
    const categories = ['MEN', 'WOMEN', 'KIDS', 'FTW', 'ACCESSORIES']
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const {products, currentCategory} = useSelector((state: IApplicationState) => ({
        currentCategory: state.products.currentCategory,
        products: state.products.categories
    }));
    const dispatch = useDispatch();
    const fetchCategory = async (category: string) => {
        await navigation.navigate('Home')
        dispatch(changeCategory(category))
        if (!products[category])
            dispatch(fetchProductsAction(category))
    }
    return (
        <View style={s.topBar} testID='TopBar'>
            {categories.map(category => {
                const selected = category === currentCategory;
                return (
                    <TouchableOpacity onPress={() => fetchCategory(category)} key={category} testID={category}>
                        <Text style={[s.barText, selected ? {color: theme.mainColor, textDecorationLine: 'underline'} : {}]}>{category}</Text>
                    </TouchableOpacity>
                )

            })}
        </View>
    )
}

const s = StyleSheet.create({
    topBar: {
        width: '96%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8,
        alignSelf: 'center'
    },
    barText: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default TopBar;