import express from 'express';

const app = express();
const port = 5001;

app.get('/', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.send(`Hello World from NodeJS server! (http://localhost:${port})`)
});

app.listen(port, () => {
	console.log(`Server http://localhost:${port}`)
});
