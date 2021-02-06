import {makeStyles} from "@material-ui/core";
import {ITheme} from "../../theme/theme";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        maxWidth: theme.variables.smallFormMaxWidth,
        margin: 'auto'
    },
    button: {
        marginTop: theme.variables.marginLg
    }
}));

export default useStyles;
