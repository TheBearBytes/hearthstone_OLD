import Deck from '../../db/models/deck';
import {Types} from "mongoose";

export const deckQueries = {
    deck: async (root, {id}) => {
        const deck = await Deck.aggregate([
            {
                $match: {_id: new Types.ObjectId(id)}
            }, {
                $lookup: {
                    "from": "cards",
                    "localField": "cards",
                    "foreignField": "_id",
                    "as": "cards"
                }
            }
        ])

        return deck[0]; // aggregate returns array
    },
    decks: (_, __, ctx) => {
        return Deck.find({})
    },
};

export const deckMutations = {
    createDeck: async (root, {input}) => {
        const deck = await Deck.create(input);
        return deck;
    },
    updateDeck: async (root, {id, input}) => {
        const deck = await Deck.findOneAndUpdate({_id: id}, input, {new: true, runValidators: true});
        return deck;
    },
    deleteDeck: async (root, {id}) => {
        const deck = await Deck.findOneAndRemove({_id: id});
        return deck._id;
    }
}
