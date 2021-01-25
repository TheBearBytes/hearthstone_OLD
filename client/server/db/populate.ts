// run ts-node populate.ts to populate MongoBD
// connectionString must be a copy of MONGODB_CONNECTION_STRING in .env

import axios from 'axios';
import Card from './models/card';

export const populate = async () => {
	try {
		console.log('POPULATE: Fetching data from API.');
		const {data} = await axios.get('https://api.hearthstonejson.com/v1/25770/plPL/cards.json');

		console.log('POPULATE: Cleaning up Card collection.');
		await Card.deleteMany({});

		console.log(`POPULATE: Inserting (${data.length} cards).`);
		await Card.create(data);

		console.log('POPULATE: completed');
	} catch (e) {
		console.error('POPULATE: Error ', e);
	}
};
