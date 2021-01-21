const deckFields = `
	title: String,
	company: String,
	companyWebsite: String,
	location: String,
	jobTitle: String,
	description: String,
	startDate: String,
	endDate: String,
`;

const deckType = `
	type Deck {
		_id: ID,
		${deckFields}
	}
	
	input DeckInput {
		${deckFields}
	}
`;

export default deckType;
