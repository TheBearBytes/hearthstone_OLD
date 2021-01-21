import {gql} from '@apollo/client';

export const GET_DECK = gql`
    query Deck($id: ID) {
        deck (id: $id) {
            _id,
            title,
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
    mutation CreateDeck {
        createDeck(input: {
            title: "New title test",
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
            id,
            name,
            text,
            flavor,
        }
    }
`;
