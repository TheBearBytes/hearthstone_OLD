import Layout from "../components/Layout";
import CssBaseline from '@material-ui/core/CssBaseline';
import React, {useEffect} from "react";
import theme from "../theme/theme";
import {ThemeProvider} from "@material-ui/styles";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql',
	cache: new InMemoryCache()
});

export default function App({Component, pageProps}) {

	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</ApolloProvider>
			<style jsx global>{`
                html,
                body {
                  padding: 0;
                  margin: 0;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                    sans-serif;
                    min-height: 100vh;
                                    height: 100%;

                }
        
                * {
                  box-sizing: border-box;
                }
                
                #__next {
                height: 100%;
                }
              `}</style>
		</>
	)
}
