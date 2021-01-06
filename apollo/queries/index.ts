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
