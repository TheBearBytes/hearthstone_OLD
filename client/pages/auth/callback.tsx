import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/core";
import {ITheme} from "../../theme/theme";
import useToast from "../../hooks/useToast";
import CircularPageLoader from "../../components/shared/CircularPageLoader";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.variables.marginXl,
    },
}));

const AuthCallback = () => {
    const router = useRouter();
    const showToast = useToast();

    useEffect(() => {
        showToast({
            severity: 'success',
            message: 'LOGIN_SUCCESS'
        });
        router.push({pathname: '/about'});
    }, []);

    return <CircularPageLoader />;
}

export default AuthCallback;
