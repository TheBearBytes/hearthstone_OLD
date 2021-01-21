import Deck from '../../../db/models/deck'

export const deckQueries = {
	deck: (root, {id}) => Deck.findById(id),
	decks: () => Deck.find({}),
};

export const deckMutations = {
	createDeck: async (root, {input}) => {
		console.log(111, input)
		const deck = await Deck.create(input);
		return deck;
	},
	updateDeck: async (root, {id, input}) => {
		const deck = await Deck.findOneAndUpdate({_id: id}, input, {new: true});
		return deck;
	},
	deleteDeck: async (root, {id}) => {
		const deck = await Deck.findOneAndRemove({_id: id});
		return deck._id;
	}
}
