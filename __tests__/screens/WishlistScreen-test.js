import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'
import renderer from "react-test-renderer";
import {HomeScreen, ProductScreen, ProfileScreen, WishlistScreen, CartScreen} from '../../app/screens'


describe('Testing Screens rendering', () => {
    test('WishlistScreen renders correctly', () => {
        const tree = renderer.create(<WishlistScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})