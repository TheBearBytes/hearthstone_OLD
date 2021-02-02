import * as mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);


// todo: avatar as uploaded img
const userSchema = new Schema({
	avatar: {
		type: String,
		maxlength: [32, 'Maximum password length is 32 characters!'],
	},
	email: {
		type: String,
		required: 'Email is required!',
		lowercase: true,
		index: true,
		unique: true,
		maxlength: [32, 'Maximum password length is 32 characters!'],
		// @ts-ignore
		match: [emailRegExp]
	},
	username: {
		type: String,
		maxlength: [32, 'Maximum password length is 32 characters!'],
	},
	// todo: add salt to stronger auth?
	password: {
		type: String,
		required: true,
		minlength: [6, 'Minimum password length is 6 characters!'],
		maxlength: [32, 'Maximum password length is 32 characters!'],
	},
	role: {
		enum: ['USER', 'ADMIN'],
		type: String,
		required: true,
		default: 'USER'
	},
}, {
	timestamps: true,
});

userSchema.pre('save', function (next) {
	const user = this;

	bcrypt.genSalt(10, (err, salt) => {
		if (err) next(err);

		// @ts-ignore
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) next(err);

			// @ts-ignore
			user.password = hash;
			next();
		});
	});
});

export default mongoose.model('User', userSchema);
