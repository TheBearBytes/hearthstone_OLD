import React from "react";
import {AppBar, Box, ButtonGroup, Container, Toolbar} from "@material-ui/core";
import MenuLink from "./MenuLink";
import AuthSection from "./AuthSection";
import Urls from "../../../consts/Urls";

const Header = () => {
	// todo: add some route animation
	// todo: style
	return (
		<header>
			<Box bgcolor="#252525" color="white" height={64}>
				<AppBar position="fixed">
					<Container maxWidth="lg">
						<Toolbar disableGutters>
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
							<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
								<MenuLink href='/graphql' label='GraphQL' />
							</ButtonGroup>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
		</header>
	)
}

export default Header;
