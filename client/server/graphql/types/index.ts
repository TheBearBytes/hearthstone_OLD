import deckType from './deck';
import cardType from './card';

const rootQuery = `
	type Query { 
	 	deck(id: ID): Deck,
		decks: [Deck],
	 	card(id: ID): Card,
		cards: [Card],
	}
`;

const rootMutation = `
	type Mutation { 
		createDeck(input: DeckInput): Deck,
		updateDeck(id: ID, input: DeckInput): Deck,
		deleteDeck(id: ID): ID,
	}
`;

const type = `
	${rootQuery}
	${rootMutation}
	${deckType}
	${cardType}
`;

export default type;
