import {RootState} from "../rootReducer";
import {IToastState} from "./toastSlice";

export const getToast = (state: RootState): IToastState => state.toast;
