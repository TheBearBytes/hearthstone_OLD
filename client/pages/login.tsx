import React from "react";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../apollo/queries/auth";
import LoginForm from "../components/forms/login/LoginForm";
import {useRouter} from "next/router";
import OAuthLoginButtons from "../components/OAuthLoginButtons";

const Login = () => {
    const [login, {loading}] = useMutation(LOGIN);
    // const loggedUser = useLoggedUser();
    const router = useRouter();

    const onLogin = async (variables) => {
        const {data} = await login({variables});

        if (data.login) {
            router.push({pathname: '/'});
        }
    }

    return (
        <>
            <h1>Login</h1>
            <LoginForm
                loading={loading}
                onSubmit={onLogin}
            />
            <OAuthLoginButtons />
        </>
    )
}

export default Login;
