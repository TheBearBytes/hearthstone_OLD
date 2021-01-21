const deckFields = `
	title: String,
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
