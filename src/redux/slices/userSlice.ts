import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../../model/User";
import {firebaseSignOut} from "../../components/firebase/Auth";

const initialState = {} as IUser

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            const {id, email, name, photo, createdAt} = action.payload
            return {
                ...state,
                id: id,
                email: email,
                name: name,
                photo: photo,
                createdAt: createdAt
            }
        },
        logout() {
            firebaseSignOut();
            return initialState
        },

    },
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer