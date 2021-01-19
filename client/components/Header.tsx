import Link from 'next/link'
import {AppBar, Box, Button, ButtonGroup, Container, Toolbar} from "@material-ui/core";
import React from "react";

const Header = () => {
	const renderLink = (href: string, label: string) => (
		<Link href={href}>
			<a>
				<Button>
					{label}
				</Button>
			</a>
		</Link>
	);

	return (
		<header>
			<Box bgcolor="#252525" color="white" height={64}>
				<AppBar position="fixed">
					<Container maxWidth="lg">
						<Toolbar disableGutters>
							<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
								{renderLink('/', 'Home')}
								{renderLink('/blog', 'Blog')}
								{renderLink('/portfolios', 'Portfolios')}
								{renderLink('/cards', 'Cards')}
								{renderLink('/about', 'About')}
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
