import React from "react";
import Link from 'next/link'
import {AppBar, Box, Button, ButtonGroup, Container, Toolbar} from "@material-ui/core";
import {useRouter} from "next/router";

const Header = () => {
	const router = useRouter();

	const renderLink = (href: string, label: string) => (
		<Link href={href}>
			<a>
				<Button>
					{label}
				</Button>
			</a>
		</Link>
	);

	const onLogout = () => {
		// todo: send some req to invalidate cookie
		router.push({pathname: '/'});
	}

	// todo: add some route animation
	// todo: style
	return (
		<header>
			<Box bgcolor="#252525" color="white" height={64}>
				<AppBar position="fixed">
					<Container maxWidth="lg">
						<Toolbar disableGutters>
							<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
								{renderLink('/', 'Home')}
								{renderLink('/blog', 'Blog')}
								{renderLink('/decks', 'Decks')}
								{renderLink('/cards', 'Cards')}
								{renderLink('/about', 'About')}
							</ButtonGroup>
							<ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
								{renderLink('/register', 'Register')}
								{renderLink('/login', 'Login')}
								<Button onClick={onLogout}>
									Logout
								</Button>
							</ButtonGroup>
							<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
								{renderLink('/graphql', 'GraphQL')}
							</ButtonGroup>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
		</header>
	)
}

export default Header;
