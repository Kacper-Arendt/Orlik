import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../../model/User";

const initialState = {} as IUser

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            const {id, email, name, photo, createdAt, gender, age, city, postalCode, version} = action.payload
            return {
                ...state,
                id: id,
                email: email,
                name: name,
                photo: photo,
                createdAt: createdAt,
                gender: gender,
                age: age,
                city: city,
                postalCode: postalCode,
                version: version,
            }
        },
        logout() {
            return initialState
        },

    },
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer