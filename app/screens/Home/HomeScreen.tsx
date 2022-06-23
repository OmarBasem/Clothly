import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {useDispatch} from "react-redux";

import {theme} from "../../styles";
import {TopBar, SearchBar, ProductsRow} from '../../components'
import {sliceArrIntoRows} from "../../utils";
import {useAppSelector} from "../../store/hooks";
import {defaultCategory} from "../../reducers/products";
import {fetchProductsAction} from "../../actions";


const HomeScreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductsAction(defaultCategory))
    }, []);
    const {products, filteredProducts, didFetch, currentCategory} = useAppSelector((state) => ({ // reading products from redux store
        products: state.products.categories[state.products.currentCategory],
        filteredProducts: state.products.filteredProducts,
        didFetch: state.products.didFetch[state.products.currentCategory],
        currentCategory: state.products.currentCategory
    }));
    const arr = filteredProducts || Object.values(products || {})
    const data = sliceArrIntoRows(Object.values(arr), 2) // create rows of 2 items
    return (
        <View style={{flex: 1}} testID='HomeScreen'>
            <TopBar/>
            <SearchBar/>
            {data.length > 0 ? <FlatList data={data} renderItem={({item, index}) => <ProductsRow products={item} row={index}/>}
                                         keyExtractor={item => item[0].id.toString()} testID={`${currentCategory}-clothing`}/> :
                filteredProducts?.length === 0 ? <Text style={s.emptyText}>No results match</Text> :
                    didFetch ? <Text style={s.emptyText}>We run out of {currentCategory} products. Please check back
                            later.</Text> :
                        <ActivityIndicator color={theme.mainColor} size='large'/>}

        </View>
    )
}

const s = StyleSheet.create({
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'center',
        marginTop: 16
    }
})

export default HomeScreen;