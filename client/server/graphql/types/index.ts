import portfolioType from './portfolio';

const rootQuery = `
	type Query { 
	 	portfolio(id: ID): Portfolio,
		portfolios: [Portfolio],
	}
`;

const rootMutation = `
	type Mutation { 
		createPortfolio(input: PortfolioInput): Portfolio,
		updatePortfolio(id: ID, input: PortfolioInput): Portfolio,
		deletePortfolio(id: ID): ID,
	}
`;

const type = `
	${rootQuery}
	${rootMutation}
	${portfolioType}
`;

export default type;
