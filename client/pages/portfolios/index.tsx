import Head from 'next/head'
import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import ButtonError from '../../components/shared/ButtonError';
import {NetworkStatus} from '@apollo/client';
import {initializeApollo} from '../../lib/apollo';
import {useCreatePortfolio, useDeletePortfolio, useGetPortfolios, useUpdatePortfolio} from '../../apollo/actions';
import {GET_PORTFOLIOS} from '../../apollo/queries';

export default function Portfolios() {
	const {data, networkStatus} = useGetPortfolios();
	const [createPortfolio] = useCreatePortfolio();
	const [deletePortfolio] = useDeletePortfolio();
	const [updatePortfolio] = useUpdatePortfolio();

	const portfolios = data && data.portfolios || [];

	useEffect(() => {
		console.log('networkStatus', networkStatus, NetworkStatus[networkStatus]);
	}, [networkStatus]);


	const handleCreatePortfolio = async () => {
		await createPortfolio();
	}

	const handleUpdatePortfolio = async (id: string) => {
		await updatePortfolio({variables: {id}});
	}

	const handleDeletePortfolio = async (id: string) => {
		await deletePortfolio({variables: {id}});
	}

	return (
		<>
			<Head>
				<title>Portfolios</title>
			</Head>
			<section>
				<h2>Portfolios</h2>
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
									<Button color="primary"
											onClick={() => handleUpdatePortfolio(portfolio._id)}>edit</Button>
									<ButtonError
										onClick={() => handleDeletePortfolio(portfolio._id)}>delete</ButtonError>
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
