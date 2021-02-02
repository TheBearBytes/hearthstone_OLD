import {makeStyles} from "@material-ui/core";
import {ITheme} from "../../theme/theme";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        width: 345,
        margin: 'auto'
    },
    button: {
        marginTop: theme.variables.marginXl
    }
}));

export default useStyles;
