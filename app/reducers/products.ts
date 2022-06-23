import {product} from "../types";
import {createSlice} from '@reduxjs/toolkit'

export const defaultCategory = 'MEN'
export interface IProducts {
    categories: Record<string, Record<string, product>>,
    filteredProducts: Array<product> | null,
    currentCategory: string,
    didFetch: Record<string, boolean>,
    selectedProduct: string | null
}
export const productsInitialState: IProducts = {
    categories: {},
    filteredProducts: null,
    currentCategory: defaultCategory,
    didFetch: {},
    selectedProduct: null
};

export const productsSlice = createSlice({
    name: 'products',
    initialState: productsInitialState,
    reducers: {
        fetchProducts: (state, {payload}) => {
            return {
                ...state,
                currentCategory: payload.category,
                categories: {...state.categories, [payload.category]: payload.products},
                didFetch: {...state.didFetch, [payload.category]: true}
            }
        },
        filterProducts: (state, {payload}) => {
            if (payload === '')
                return {...state, filteredProducts: null}
            const products = Object.values(state.categories[state.currentCategory])
            const filteredProducts = products.filter(product => product.title.toLowerCase().includes(payload.toLowerCase()))
            return {...state, filteredProducts}
        },
        changeCategory: (state, {payload}) => {
            return {...state, currentCategory: payload, filteredProducts: null}
        },
        selectProduct: (state, {payload}) => {
            return {...state, selectedProduct: payload}
        }
    },
})

export const {fetchProducts, filterProducts, changeCategory, selectProduct} = productsSlice.actions

export default productsSlice.reducer