const cardType = `
	type Card {
		_id: ID,
		id: String,
		dbfId: Int,
		name: String,
		text: String,
		flavor: String,
		artist: String,
		attack: Int,
		cardClass: String,
		collectible: Boolean,
		cost: Int,
		elite: String,
		faction: String,
		health: Int,
		mechanics: [String],
		rarity: String,
		set: String,
		type: String,
	}
`;

export default cardType;
