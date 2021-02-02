import {useDispatch} from 'react-redux';
import {IToastState, setToast} from "../state/toast/toastSlice";

const useToast = () => {
    const dispatch = useDispatch();

    const showToast = (options: IToastState) => {
        const {open, message, severity} = options;

        dispatch(setToast({
            severity,
            open,
            message
        }));
    };

    return showToast;
}

export default useToast;
