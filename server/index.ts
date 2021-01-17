import express from 'express';
import next from 'next';
import apolloServer from './graphql';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev, dir: './client'});
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	apolloServer.applyMiddleware({app: server})

	server.all('*', (req, res) => {
		return handle(req, res);
	})

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	})
});
