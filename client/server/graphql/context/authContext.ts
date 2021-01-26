import passport from 'passport';
import errorCodes from '../../const/errorCodes';

const authenticateUser = (options) => {
	return new Promise((resolve, reject) => {
		passport.authenticate('custom', options, (err, user) => {
			if (err) return reject(new Error(err));
			if (user) return resolve(user);

			return reject(new Error(errorCodes.LOGIN_INCORRECT_CREDENTIALS))
		})(options);
	});
}

const authContext = () => ({
	authenticate: (options) => authenticateUser(options)
});

export default authContext;
