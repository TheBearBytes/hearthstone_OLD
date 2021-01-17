import {Button, withStyles} from '@material-ui/core';

const ButtonError = withStyles(theme => ({
	root: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.error.contrastText,
		'&:hover': {
			backgroundColor: theme.palette.error.light,
		},
	},
}))(Button);

export default ButtonError;
