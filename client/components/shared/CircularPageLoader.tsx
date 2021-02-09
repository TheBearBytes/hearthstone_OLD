import React from "react";
import {CircularProgress, makeStyles} from "@material-ui/core";
import {ITheme} from "../../theme/theme";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.variables.marginXl,
    },
}));

const CircularPageLoader = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <CircularProgress />
    </div>;
}

export default CircularPageLoader;
