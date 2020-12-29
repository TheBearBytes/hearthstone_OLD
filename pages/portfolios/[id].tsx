import Head from 'next/head'
import axios from 'axios';

const fetchPortfoliosIds = async () => {
	const query = `{
		portfolios {
			_id, 
		}
	}`;
	const {data} = await axios.post('http://localhost:3000/graphql', {query});
	return data.data.portfolios.map(p => {
		return {params: {id: p._id}}
	});
}

const fetchPortfolio = async (id: string) => {
	const query = `{
		portfolio(id: "${id}") {
			_id,
			title,
		}
	}`;
	const {data} = await axios.post('http://localhost:3000/graphql', {query});
	return data.data.portfolio;
}

export default function Portfolio({portfolio}) {
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

export async function getStaticPaths() {
	const paths = await fetchPortfoliosIds()
	return {
		paths,
		fallback: false
	}
}

// or getServerSideProps instead of getStaticProps and getStaticPaths [ssr vs static pages]
export async function getStaticProps({params}) {
	const portfolio = await fetchPortfolio(params.id)
	return {
		props: {
			portfolio
		}
	}
}
