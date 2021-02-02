import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IToastState {
    open: boolean,
    severity: 'success' | 'error' | 'warning',
    message: string,
}

const initialState: IToastState = {
    open: false,
    severity: 'success',
    message: '',
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        hideToast: (state: IToastState) => {
            state.open = false;
        },
        setToast: (state: IToastState, action: PayloadAction<IToastState>) => {
            return action.payload;
        },
    }
});

export const {hideToast, setToast} = toastSlice.actions
export default toastSlice;
