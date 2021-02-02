import {useDispatch} from 'react-redux';
import {IToastState, setToast} from "../state/toast/toastSlice";

const useToast = () => {
    const dispatch = useDispatch();

    const showToast = (options: Omit<IToastState, 'open'>) => {
        const {message, severity} = options;

        dispatch(setToast({
            severity,
            open: true,
            message
        }));
    };

    return showToast;
}

export default useToast;
