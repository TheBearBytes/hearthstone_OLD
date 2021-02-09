import React, {useState} from "react";
import RegisterForm from "../components/forms/register/RegisterForm";
import useToast from "../hooks/useToast";
import {useRouter} from "next/router";
import AuthService from "../services/AuthService";
import withAuthWall from "../hoc/withAuthWall";

const Register = () => {
    const showToast = useToast();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const onRegister = async (variables) => {
        setLoading(true);

        try {
            await AuthService.register(variables);
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
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Register</h1>
            <RegisterForm
                loading={loading}
                onSubmit={onRegister}
            />
        </>
    )
};

export default withAuthWall(Register)(null);
