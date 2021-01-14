import Head from 'next/head'
import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import ButtonError from '../../components/shared/ButtonError';
import {NetworkStatus, useMutation, useQuery} from '@apollo/client';
import {GET_PORTFOLIOS, CREATE_PORTFOLIO} from '../../apollo/queries';
import {initializeApollo} from '../../lib/apollo';

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

export default function Portfolios() {
	const [portfolios, setPortfolios] = useState([]);
	const { data, networkStatus } = useQuery(
		GET_PORTFOLIOS,
		{
			// Setting this value to true will make the component rerender when
			// the "networkStatus" changes, so we are able to know if it is fetching
			// more data
			notifyOnNetworkStatusChange: true,
		}
	);

	useEffect(() => {
		console.log('networkStatus', networkStatus, NetworkStatus[networkStatus]);
	}, [networkStatus]);

	const onPortfolioCreated = (cache, {data: {createPortfolio}}) => {
		const {portfolios: cachedPortfolios} = cache.readQuery({query: GET_PORTFOLIOS});
		cache.writeQuery({
			query: GET_PORTFOLIOS,
			data: {portfolios: [...cachedPortfolios, createPortfolio]},
		});
	}
	const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {update: onPortfolioCreated});

	if (data && data.portfolios.length > 0 && (portfolios.length === 0 || portfolios.length !== data.portfolios.length)) {
		setPortfolios(data.portfolios);
	}

	const handleFetchPortfolios = () => {
		console.log('handleFetchPortfolios');
		setPortfolios([]);
	}

	const handleCreatePortfolio = async () => {
		await createPortfolio();
	}

	const handleUpdatePortfolio = async (id: string) => {
		await updatePortfolio(id);
	}

	const handleDeletePortfolio = async (id: string) => {
		await deletePortfolio(id);
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
					{portfolios.map(portfolio => (
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
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_PORTFOLIOS,
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	}
}
