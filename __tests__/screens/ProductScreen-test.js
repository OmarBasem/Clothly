import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'
import renderer from "react-test-renderer";
import {ProductScreen} from '../../app/screens'

const testProduct = require('../data/testProduct.json')

const productsMockState = {
    categories: {MEN: {"0": testProduct}},
    filteredProducts: null,
    currentCategory: 'MEN',
    didFetch: {MEN: true},
    selectedProduct: "0"
};

describe('Testing Screens rendering', () => {

    test('ProductScreen renders correctly', () => {
        const mockStore = configureStore()
        const store = mockStore({products: productsMockState})
        const tree = renderer.create(<Provider store={store}><ProductScreen /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

})