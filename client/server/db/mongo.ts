import mongoose from 'mongoose';
// import {populate} from './populate';

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

const connectionString = 'mongodb://mongo:27017/hearthstone';

import './models/user';

const connectToMongo = () => {
	mongoose.connect(connectionString, options, () => {
		console.log("Connected to MongoDB ", connectionString);
	});
}

export default connectToMongo;
