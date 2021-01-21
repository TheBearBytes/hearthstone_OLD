import Head from 'next/head'
import {useQuery} from '@apollo/client';
import {GET_DECK} from '../../apollo/queries';
import {initializeApollo} from '../../lib/apollo';
import DeckType from '../../types/deck';

export default function Deck({id}) {
	const {data} = useQuery(GET_DECK, {variables: {id}});

	const deck: DeckType = data && data.deck || {};

	return (
		<>
			<Head>
				<title>Decks | {deck.title}</title>
			</Head>
			<section>
				<h1>{deck.title}</h1>
				<ul>
					{deck.cardsId.map(c => (<li key={c}>{c}</li>))}
				</ul>
			</section>
		</>
	)
}

export async function getServerSideProps({params: {id}}) {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_DECK,
		variables: {id}
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
			id
		}
	}
}
