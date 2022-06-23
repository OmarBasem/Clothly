import {IProducts} from "../reducers/products";
import {user} from './user'

export interface IApplicationState {
    products: IProducts,
    user: user
}