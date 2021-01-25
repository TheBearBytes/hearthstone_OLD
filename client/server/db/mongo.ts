import mongoose from 'mongoose';
import {default as connectMongoDBSession, MongoDBSessionOptions} from 'connect-mongodb-session';
import session from 'express-session';
// import {populate} from './populate';

const MongoDBStore = connectMongoDBSession(session);

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

// todo: move to env
const connectionString = 'mongodb://mongo:27017/hearthstone';

// import './models/user';

export const connectToMongo = () => {
	mongoose.connect(connectionString, options, () => {
		console.log("Connected to MongoDB ", connectionString);
	});
}

export const getMongoSessionStore = () => {
	return new MongoDBStore({
		uri: connectionString,
		collection: 'session',
	} as MongoDBSessionOptions);
};
