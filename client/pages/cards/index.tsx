import React from 'react';
import Head from 'next/head'
import {
	CardContent,
	IconButton,
	makeStyles,
	Paper, Table, TableBody, TableCell,
	TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import {useQuery} from '@apollo/client';
import {initializeApollo} from '../../lib/apollo';
import {GET_CARDS} from '../../apollo/queries';
import Link from 'next/link';

const useStyles = makeStyles({
	table: {
		// minWidth: 650,
	},
});

// SSG, cards collection will not change
export default function Cards() {
	const {data} = useQuery(GET_CARDS);
	const classes = useStyles();

	const cards = data && data.cards || [];


	return (
		<>
			<Head>
				<title>Cards</title>
			</Head>
			<section>
				<h2>Cards</h2>
				<TableContainer component={Paper}>
					<Table className={classes.table} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Attack</TableCell>
								<TableCell>Cost</TableCell>
								<TableCell>CardClass</TableCell>
								<TableCell>Rarity</TableCell>
								<TableCell>Set</TableCell>
								<TableCell>Type</TableCell>
								<TableCell/>
							</TableRow>
						</TableHead>
						<TableBody>
							{cards.map((card) => (
								<TableRow key={card._id}>
									<TableCell component="th" scope="row">
										{card.name}
									</TableCell>
									<TableCell>{card.attack}</TableCell>
									<TableCell>{card.cost}</TableCell>
									<TableCell>{card.cardClass}</TableCell>
									<TableCell>{card.rarity}</TableCell>
									<TableCell>{card.set}</TableCell>
									<TableCell>{card.type}</TableCell>
									<TableCell>
										<Link href={`/cards/${card._id}`}>
											<IconButton color="primary">
												{">"}
											</IconButton>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</section>
		</>
	)
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_CARDS,
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	}
}
