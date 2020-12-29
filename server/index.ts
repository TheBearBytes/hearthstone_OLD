import express from 'express';
import next from 'next';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	const schema = buildSchema(`
		type Query {
			hello: String
		}
	`);

	const rootValue = {
		hello: () => 'Hello world!'
	};

	server.use('/graphql', graphqlHTTP({
		schema,
		rootValue,
		graphiql: true
	}));

	server.all('*', (req, res) => {
		return handle(req, res);
	})

	server.listen(port, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`);
	})
});
