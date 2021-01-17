import {gql} from '@apollo/client';

export const GET_PORTFOLIO = gql`
    query Portfolio($id: ID) {
        portfolio (id: $id) {
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

export const GET_PORTFOLIOS = gql`
    query Portfolios {
        portfolios {
            _id,
            title,
            company
        }
    }
`

export const CREATE_PORTFOLIO = gql`
    mutation CreatePortfolio {
        createPortfolio(input: {
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

export const UPDATE_PORTFOLIO = gql`
    mutation UpdatePortfolio($id: ID) {
        updatePortfolio(id: $id, input: {
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

export const DELETE_PORTFOLIO = gql`
    mutation DeletePortfolio($id: ID) {
        deletePortfolio(id: $id)
    }`;
