import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cardSchema = new Schema({
	id: {type: String},
	dbfId: {type: String},
	name: {type: String},
	text: {type: String},
	flavor: {type: String},
	artist: {type: String},
	attack: {type: String},
	cardClass: {type: String},
	collectible: {type: String},
	cost: {type: String},
	elite: {type: String},
	faction: {type: String},
	health: {type: String},
	mechanics: {type: String},
	rarity: {type: String},
	set: {type: String},
	type: {type: String},
});

export default mongoose.model('Card', cardSchema);
