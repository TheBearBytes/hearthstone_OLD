import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {getToast} from "../../state/toast/toastSelector";
import {hideToast, IToastState} from "../../state/toast/toastSlice";

const Toast = () => {
    const dispatch = useDispatch();
    const toast: IToastState = useSelector(getToast);

    const handleClose = () => {
        dispatch(hideToast())
    }

    return (
        <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={toast.severity}
                elevation={6}
                variant="filled"
            >
                {toast.message}
            </Alert>
        </Snackbar>
    );
}

export default Toast;
