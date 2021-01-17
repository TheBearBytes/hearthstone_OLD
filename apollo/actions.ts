import {useMutation, useQuery} from '@apollo/client';
import {CREATE_PORTFOLIO, DELETE_PORTFOLIO, GET_PORTFOLIOS, UPDATE_PORTFOLIO} from './queries';

const onPortfolioCreated = (cache, {data: {createPortfolio}}) => {
	const {portfolios: cachedPortfolios} = cache.readQuery({query: GET_PORTFOLIOS});
	const portfolios = [...cachedPortfolios, createPortfolio];

	cache.writeQuery({
		query: GET_PORTFOLIOS,
		data: {portfolios},
	});
}

const onPortfolioDeleted = (cache, {data: {deletePortfolio}}) => {
	const {portfolios: cachedPortfolios} = cache.readQuery({query: GET_PORTFOLIOS})
	const portfolios = cachedPortfolios.filter(p => p._id !== deletePortfolio);

	cache.writeQuery({
		query: GET_PORTFOLIOS,
		data: { portfolios }
	});
}

export const useGetPortfolios = () => useQuery(
	GET_PORTFOLIOS,
	{
		// Setting this value to true will make the component rerender when
		// the "networkStatus" changes, so we are able to know if it is fetching
		// more data
		notifyOnNetworkStatusChange: true,
	}
);

export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO, {update: onPortfolioCreated});

// todo: warning Cache data may be lost when replacing the portfolios field of a Query object
export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {update: onPortfolioDeleted});

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
