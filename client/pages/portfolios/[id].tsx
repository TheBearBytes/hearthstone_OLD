import Head from 'next/head'
import {useLazyQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {GET_PORTFOLIO} from '../../apollo/queries';

export default function Portfolio({id}) {
	const [getPortfolio, {loading, data}] = useLazyQuery(GET_PORTFOLIO, {variables: { id }});
	const [portfolio, setPortfolio] = useState(null);

	useEffect(() => {
		getPortfolio({variables: {id}})
	}, [])

	if (data && !portfolio) { setPortfolio(data.portfolio) }
	if (loading || !portfolio) { return 'Loading...' };

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

export async function getServerSideProps({params}) {
	return {
		props: {
			id: params.id
		}
	}
}
