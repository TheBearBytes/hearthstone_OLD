require('dotenv');

import express from 'express';
import next from 'next';
import apolloServer from './graphql';
import {connectToMongo} from './db/mongo';
import {initPassportStrategies} from "./middlewares/passport";
import authMiddleware from "./middlewares/authMiddleware";

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

connectToMongo();

app.prepare().then(() => {
	const server = express();
	initPassportStrategies();

	authMiddleware(server);

	apolloServer.applyMiddleware({app: server})

	server.all('*', (req, res) => {
		return handle(req, res);
	})

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
		console.log(`> Hello docker`);
	})
});
