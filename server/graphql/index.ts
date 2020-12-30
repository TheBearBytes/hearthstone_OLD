import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';
import type from './types';
import portfolioResolvers from './resolvers';

const schema = buildSchema(type);

const rootValue = {
	...portfolioResolvers
};

const graphqlRoute = graphqlHTTP({
	schema,
	rootValue,
	graphiql: true
});

export default graphqlRoute;
