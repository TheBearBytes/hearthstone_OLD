import React from "react";
import LoginForm from "../components/forms/login/LoginForm";
import {useRouter} from "next/router";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import axios from "axios";
import useToast from "../hooks/useToast";

const Login = () => {
    const router = useRouter();
    const showToast = useToast();

    const onLogin = async (variables) => {
        // todo: axios client

        try {
            await axios.post('/api/login', variables);
            // todo: toast with <Redirect />
            showToast({
                severity: 'success',
                message: 'LOGIN_SUCCESS'
            });
            await router.push({pathname: '/'});
        } catch (e) {
            // todo: test errors
            showToast({
                severity: 'error',
                message: e.message
            });
        }
    }

    // todo: loading
    return (
        <>
            <h1>Login</h1>
            <LoginForm
                loading={false}
                onSubmit={onLogin}
            />
            <OAuthLoginButtons/>
        </>
    )
}

export default Login;
