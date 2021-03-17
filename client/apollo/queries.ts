import {gql} from '@apollo/client';

export const GET_DECK = gql`
    query Deck($id: ID) {
        deck (id: $id) {
            _id,
            title,
            description,
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
    }
`

export const GET_DECKS = gql`
    query Decks {
        decks {
            _id,
            title,
        }
    }
`

export const CREATE_DECK = gql`
    mutation CreateDeck(
        $title: String!
        $description: String!
        $cards: [String]
      ) {
        createDeck(input: {
          title: $title
          description: $description
          cards: $cards
        }) {
            _id,
            title,
        }
    }
`;

export const UPDATE_DECK = gql`
    mutation UpdateDeck(
        $id: ID
        $title: String!
        $description: String!
        $cards: [String]
      )  {
        updateDeck(id: $id, input: {
            title: $title
            description: $description
            cards: $cards
        }) {
            _id,
            title,
            description,
            cards {
                _id
            }
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
