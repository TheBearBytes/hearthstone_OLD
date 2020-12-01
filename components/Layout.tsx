import Footer from "./Footer";
import Header from "./Header";
import {Box, Container} from "@material-ui/core";
import React from "react";

const Layout = ({children}) => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			height={1}
		>
			<Header/>
			<Box flex={1}>
				<Container maxWidth="lg">
					<main>{children}</main>
				</Container>
			</Box>
			<Footer/>
		</Box>
	)
}

export default Layout;
