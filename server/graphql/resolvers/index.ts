import fakeData from '../../../db/fakeData';

const portfolioQueries = {
	portfolio: (root, {id}) => fakeData.portfolio.find(p => p._id === id),
	portfolios: () => fakeData.portfolio,
};

const portfolioMutations = {
	createPortfolio: (root, {input}) => {
		const portfolio = {
			...input,
			_id: Math.floor(Math.random() * 16777215).toString(16)
		}

		fakeData.portfolio.push(portfolio);
		return portfolio;
	},
	updatePortfolio: (root, {id, input}) => {
		const idx = fakeData.portfolio.findIndex(p => p._id === id);
		const portfolioToUpdate = fakeData.portfolio[idx];
		const portfolio = {
			...portfolioToUpdate,
			...input,
		}

		fakeData.portfolio[idx] = portfolio;
		return portfolio;
	}
}

export {portfolioQueries, portfolioMutations};
