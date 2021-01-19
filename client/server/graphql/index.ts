import {ApolloServer, gql} from 'apollo-server-express';
import type from './types';
import {portfolioMutations, portfolioQueries} from './resolvers';

const typeDefs = gql`${type}`;

const resolvers = {
	Query: {
		...portfolioQueries
	},
	Mutation: {
		...portfolioMutations
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
})

export default apolloServer;
