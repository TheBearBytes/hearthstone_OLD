import {gql} from '@apollo/client';

export const GET_DECK = gql`
    query Deck($id: ID) {
        deck (id: $id) {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate,
        }
    }
`

export const GET_DECKS = gql`
    query Decks {
        decks {
            _id,
            title,
            company
        }
    }
`

export const CREATE_DECK = gql`
    mutation CreateDeck {
        createDeck(input: {
            title: "New title test",
            company: "121221",
            companyWebsite: "121221",
            location: "121221",
            jobTitle: "121221",
            description: "121221",
            startDate: "121221",
            endDate: "121221",
        }) {
            _id,
            title,
        }
    }
`;

export const UPDATE_DECKS = gql`
    mutation UpdateDeck($id: ID) {
        updateDeck(id: $id, input: {
            title: "UPDATE Job"
            company: "UPDATE Company"
            companyWebsite: "UPDATE Website"
            location: "UPDATE Location"
            jobTitle: "UPDATE Job Title"
            description: "UPDATE Desc"
            startDate: "12/12/2012 UPDATE"
            endDate: "14/11/2013 UPDATE"
        }) {
            _id,
            title,
            company,
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
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
