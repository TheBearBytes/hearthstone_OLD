import passportCustom from 'passport-custom';
import User from '../db/models/user';

const CustomStrategy = passportCustom.Strategy;

export const initPassportStrategies = (passport) => {
	passport.use('custom', new CustomStrategy(
		(req, callback) => {
			// @ts-ignore
			const {email, password} = req;

			User.findOne({email}, (error, user) => {
				if (error) return callback(error);
				if (!user) return callback(null, false);

				user.validatePassword(password, (passwordError, isSuccess) => {
					if (error) return callback(passwordError);
					if (!isSuccess) return callback(null, false);

					return callback(null, user);
				});
			});
		}
	));
}
