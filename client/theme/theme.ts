import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";

export interface ITheme extends ThemeOptions {
    variables: {
        marginSm: number,
        marginLg: number,
        marginXl: number,
        smallFormMaxWidth: number,
    }
}

const themeOptions: ITheme = {
    palette: {
        primary: {
            main: '#228d94',
        },
        secondary: {
            main: '#851966',
        },

    },
    variables: {
        marginSm: 4,
        marginLg: 16,
        marginXl: 32,
        smallFormMaxWidth: 345,
    }
};

const theme = createMuiTheme(themeOptions);

export default theme;
