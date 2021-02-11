const deckFields = `
	title: String!,
	description: String!,
	cardsId: [String]
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
