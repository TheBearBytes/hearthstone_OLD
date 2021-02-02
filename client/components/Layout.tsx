import Footer from "./Footer";
import Header from "./Header";
import {Box, Container} from "@material-ui/core";
import React from "react";
import Toast from "./Toast";
import Cookies from 'js-cookie';
import jwt from "jsonwebtoken";

const accessTokenLog = () => {
	const accessToken = Cookies.get('access-token');
	const decodedAccessToken = jwt.decode(accessToken);
	console.log('decodedAccessToken', decodedAccessToken);
}

const Layout = ({children}) => {
	accessTokenLog();

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
			<Toast/>
		</Box>
	)
}

export default Layout;
