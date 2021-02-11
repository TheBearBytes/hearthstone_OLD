import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const deckSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	cardsId: {type: [String]},
}, {
	timestamps: true,
});

export default mongoose.model('Deck', deckSchema);
