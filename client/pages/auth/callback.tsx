import useLoggedUser from "../../hooks/useLoggedUser";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {CircularProgress, makeStyles} from "@material-ui/core";
import {ITheme} from "../../theme/theme";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.variables.marginXl,
    },
}));

const AuthCallback = () => {
    const loggedUser = useLoggedUser();
    const router = useRouter();
    const classes = useStyles();

    useEffect(() => {
        loggedUser();
        router.push({pathname: '/'});
    }, []);

    return <div className={classes.root}>
        <CircularProgress />
    </div>;
}

export default AuthCallback;
