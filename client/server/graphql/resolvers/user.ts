import User from '../../db/models/user';
import errorCodes from '../../const/errorCodes';

export const userMutations = {
	signIn: async (root, {input}, ctx) => {
		try {
			const user = await ctx.authenticate(input);
			console.log("Sign in user ", user);
			return user;
		} catch (e) {
			console.log("Sign in user error ", e);
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
			throw new Error(errorCodes.LOGIN_INCORRECT_PASSWORD_CONFIRMATION)
		}
	},
}
