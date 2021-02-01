import mongoose from 'mongoose';
// import {populate} from './populate';


const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

export const connectToMongo = () => {
	mongoose.connect(process.env.DB_CONNECTION, options, () => {
		console.log("Connected to MongoDB ", process.env.DB_CONNECTION);
	});
}
