import CardDto from "./card";

type Deck = {
	_id?: string,
	title: string,
	description: string,
}

export type DeckDto = Deck & {
	cards: CardDto[],
}

export type DeckInputDto = Deck & {
	cards: string[],
}
