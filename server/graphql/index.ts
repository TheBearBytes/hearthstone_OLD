import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';
import {portfolioType, rootType} from './types';
import portfolioResolvers from './resolvers';

const schema = buildSchema(`${rootType}${portfolioType}`);

const rootValue = {
	...portfolioResolvers
};

const graphqlRoute = graphqlHTTP({
	schema,
	rootValue,
	graphiql: true
});

export default graphqlRoute;
