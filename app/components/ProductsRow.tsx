import React from 'react';
import {View} from "react-native";
import Product from './Product'
import {W} from '../utils'
import {product} from "../types";


interface IProductsRowProps {products: Array<product>, row: number}

// function to render each product row
const ProductsRow = ({products, row} : IProductsRowProps) => {
    return (
        <View style={{flexDirection: 'row', width: W(100)}}>
            {products.map((product, i) => product &&
                <Product item={product} row={row} col={i} key={`product-${product.id.toString()}`}/>)}
        </View>
    )
}

export default ProductsRow;