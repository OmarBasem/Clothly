import {call, takeLatest, put} from 'redux-saga/effects'
import axios from "axios";
import {fetchUser} from '../reducers/user'
import * as types from '../actions/actionTypes'


export const fetchUserSaga = function* fetchUserSaga() {
    try {
        const {data} = yield call(async () => await axios.get('https://rickandmortyapi.com/api/character/2'))
        yield put(fetchUser(data))
    } catch (error) {
    }
}


const root = function* root() {
    yield takeLatest(types.FETCH_USER, fetchUserSaga);
};
export default root;