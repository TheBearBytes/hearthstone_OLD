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
	cards: [{
		type : Schema.Types.ObjectId,
		ref: 'Card'
	}],
}, {
	timestamps: true,
});

export default mongoose.model('Deck', deckSchema);
