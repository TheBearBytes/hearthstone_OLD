import React from "react";
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import MenuLink from "./MenuLink";
import {getLoggedUser} from "../../../state/auth/authSelector";
import {Button} from "@material-ui/core";
import {IAuthState} from "../../../state/auth/authSlice";
import {useRouter} from "next/router";

const AuthSection = () => {
    const user: IAuthState = useSelector(getLoggedUser);
    const router = useRouter();

    const onLogout = () => {
        Cookies.remove('login-token');
        router.push({pathname: '/'});
    }

    if (user) {
        return (
            <>
                <div>Hi {user.userName || user.email} ({user.role})</div>
                <Button onClick={onLogout}>Logout</Button>
            </>
        )
    }

    return (
        <>
            <MenuLink href='/register' label='Register'/>
            <MenuLink href='/login' label='Login'/>
        </>
    )
}

export default AuthSection;
