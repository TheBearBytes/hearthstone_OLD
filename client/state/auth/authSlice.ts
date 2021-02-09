import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IAuthState {
    username: string,
    email: string,
    role: string,
    avatar: string,
}

const initialState: IAuthState | null = null;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedUser: (state: IAuthState, action: PayloadAction<IAuthState>) => {
            return action.payload;
        },
    }
});

export const {setLoggedUser} = authSlice.actions
export default authSlice;
