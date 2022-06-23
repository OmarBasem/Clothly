import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'
import renderer from "react-test-renderer";
import {ProfileScreen} from '../../app/screens'

const testUser = require('../data/testUser.json')


describe('Testing Screens rendering', () => {

    test('ProfileScreen renders correctly', () => {
        const mockStore = configureStore()
        const store = mockStore({user: testUser})
        const tree = renderer.create(<Provider store={store}><ProfileScreen /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})