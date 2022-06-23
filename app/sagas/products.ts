import {call, takeLatest, put} from 'redux-saga/effects'
import axios from "axios";
import {fetchProducts} from '../reducers/products'
import * as types from '../actions/actionTypes'

const menClothingAPI = 'https://s3.eu-central-1.amazonaws.com/www.omarbasem.com/chalhoub/menClothing.json'
const womenClothingAPI = 'https://s3.eu-central-1.amazonaws.com/www.omarbasem.com/chalhoub/womenClothing.json'

export const fetchProductsSaga = function* fetchProudctsSaga(args: any) {
    const {category} = args;
    try {
        let api = '';
        switch (category) {
            case 'MEN':
                api = menClothingAPI;
                break;
            case 'WOMEN':
                api = womenClothingAPI;
                break;
            case 'KIDS': // for the other categories we will show that we 'run out of products for this category'
            case 'FTW':
            case 'ACCESSORIES':
                yield put(fetchProducts({category, products: {}}))
                return
            default:
                api = menClothingAPI;
        }
        const {data} = yield call(async () => await axios.get(api))
        yield put(fetchProducts({category, products: data}))
    } catch (error) { // handle error, for example, we can dispatch an action to handle the error
        console.log('error', error)
    }
}

const root = function* root() {
    yield takeLatest(types.FETCH_PRODUCTS, fetchProductsSaga);
};
export default root;

