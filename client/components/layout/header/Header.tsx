import React from "react";
import {AppBar, Box, ButtonGroup, Container, makeStyles, Toolbar} from "@material-ui/core";
import MenuLink from "./MenuLink";
import AuthSection from "./AuthSection";
import Urls from "../../../consts/Urls";

const useStyles = makeStyles(() => ({
	root: {
		height: '64px',
	},
	toolbar: {
		justifyContent: 'space-between',
	}
}));

const Header = () => {
	const classes = useStyles();

	// todo: add some route animation
	return (
		<header>
			<Box className={classes.root}>
				<AppBar position="fixed">
					<Container maxWidth="lg">
						<Toolbar className={classes.toolbar} disableGutters>
							<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
								<MenuLink href={Urls.HOME.url} label={Urls.HOME.label} />
								<MenuLink href='/blog' label='Blog' />
								<MenuLink href='/decks' label='Decks' />
								<MenuLink href='/cards' label='Cards' />
								<MenuLink href='/about' label='About' />
							</ButtonGroup>
							<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
								<AuthSection />
							</ButtonGroup>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
		</header>
	)
}

export default Header;
