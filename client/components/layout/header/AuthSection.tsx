import React from "react";
import {useSelector} from 'react-redux';
import MenuLink from "./MenuLink";
import {getLoggedUser} from "../../../state/auth/authSelector";
import {Button} from "@material-ui/core";
import {IAuthState} from "../../../state/auth/authSlice";

const AuthSection = () => {
    const user: IAuthState = useSelector(getLoggedUser);

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
