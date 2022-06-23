import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {user} from "../types";


const initialState: user = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUser: (state, {payload}) => {
            return {
                name: payload.name,
                created: payload.created,
                gender: payload.gender,
                image: payload.image,
                location: payload.location,
                status: payload.status
            }
        },
    },
})

export const {fetchUser} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer