import React from "react";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../apollo/queries/auth";
import LoginForm from "../components/forms/login/LoginForm";

const Login = () => {
    const [login, { data, error, loading}] = useMutation(LOGIN);

    console.log('mutation error', error)
    console.log('mutation data', data)

    // todo: add some confirmation toast and reload on success
    return (
        <>
            <h1>Login</h1>
            <LoginForm
                loading={loading}
                onSubmit={(variables) => login({variables})}
            />
        </>
    )
};

export default Login;
