import Head from 'next/head'
import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';
import axios from 'axios';
import {useState} from 'react';

const fetchPortfolios = async () => {
	const query = `{
		portfolios {
			_id, 
			title, 
			company
		}
	}`;
	const {data} = await axios.post('http://localhost:3000/graphql', {query});
	return data.data.portfolios;
}

export default function Portfolios({portfolios}) {
	const [portfoliosState, setPortfoliosState] = useState(portfolios);

	const handleFetchPortfolios = async () => {
		const portfolios = await fetchPortfolios();
		setPortfoliosState(portfolios);
	}

	return (
		<>
			<Head>
				<title>Portfolios</title>
			</Head>
			<section>
				<h2>Portfolios</h2>
				<Button onClick={handleFetchPortfolios}>Fetch portfolios</Button>
				<Box display="flex" justifyContent="space-between">
					{portfoliosState.map(portfolio => (
						<Card key={portfolio._id}>
							<CardContent>
								<Typography variant="h5" component="h2">
									{portfolio.title}
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									{portfolio.company}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Box>
			</section>
		</>
	)
}

export async function getStaticProps() {
	const portfolios = await fetchPortfolios()
	return {
		props: {
			portfolios
		}
	}
}
