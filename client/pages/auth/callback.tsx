import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {CircularProgress, makeStyles} from "@material-ui/core";
import {ITheme} from "../../theme/theme";
import useToast from "../../hooks/useToast";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.variables.marginXl,
    },
}));

const AuthCallback = () => {
    const router = useRouter();
    const classes = useStyles();
    const showToast = useToast();

    useEffect(() => {
        showToast({
            severity: 'success',
            message: 'LOGIN_SUCCESS'
        });
        router.push({pathname: '/about'});
    }, []);

    return <div className={classes.root}>
        <CircularProgress />
    </div>;
}

export default AuthCallback;
