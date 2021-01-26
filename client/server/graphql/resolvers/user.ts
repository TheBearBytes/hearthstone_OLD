import User from '../../db/models/user';

export const userMutations = {
	signIn: async (root, {input}, ctx) => {
		try {
			const user = await ctx.authenticate(input);
			console.log("Sign in user END OF CYCLE", user);
			return user;
		} catch (e) {
			console.log("Sign in user error END OF CYCLE", e);
			return e;
		}
	},
	signOut: async (root, args) => {
		return 'signOut mutation';
	},
	register: async (root, {input}) => {
		if (input.password === input.passwordConfirmation) {
			return await User.create(input);
		} else {
			// todo: create error codes
			throw new Error('Password confirmation is not correct!')
		}
	},
}
