import deckType from './deck';
import cardType from './card';
import userType from './user';

const rootQuery = `
	type Query { 
	 	deck(id: ID): Deck,
		decks: [Deck],
	 	card(id: ID): Card,
		cards: [Card],
		loggedUser: User,
	}	
`;

const rootMutation = `
	type Mutation { 
		createDeck(input: DeckInput): Deck,
		updateDeck(id: ID, input: DeckInput): Deck,
		deleteDeck(id: ID): ID,
		
		login(input: LoginInput): Boolean,
		register(input: UserInput): Boolean,
	}
`;

const type = `
	${rootQuery}
	${rootMutation}
	${deckType}
	${cardType}
	${userType}
`;

export default type;
