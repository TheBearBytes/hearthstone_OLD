import React from "react";
import LoginForm from "../components/forms/login/LoginForm";
import {useRouter} from "next/router";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import axios from "axios";

const Login = () => {
    const router = useRouter();

    const onLogin = async (variables) => {
        // todo: axios client
        const {data} = await axios.post('/api/login', {
            email: variables.email,
            password: variables.password,
        });

        if (data.login) {
            router.push({pathname: '/'});
        }
    }

    return (
        <>
            <h1>Login</h1>
            <LoginForm
                loading={false}
                onSubmit={onLogin}
            />
            <OAuthLoginButtons />
        </>
    )
}

export default Login;
