const userFields = `
	avatar: String,
	username: String!,
	email: String!,
`;

const userType = `
	type User {
		${userFields}
		_id: ID,
		createdAt: String,
	}
	
	input UserInput {
		${userFields}
		password: String!
		passwordConfirmation: String!
	}
	
	input LoginInput {
		email: String!
		password: String!
	}
`;

export default userType;
