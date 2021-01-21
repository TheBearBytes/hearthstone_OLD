import Head from 'next/head'
import {useQuery} from '@apollo/client';
import {GET_DECK, GET_DECKS} from '../../apollo/queries';
import {initializeApollo} from '../../lib/apollo';

export default function Deck({id}) {
	const {data} = useQuery(GET_DECK, {variables: {id}});

	const deck = data && data.deck || {};

	return (
		<>
			<Head>
				<title>Decks | {deck.title}</title>
			</Head>
			<section>
				<h1>{deck.title}</h1>
			</section>
		</>
	)
}

export async function getStaticProps({params: {id}}) {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_DECK,
		variables: {id}
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
			id
		},
		revalidate: 1,
	}
}

export async function getStaticPaths() {
	const apolloClient = initializeApollo()

	const {data: {decks}} = await apolloClient.query({
		query: GET_DECKS,
	})

	return {
		paths: decks.map(p => ({
			params: {id: p._id},
		})),
		fallback: false, // redirect to 404 when id not found
	};
}
