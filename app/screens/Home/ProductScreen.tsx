import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator} from 'react-native'
import {useDispatch} from "react-redux";
import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Lightbox from 'react-native-fullscreen-box';

import {SearchBar, TopBar} from "../../components";
import {W} from "../../utils";
import {useSelector} from "react-redux";
import {selectProduct} from "../../reducers/products";
import {theme} from "../../styles";
import {NavigationProp} from "@react-navigation/native";
import {HomeStackParamList} from "../../navigators/types";
import {IApplicationState, product} from "../../types";

interface IProductScreenProps {navigation: NavigationProp<HomeStackParamList>}

interface ILightbox {open: () => void}

// The product screen based on the given /layout catalog
const ProductScreen = ({navigation}: IProductScreenProps) => {
    const {selectedProduct, products} = useSelector((state: IApplicationState) => ({
        selectedProduct: state.products.selectedProduct,
        products: state.products.categories[state.products.currentCategory]
    })); // reading products from redux store
    const product = products ? products[selectedProduct!] : null
    const [selectedSize, setSize] = useState<number>(0)
    const [selectedColor, setColor] = useState<number>(0)
    const ref = useRef<ScrollView>(null);
    const lighboxRef = useRef<ILightbox>(null);
    const dispatch = useDispatch()
    if (!product)
        return <ActivityIndicator color={theme.mainColor} size='large'/>
    return (
        <View style={{flex: 1}} testID='ProductScreen'>
            <TopBar/>
            <SearchBar/>
            <ScrollView ref={ref} style={{paddingLeft: 8, paddingRight: 8}} contentContainerStyle={{paddingBottom: 20}} testID='productScroll'>

                <View testID={'productImage'}>
                    <Lightbox ref={lighboxRef} testID={'lightbox'}>
                        <FastImage source={{uri: product.imageURL}} style={s.image} resizeMode='contain'/>
                    </Lightbox>
                    <MaterialIcons name='fullscreen' size={28} style={s.fullscreenIcon} onPress={() => lighboxRef.current?.open()} testID='openImage'/>
                </View>

                <>
                    <Text style={s.info}>{product.title}</Text>
                    <Text style={[s.info, {fontWeight: 'normal', marginTop: 0}]}>AED {product.price}</Text>
                </>

                {renderSizes(product, setSize, selectedSize)}
                {renderColors(product, setColor, selectedColor)}

                <View style={s.greyBox}/>

                <>
                    <Text style={[s.info, {fontSize: 14}]}>DESCRIPTION</Text>
                    <Text style={[s.info, {fontSize: 14, fontWeight: 'normal'}]}>{product.description}</Text>
                </>

                <View style={s.line}/>

                <>
                    <Text style={[s.info, {fontSize: 14}]}>SEE MORE PRODUCTS</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 16}}>
                        {product.more.map((id, index) => (
                            <TouchableOpacity key={id.toString()} onPress={() => {
                                dispatch(selectProduct(id))
                                navigation.navigate('Product');
                                ref.current?.scrollTo({x: 0, y: 0, animated: true})
                            }} testID={`more-${index}`}>
                                <FastImage source={{uri: products?.[id]?.imageURL}} style={s.moreImage}/>
                            </TouchableOpacity>)
                        )}
                    </View>
                </>

            </ScrollView>
        </View>
    )
}

const renderSizes = (product: product, setSize: (i: number) => void, selectedSize: number) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <Text style={[s.info, {fontWeight: '200'}]}>Available Sizes: </Text>
            <View style={[s.info, {flexDirection: 'row'}]}>
                {product.sizes.map((size: string, i: number) => (
                    <TouchableOpacity key={size} testID={`size-${i}`} activeOpacity={1} style={{marginRight: 12}}>
                        <Text onPress={() => setSize(i)} style={[{
                            color: '#646464',
                            fontSize: 20
                        }, i === selectedSize ? {fontWeight: 'bold'} : null]}>{size}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const renderColors = (product: product, setColor: (i: number) => void, selectedColor: number) => {
    return (
        <View>
            <Text style={[s.info, {fontWeight: '200'}]}>Colors:</Text>
            <View style={{flexDirection: 'row'}}>
                {product.colors.map((color: string, i: number) => (
                    <TouchableOpacity testID={`color-${i}`} onPress={() => setColor(i)} key={color}
                                      style={[s.square, {backgroundColor: color}, i === selectedColor ? {borderWidth: 4} : null]}/>
                ))}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    image: {
        width: W(95),
        height: W(100),
        borderWidth: 1,
        borderColor: 'lightgrey',
        alignSelf: 'center'
    },
    fullscreenIcon: {
        position: 'absolute',
        bottom: 4,
        right: 4
    },
    square: {
        width: 30,
        height: 30,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginRight: 8
    },
    greyBox: {
        width: '100%',
        height: 50,
        backgroundColor: '#E5E5E6',
        marginTop: 16,
        borderRadius: 4
    },
    info: {
        fontWeight: 'bold',
        color: '#646464',
        fontSize: 20,
        marginTop: 16
    },
    line: {
        backgroundColor: 'lightgrey',
        height: 1,
        width: '100%',
        marginTop: 16
    },
    moreImage: {
        width: W(20),
        height: W(25),
        borderWidth: 0.5,
        borderColor: 'lightgrey',
    }
})

export default ProductScreen;