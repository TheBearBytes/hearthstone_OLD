import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const oauthUserSchema = new Schema({
	googleId: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
	},
	role: {
		enum: ['USER', 'ADMIN'],
		type: String,
		default: 'USER',
	},
}, {
	timestamps: true,
});

export default mongoose.model('OAuthUser', oauthUserSchema);
