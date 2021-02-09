import * as mongoose from 'mongoose';
import {userProvider, userRole} from "../../../consts/User";

const Schema = mongoose.Schema;

const oauthUserSchema = new Schema({
	providerId: {
		type: String,
		required: true,
	},
	provider: {
		enum: [userProvider.GOOGLE, userProvider.FACEBOOK],
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	email: {
		type: String,
		// required: true,
	},
	username: {
		type: String,
	},
	role: {
		enum: [userRole.ADMIN, userRole.USER],
		type: String,
		default: userRole.USER,
	},
}, {
	timestamps: true,
});

export default mongoose.model('OAuthUser', oauthUserSchema);
