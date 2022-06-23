import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

import {Back, Title, TopBar, SearchBar, Product, ProductsRow} from "../../app/components";

const testProduct = require('../data/testProduct.json')

describe('Testing components rendering', () => {
    test('Back button renders correctly', () => {
        const tree = renderer.create(<Back/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Title renders correctly', () => {
        const tree = renderer.create(<Title/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('TopBar renders correctly', () => {
        const mockStore = configureStore()
        const store = mockStore({products: {}})
        const tree = renderer.create(<Provider store={store}><TopBar/></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('SearchBar renders correctly', () => {
        const mockStore = configureStore()
        const store = mockStore()
        const tree = renderer.create(<Provider store={store}><SearchBar/></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Product renders correctly', () => {
        const mockStore = configureStore()
        const store = mockStore()
        const tree = renderer.create(<Provider store={store}><Product item={testProduct}/></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('ProductRow renders correctly', () => {
        const mockStore = configureStore()
        const store = mockStore()
        const tree = renderer.create(<Provider store={store}><ProductsRow
            products={[testProduct]}/></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})

