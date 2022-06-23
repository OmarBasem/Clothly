import * as types from './actionTypes'

export const fetchProductsAction = (category: string) => {
    return {type: types.FETCH_PRODUCTS, category}
}