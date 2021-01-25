import User from '../../db/models/user';

export const userMutations = {
	signIn: async (root, {input}, ctx) => {
		ctx.authenticate(input);
		console.log(input)
		return 'signIn mutation';
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
