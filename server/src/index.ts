import express from 'express';
import cors from 'cors';

const app = express();
const port = 5001;

// var whitelist = ['http://localhost:3001/', 'localhost']
// var corsOptions = {
// 	origin: function (origin, callback) {
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true)
// 		} else {
// 			callback(new Error('Not allowed by CORS'))
// 		}
// 	}
// }

app.use(cors())

app.get('/', (req, res) => {
	res.send(`Hello World from NodeJS server! (http://localhost:${port})`)
});

app.listen(port, () => {
	console.log(`Server http://localhost:${port}`)
});
