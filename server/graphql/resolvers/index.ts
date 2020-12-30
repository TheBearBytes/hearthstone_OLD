import fakeData from '../../../db/fakeData';

const portfolioResolvers = {
	portfolio: ({id}) => fakeData.portfolio().find(p => p._id === id),
	portfolios: () => fakeData.portfolio()
};

export default portfolioResolvers;
