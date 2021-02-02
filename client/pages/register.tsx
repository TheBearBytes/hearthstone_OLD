import React from "react";
import RegisterForm from "../components/forms/register/RegisterForm";
import {useMutation} from "@apollo/client";
import {REGISTER} from "../apollo/queries/auth";

const Register = () => {
    const [register, { data, error, loading}] = useMutation(REGISTER);

    console.log('mutation error', error)
    console.log('mutation data', data)

    // todo: add some confirmation toast and reload on success
    return (
        <>
            <h1>Register</h1>
            <RegisterForm
                loading={loading}
                onSubmit={(variables) => register({variables})}
            />
        </>
    )
};

export default Register;
