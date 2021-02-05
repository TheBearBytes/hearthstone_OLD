import React, {useEffect} from "react";
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import MenuLink from "./MenuLink";
import {getLoggedUser} from "../../../state/auth/authSelector";
import {Button} from "@material-ui/core";
import {IAuthState} from "../../../state/auth/authSlice";
import useLoggedUser from "../../../hooks/useLoggedUser";
import {useRouter} from "next/router";

const AuthSection = () => {
    const user: IAuthState = useSelector(getLoggedUser);
    const loggedUser = useLoggedUser();
    const router = useRouter();

    useEffect(() => {
        loggedUser();
    }, [user]);

    const onLogout = () => {
        Cookies.remove('login-token');
        router.push({pathname: '/'});
        loggedUser();
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
