type CardType = {
	_id?: String,
	id: String,
	dbfId: Number,
	name: String,
	text: String,
	flavor: String,
	artist: String,
	attack: Number,
	cardClass: String,
	collectible: {type: Boolean},
	cost: Number,
	elite: String,
	faction: String,
	health: Number,
	mechanics: String[],
	rarity: String,
	set: String,
	type: String,
}

export default CardType;
