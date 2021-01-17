import Head from 'next/head'
import {useQuery} from '@apollo/client';
import {GET_PORTFOLIO, GET_PORTFOLIOS} from '../../apollo/queries';
import {initializeApollo} from '../../lib/apollo';

export default function Portfolio({id}) {
	const {data} = useQuery(GET_PORTFOLIO, {variables: {id}});

	const portfolio = data && data.portfolio || {};

	return (
		<>
			<Head>
				<title>Portfolios | {portfolio.title}</title>
			</Head>
			<section>
				<h1>{portfolio.title}</h1>
			</section>
		</>
	)
}

export async function getStaticProps({params: {id}}) {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_PORTFOLIO,
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

	const {data: {portfolios}} = await apolloClient.query({
		query: GET_PORTFOLIOS,
	})

	return {
		paths: portfolios.map(p => ({
			params: {id: p._id},
		})),
		fallback: false, // redirect to 404 when id not found
	};
}
