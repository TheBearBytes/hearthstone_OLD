import {gql} from '@apollo/client';

export const GET_DECK = gql`
    query Deck($id: ID) {
        deck (id: $id) {
            _id,
            title,
            description,
            cardsId,
        }
    }
`

export const GET_DECKS = gql`
    query Decks {
        decks {
            _id,
            title,
            cardsId,
        }
    }
`

export const CREATE_DECK = gql`
    mutation CreateDeck(
        $title: String!
        $description: String!
        $cardsId: [String]
      ) {
        createDeck(input: {
          title: $title
          description: $description
          cardsId: $cardsId
        }) {
            _id,
            title,
        }
    }
`;

export const UPDATE_DECK = gql`
    mutation UpdateDeck($id: ID) {
        updateDeck(id: $id, input: {
            title: "UPDATE deck"
            cardsId: [
                "AT_001",
                "AT_002",
                "AT_003",
                "AT_004",
                "AT_005",
            ]
        }) {
            _id,
            title,
            cardsId,
        }
    }`;

export const DELETE_DECK = gql`
    mutation DeleteDeck($id: ID) {
        deleteDeck(id: $id)
    }`;

export const GET_CARDS = gql`
    query Cards {
        cards {
            _id,
            name,
            attack,
            cost,
            cardClass,
			rarity,
			set,
			type,
        }
    }
`;

export const GET_CARD = gql`
    query Card($id: ID) {
        card (id: $id) {
            _id,
            id,
            name,
            text,
            attack,
            cost,
            cardClass,
            rarity,
            set,
            type,
        }
    }
`
