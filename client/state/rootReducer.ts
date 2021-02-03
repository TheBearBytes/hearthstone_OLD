import {combineReducers} from '@reduxjs/toolkit';
import toastSlice from "./toast/toastSlice";
import authSlice from "./auth/authSlice";

const initialState = {
    lastUpdate: 0,
    count: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TICK':
            return {
                ...state,
                lastUpdate: action.lastUpdate,
            }
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,
            }
        case 'RESET':
            return {
                ...state,
                count: initialState.count,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    reducer,
    toast: toastSlice.reducer,
    auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
