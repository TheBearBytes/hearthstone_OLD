import React, {useEffect} from "react";
import Footer from "./Footer";
import Header from "./header/Header";
import {Box, Container} from "@material-ui/core";
import Toast from "./Toast";
import useLoggedUser from "../../hooks/useLoggedUser";

const Layout = ({children}) => {
	const loggedUser = useLoggedUser();

	useEffect(() => {
		loggedUser();
	}, []);

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
