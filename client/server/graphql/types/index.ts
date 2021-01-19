import portfolioType from './portfolio';
import cardType from './card';

const rootQuery = `
	type Query { 
	 	portfolio(id: ID): Portfolio,
		portfolios: [Portfolio],
	 	card(id: ID): Card,
		cards: [Card],
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
	${cardType}
`;

export default type;
