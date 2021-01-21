import fakeData from '../../../db/fakeData';

export const deckQueries = {
	deck: (root, {id}) => fakeData.deck.find(p => p._id === id),
	decks: () => fakeData.deck,
};

export const deckMutations = {
	createDeck: (root, {input}) => {
		const deck = {
			...input,
			_id: Math.floor(Math.random() * 16777215).toString(16)
		}

		fakeData.deck.push(deck);
		return deck;
	},
	updateDeck: (root, {id, input}) => {
		const idx = fakeData.deck.findIndex(p => p._id === id);
		const deckToUpdate = fakeData.deck[idx];
		const deck = {
			...deckToUpdate,
			...input,
		}

		fakeData.deck[idx] = deck;
		return deck;
	},
	deleteDeck: (root, {id}) => {
		const idx = fakeData.deck.findIndex(p => p._id === id);
		fakeData.deck.splice(idx, 1);

		return id;
	}
}
