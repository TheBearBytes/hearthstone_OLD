import React from "react";
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import MenuLink from "./MenuLink";
import {getLoggedUser} from "../../../state/auth/authSelector";
import {Avatar, Button, Divider, Menu, MenuItem} from "@material-ui/core";
import {IAuthState} from "../../../state/auth/authSlice";
import {useRouter} from "next/router";
import {AccountCircle} from '@material-ui/icons';
import {userRole} from "../../../consts/User";

const USER_MENU_ID = 'USER_MENU_ID';

const AuthSection = () => {
    const user: IAuthState = useSelector(getLoggedUser);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onLogout = async () => {
        handleUserMenuClose();
        Cookies.remove('login-token');
        await router.push({pathname: '/'});
    }

    const onAdminPanelClick = async () => {
        handleUserMenuClose();
        await router.push({pathname: '/adminPanel'});
    }

    const renderUserMenu = () => {
        return (<>
            <Button
                aria-controls={USER_MENU_ID}
                aria-haspopup="true"
                onClick={handleUserMenuClick}
            >
                {renderUserAvatar()}
            </Button>
            <Menu
                id={USER_MENU_ID}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
            >
                <MenuItem onClick={handleUserMenuClose}>My account</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
                {user.role === userRole.ADMIN && <Divider />}
                {user.role === userRole.ADMIN && (<MenuItem onClick={onAdminPanelClick}>Admin panel</MenuItem>)}
            </Menu>
        </>)
    }

    const renderUserAvatar = () => {
        const {avatar} = user;

        if (avatar) {
            return (
                <Avatar
                    alt={user.username || user.email}
                    src={avatar}
                />
            );
        }

        return (
            <Avatar>
                <AccountCircle/>
            </Avatar>
        );
    }

    if (user) {
        return renderUserMenu();
    }

    return (
        <>
            <MenuLink href='/register' label='Register'/>
            <MenuLink href='/login' label='Login'/>
        </>
    )
}

export default AuthSection;
