import mongoose from 'mongoose';
// import {populate} from './populate';

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

const connectionString = 'mongodb://mongo:27017/hearthstone';

const connectToMongo = () => {
	mongoose.connect(connectionString, options, () => {
		console.log("Connected to MongoDB ", connectionString);

		// populate();
	});
}

export default connectToMongo;
