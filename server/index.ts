import express from 'express';
import next from 'next';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const fakeData = {
	portfolio: () => {
		const getRandomBoolean = () => Math.random() < 0.5;
		return [
			{
				_id: "sad87da79",
				title: getRandomBoolean() ? 'Job in Netcentric' : 'Job in Amazon',
				company: getRandomBoolean() ? 'Netcentric' : 'Amazon',
				companyWebsite: 'www.google.com',
				location: 'Spain, Barcelona',
				jobTitle: 'Engineer',
				description: 'Doing something, programing....',
				startDate: '01/01/2014',
				endDate: '01/01/2016'
			},
			{
				_id: "da789ad1",
				title: getRandomBoolean() ? 'Job in Siemens' : 'Job in Google',
				company: getRandomBoolean() ? 'Siemens' : 'Google',
				companyWebsite: 'www.google.com',
				location: 'Slovakia, Kosice',
				jobTitle: 'Software Engineer',
				description: 'Responsoble for parsing framework for JSON medical data.',
				startDate: '01/01/2011',
				endDate: '01/01/2013'
			},
			{
				_id: "sadcxv9",
				title: getRandomBoolean() ? 'Work in USA' : 'Work in Poland',
				company: 'WhoKnows',
				companyWebsite: 'www.google.com',
				location: 'USA, Montana',
				jobTitle: 'Housekeeping',
				description: 'So much responsibility....Overloaaaaaad',
				startDate: '01/01/2010',
				endDate: '01/01/2011'
			}
		];
	}
}

app.prepare().then(() => {
	const server = express();

	const schema = buildSchema(`
		type Portfolio {
			_id: ID,
			title: String,
			company: String,
			companyWebsite: String,
			location: String,
			jobTitle: String,
			description: String,
			startDate: String,
			endDate: String,
		}
		type Query {
			hello: String,
			portfolio: Portfolio,
			portfolios: [Portfolio],
		}
	`);

	const rootValue = {
		hello: () => 'Hello world!',
		portfolio: () => fakeData.portfolio()[0],
		portfolios: () => fakeData.portfolio()
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
