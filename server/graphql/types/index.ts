const rootQuery = `
	type Query { 
	 	portfolio(id: ID): Portfolio,
		portfolios: [Portfolio],
	}
`;

const rootMutation = `
	type Mutation { 
		createPortfolio(portfolioInput: PortfolioInput): Portfolio
	}
`;

const portfolioType = `
	type Portfolio {
		_id: ID,
		title: String,
		company: String,
		companyWebsite: String,
		location: String,
		jobTitle: String,
		description: String,
		startDate: String,
		endDate: String,
	}
	
	input PortfolioInput {
		title: String,
		company: String,
		companyWebsite: String,
		location: String,
		jobTitle: String,
		description: String,
		startDate: String,
		endDate: String,
	}
`;

const type = `
	${rootQuery}
	${rootMutation}
	${portfolioType}
`;

export default type;
