import Head from 'next/head'
import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';
import axios from 'axios';
import {useState} from 'react';
import Link from 'next/link';
import ButtonError from '../../components/shared/ButtonError';

const fetchPortfolios = async () => {
	const query = `query {
		portfolios {
			_id, 
			title, 
			company
		}
	}`;
	const {data} = await axios.post('http://localhost:3000/graphql', {query});
	return data.data.portfolios;
}

const createPortfolio = async () => {
	const query = `mutation {
			createPortfolio(input: {
			title: "New title test",
			company: "121221",
			companyWebsite: "121221",
			location: "121221",
			jobTitle: "121221",
			description: "121221",
			startDate: "121221",
			endDate: "121221",
		}) {
			  _id,
			title,
		}
	}`;
	const {data} = await axios.post('http://localhost:3000/graphql', {query});
	return data.data.createPortfolio;
}

const updatePortfolio = async (id: string) => {
	const query = `mutation {
			updatePortfolio(
				id: "${id}",
				input: {
					title: "EDIT New title test",
					company: "EDIT 121221",
					companyWebsite: "EDIT 121221",
					location: "EDIT 121221",
					jobTitle: "EDIT 121221",
					description: "EDIT 121221",
					startDate: "EDIT 121221",
					endDate: "EDIT 121221",
			}) {
				  _id,
				title,
			}
	}`;
	const {data} = await axios.post('http://localhost:3000/graphql', {query});
	return data.data.updatePortfolio;
}

const deletePortfolio = async (id: string) => {
	const query = `mutation {
			deletePortfolio(id: "${id}")
	}`;
	const {data} = await axios.post('http://localhost:3000/graphql', {query});
	return data.data.deletePortfolio;
}

export default function Portfolios({portfolios}) {
	const [portfoliosState, setPortfoliosState] = useState(portfolios);

	const handleFetchPortfolios = async () => {
		const portfolios = await fetchPortfolios();
		setPortfoliosState(portfolios);
	}

	const handleCreatePortfolio = async () => {
		await createPortfolio();
		await handleFetchPortfolios();
	}

	const handleUpdatePortfolio = async (id: string) => {
		await updatePortfolio(id);
		await handleFetchPortfolios();
	}

	const handleDeletePortfolio = async (id: string) => {
		await deletePortfolio(id);
		await handleFetchPortfolios();
	}

	return (
		<>
			<Head>
				<title>Portfolios</title>
			</Head>
			<section>
				<h2>Portfolios</h2>
				<Button variant="contained" color="primary" onClick={handleFetchPortfolios}>Fetch portfolios</Button>
				<Button variant="contained" color="primary" onClick={handleCreatePortfolio}>Create portfolio</Button>
				<Box display="flex" flexWrap="wrap">
					{portfoliosState.map(portfolio => (
						<Box key={portfolio._id} m={1}>
							<Card>
								<CardContent>
									<Typography variant="h5" component="h2">
										{portfolio.title}
									</Typography>
									<Typography color="textSecondary" gutterBottom>
										{portfolio.company}
									</Typography>
									<Link href={`/portfolios/${portfolio._id}`}>
										<Button color="primary">show</Button>
									</Link>
									<Button color="primary" onClick={() => handleUpdatePortfolio(portfolio._id)}>edit</Button>
									<ButtonError onClick={() => handleDeletePortfolio(portfolio._id)}>delete</ButtonError>
								</CardContent>
							</Card>
						</Box>
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
