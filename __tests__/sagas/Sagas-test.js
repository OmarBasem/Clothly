import React from 'react';
import {fetchUserSaga} from "../../app/sagas/user";
import {fetchProductsSaga} from "../../app/sagas/products";

import {runSaga} from 'redux-saga';

import userReducer, {fetchUser} from "../../app/reducers/user";
import productsReducer, {fetchProducts, productsInitialState} from "../../app/reducers/products";


import testUser from '../data/testUser.json'


describe('Integration testing of sagas and reducers', () => {

    test('fetch user saga', async () => {
        const dispatched = [];
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, fetchUserSaga).toPromise();
        expect(dispatched[0].type).toEqual('user/fetchUser')
        expect(userReducer({}, fetchUser(dispatched[0].payload))).toEqual(testUser)
    })

    test('fetch products saga', async () => {
        const dispatched = [];
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, fetchProductsSaga, {category: 'MEN'}).toPromise();
        expect(dispatched[0].type).toEqual('products/fetchProducts')
        const state = productsInitialState
        const payload = {category: 'MEN', products: dispatched[0].payload}
        expect(productsReducer(state, fetchProducts(payload))).toEqual({
            ...state,
            currentCategory: payload.category,
            categories: {...state.categories, [payload.category]: payload.products},
            didFetch: {...state.didFetch, [payload.category]: true}
        })
    })


})

