import fakeData from '../../../db/fakeData';

const portfolioResolvers = {
	portfolio: ({id}) => fakeData.portfolio.find(p => p._id === id),
	portfolios: () => fakeData.portfolio,
	createPortfolio: ({portfolioInput}) => {
		const portfolio = {
			...portfolioInput,
			_id: Math.floor(Math.random() * 16777215).toString(16)
		}
		fakeData.portfolio.push(portfolio);
		return portfolio;
	}
};

export default portfolioResolvers;
