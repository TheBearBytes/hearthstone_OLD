import mongoose from 'mongoose';

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

export const connectToMongo = (callback?) => {
	mongoose.connect(process.env.DB_CONNECTION, options, () => {
		console.log("Connected to MongoDB ", process.env.DB_CONNECTION);
		callback();
	});
}
