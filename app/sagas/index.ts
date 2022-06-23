import {all} from 'redux-saga/effects';

import user from './user'
import products from "./products";

const root = function* root() {
    yield all([
        user(),
        products()
    ]);
};

export default root;