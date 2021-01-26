import passport from 'passport';

const authenticateUser = (options) => {
	return new Promise((resolve, reject) => {
		passport.authenticate('custom', options, (err, user) => {
			if (err) return reject(new Error(err));
			if (user) return resolve(user);

			return reject(new Error('User not found.'))
		})(options);
	});
}

const authContext = () => ({
	authenticate: (options) => authenticateUser(options)
});

export default authContext;
