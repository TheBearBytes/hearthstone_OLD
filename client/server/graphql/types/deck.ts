const deckFields = `
	title: String!,
	description: String!,
`;

const deckType = `
	type Deck {
		_id: ID,
		cards: [Card],
		${deckFields}
	}
	
	input DeckInput {
		cards: [String],
		${deckFields}
	}
`;

export default deckType;
