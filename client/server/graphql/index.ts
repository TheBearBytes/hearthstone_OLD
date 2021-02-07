import {ApolloServer, gql} from 'apollo-server-express';
import type from './types';
import {deckMutations, deckQueries} from './resolvers/deck';
import cardQueries from './resolvers/card';

const typeDefs = gql`${type}`;

const resolvers = {
	Query: {
		...deckQueries,
		...cardQueries,
	},
	Mutation: {
		...deckMutations,
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({res, req}) => ({
		res,
		req,
	})
})

export default apolloServer;
