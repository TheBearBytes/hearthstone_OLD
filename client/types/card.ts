type CardDto = {
	_id?: string,
	id: string,
	dbfId: number,
	name: string,
	text: string,
	flavor: string,
	artist: string,
	attack: number,
	cardClass: string,
	collectible: boolean,
	cost: number,
	elite: string,
	faction: string,
	health: number,
	mechanics: string[],
	rarity: string,
	set: string,
	type: string,
}

export default CardDto;
