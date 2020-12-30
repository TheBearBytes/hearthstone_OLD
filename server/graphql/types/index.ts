const rootType = `
	type Query { 
	 	portfolio(id: ID): Portfolio,
		portfolios: [Portfolio],
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
`;

export {rootType, portfolioType};
