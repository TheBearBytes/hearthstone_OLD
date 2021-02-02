import React, {useEffect} from "react";
import RegisterForm from "../components/forms/register/RegisterForm";
import {useMutation} from "@apollo/client";
import {REGISTER} from "../apollo/queries/auth";
import Redirect from "../components/shared/Redirect";
import useToast from "../hooks/useToast";

const Register = () => {
    const [register, {data, error, loading}] = useMutation(REGISTER);
    const showToast = useToast();

    const success = data && data.register;

    useEffect(() => {
        if (error) {
            showToast({
                severity: 'error',
                message: error.message
            });
        } else if (success) {
            showToast({
                severity: 'success',
                message: 'REGISTRATION_SUCCESS'
            });
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
