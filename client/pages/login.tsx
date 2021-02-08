import React, {useState} from "react";
import LoginForm from "../components/forms/login/LoginForm";
import {useRouter} from "next/router";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import useToast from "../hooks/useToast";
import AuthService from "../services/AuthService";

const Login = () => {
    const router = useRouter();
    const showToast = useToast();

    const [loading, setLoading] = useState<boolean>(false);

    const onLogin = async (variables) => {
        setLoading(true);

        try {
            await AuthService.login(variables);
            showToast({
                severity: 'success',
                message: 'LOGIN_SUCCESS'
            });
            await router.push({pathname: '/about'});
        } catch (e) {
            // todo: test errors
            showToast({
                severity: 'error',
                message: e.message
            });
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <LoginForm
                loading={loading}
                onSubmit={onLogin}
            />
            <OAuthLoginButtons/>
        </>
    )
};

export default Login;
