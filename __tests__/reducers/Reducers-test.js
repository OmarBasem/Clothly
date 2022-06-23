import productsReducer, {changeCategory, filterProducts, selectProduct, fetchProducts} from '../../app/reducers/products'
import userReducer, {fetchUser} from '../../app/reducers/user'
import {productsInitialState} from "../../app/reducers/products";
import testProduct from "../data/testProduct.json";
import testUser from '../data/testUser.json'


describe('Testing reducers', () => {

    test('fetch products reducer', () => {
        const state = productsInitialState
        const payload = {category: 'MEN', products: {"0": testProduct}}
        expect(productsReducer(state, fetchProducts(payload))).toEqual({
            ...state,
            currentCategory: payload.category,
            categories: {...state.categories, [payload.category]: payload.products},
            didFetch: {...state.didFetch, [payload.category]: true}
        })
    })

    test('filter products reducer', () => {
        const mockItems = {MEN: {"0": {title: 'Shorts'}, "1": {title: "T-shirt"}}}
        const state = {...productsInitialState, categories: mockItems};
        const query = 'T-shirt'
        expect(productsReducer(state, filterProducts(query))).toEqual({
            ...state, filteredProducts: [{title: "T-shirt"}]
        })
    })

    test('change category reducer', () => {
        const category = 'WOMEN'
        const state = productsInitialState
        expect(productsReducer(state, changeCategory(category))).toEqual({
            ...state, currentCategory: category, filteredProducts: null
        })
    })

    test('select product reducer', () => {
        const state = productsInitialState
        const id = '0'
        expect(productsReducer(state, selectProduct(id))).toEqual({
            ...state, selectedProduct: id
        })
    })

    test('fetch user reducer', () => {
        expect(userReducer({}, fetchUser(testUser))).toEqual(testUser)
    })

})