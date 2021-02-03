import {RootState} from "../rootReducer";
import {IAuthState} from "./authSlice";

export const getLoggedUser = (state: RootState): IAuthState => state.auth;
