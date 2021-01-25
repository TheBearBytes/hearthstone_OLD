import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cardSchema = new Schema({
	id: {type: String},
	dbfId: {type: Number},
	name: {type: String},
	text: {type: String},
	flavor: {type: String},
	artist: {type: String},
	attack: {type: Number},
	cardClass: {type: String},
	collectible: {type: Boolean},
	cost: {type: Number},
	elite: {type: String},
	faction: {type: String},
	health: {type: Number},
	mechanics: {type: [String]},
	rarity: {type: String},
	set: {type: String},
	type: {type: String},
});

export default mongoose.model('Card', cardSchema);
