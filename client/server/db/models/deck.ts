import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const deckSchema = new Schema({
	title: {type: String},
	cardsId: {type: [String]},
});

export default mongoose.model('Deck', deckSchema);
