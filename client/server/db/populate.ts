// run ts-node populate.ts to populate MongoBD
import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import Card from './models/card';
import Deck from './models/deck';
import User from './models/user';
import {connectToMongo} from "./connect";
import {userRole} from "../../consts/User";

const populate = async () => {
	try {
		console.log('Cleaning db...');
		await Card.deleteMany({});
		await Deck.deleteMany({});
		await User.deleteMany({});

		console.log('Fetching data from API...');
		const {data} = await axios.get('https://api.hearthstonejson.com/v1/25770/plPL/cards.json');

		console.log(`Inserting...`);
		await Card.create(data);
		await User.create({
			email: process.env.USER_ADMIN_EMAIL,
			password: process.env.USER_ADMIN_PASSWORD,
			role: userRole.ADMIN,
		});

		console.log('Completed!');
		return process.exit(0);
	} catch (e) {
		console.error('POPULATE: Error ', e);
	}
};

connectToMongo(populate);
