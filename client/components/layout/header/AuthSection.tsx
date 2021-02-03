import React, {useEffect} from "react";
import {useSelector} from 'react-redux';
import MenuLink from "./MenuLink";
import {getLoggedUser} from "../../../state/auth/authSelector";
import {Button} from "@material-ui/core";
import {IAuthState} from "../../../state/auth/authSlice";
import useLoggedUser from "../../../hooks/useLoggedUser";

const AuthSection = () => {
    const user: IAuthState = useSelector(getLoggedUser);
    const loggedUser = useLoggedUser();

    useEffect(() => {
        loggedUser();
    }, [user]);

    if (user) {
        return (
            <>
                <div>Hi {user.userName || user.email} ({user.roles})</div>
                <Button>Logout</Button>
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
