import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import RegisterForm from "../components/forms/register/RegisterForm";
import {useMutation} from "@apollo/client";
import {REGISTER} from "../apollo/queries/auth";
import Redirect from "../components/shared/Redirect";
import { setToast } from "../state/toast/toastSlice";

const Register = () => {
    const [register, {data, error, loading}] = useMutation(REGISTER);
    const dispatch = useDispatch();

    const success = data && data.register;

    useEffect(() => {
        if (error) {
            dispatch(setToast({
                severity: 'error',
                open: true,
                message: 'REGISTRATION_ERROR'
            }));
        } else if (success) {
            dispatch(setToast({
                severity: 'success',
                open: true,
                message: 'REGISTRATION_SUCCESS'
            }));
        }
    }, [success, error]);

    return (
        <>
            <h1>Register</h1>
            {
                success
                    ? <Redirect to={'/login'}/>
                    : <RegisterForm
                        loading={loading}
                        onSubmit={(variables) => register({variables})}
                    />
            }
        </>
    )
};

export default Register;
