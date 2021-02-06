import React from "react";
import {Button, makeStyles} from "@material-ui/core";
import {ITheme} from "../theme/theme";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        maxWidth: theme.variables.smallFormMaxWidth,
        margin: `${theme.variables.marginLg}px auto 0`,
    },
    buttonGoogle: {
        marginTop: theme.variables.marginLg,
        color: '#dc4e41',
        borderColor: '#dc4e41',
    },
    buttonFacebook: {
        marginTop: theme.variables.marginLg,
        color: '#485a96',
        borderColor: '#485a96',
    }
}));

const OAuthLoginButtons = () => {
    const router = useRouter();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button
                fullWidth
                variant="outlined"
                onClick={() => router.push({pathname: '/auth/google'})}
                className={classes.buttonGoogle}
            >
                Login with Google
            </Button>
            <Button
                fullWidth
                variant="outlined"
                onClick={() => router.push({pathname: '/auth/google'})}
                className={classes.buttonFacebook}
            >
                Login with Facebook
            </Button>
        </div>
    )
}

export default OAuthLoginButtons;
