import React from "react";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../apollo/queries/auth";
import LoginForm from "../components/forms/login/LoginForm";
import useLoggedUser from "../hooks/useLoggedUser";
import {useRouter} from "next/router";

const Login = () => {
    const [login, {loading}] = useMutation(LOGIN);
    const loggedUser = useLoggedUser();
    const router = useRouter();

    const onLogin = async (variables) => {
        const {data} = await login({variables});

        if (data.login) {
            loggedUser();
            router.push({pathname: '/'});
        }
    }

    return (
        <>
            <h1>Login</h1>
            {<LoginForm
                loading={loading}
                onSubmit={onLogin}
            />}
        </>
    )
};

export default Login;
