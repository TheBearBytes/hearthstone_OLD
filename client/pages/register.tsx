import React from "react";
import RegisterForm from "../components/forms/register/RegisterForm";
import useToast from "../hooks/useToast";
import axios from "axios";
import {useRouter} from "next/router";

const Register = () => {
    const showToast = useToast();
    const router = useRouter();

    const onRegister = async (variables) => {
        try {
            await axios.post("/api/register", variables);
            showToast({
                severity: 'success',
                message: 'REGISTRATION_SUCCESS'
            });
            await router.push({pathname: '/login'});
        } catch (e) {
            showToast({
                severity: 'error',
                message: e.message
            });
        }
    }

    // todo: loading
    return (
        <>
            <h1>Register</h1>
            <RegisterForm
                loading={false}
                onSubmit={onRegister}
            />
        </>
    )
};

export default Register;
