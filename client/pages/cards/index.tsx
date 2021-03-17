import React from 'react';
import Head from 'next/head'
import {useQuery} from '@apollo/client';
import {initializeApollo} from '../../lib/apollo';
import {GET_CARDS} from '../../apollo/queries';
import CardsList from "../../components/cards/CardsList";
import {useRouter} from "next/router";

// SSG, cards collection will not change
export default function Cards() {
	const {data} = useQuery(GET_CARDS);
	const router = useRouter();

	const cards = data && data.cards || [];

	return (
		<>
			<Head>
				<title>Cards</title>
			</Head>
			<section>
				<h2>Cards</h2>
				<CardsList cards={cards} onCardClick={card => {
					router.push({pathname: `/cards/${card._id}`})
				}} />
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
