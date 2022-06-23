import React from 'react';
import renderer from "react-test-renderer";
import {CartScreen} from '../../app/screens'



describe('Testing Screens rendering', () => {
    test('CartScreen renders correctly', () => {
        const tree = renderer.create(<CartScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})