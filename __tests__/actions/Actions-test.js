import React from 'react';
import * as types from '../../app/actions/actionTypes'
import {fetchUserAction, fetchProductsAction} from "../../app/actions";


describe('Testing actions', () => {

    test('fetch products', () => {
        const category = 'MEN'
        const expectation = {
            type: types.FETCH_PRODUCTS,
            category
        }
        expect(fetchProductsAction(category)).toEqual(expectation)
    })

    test('fetch user', () => {
        const expectation = {
            type: types.FETCH_USER,
        }
        expect(fetchUserAction()).toEqual(expectation)
    })

})

