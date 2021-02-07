import User from '../../db/models/user';
import errorCodes from '../../const/errorCodes';

export const userMutations = {
    register: async (root, {input}) => {
        if (input.password === input.passwordConfirmation) {
            try {
                await User.create(input);
                return true;
            } catch (e) {
                if (e.code === 11000) throw new Error(errorCodes.REGISTER_EMAIL_EXISTS_ERROR);
                throw new Error(errorCodes.VALIDATION_ERROR);
            }
        } else {
            throw new Error(errorCodes.LOGIN_INCORRECT_PASSWORD_CONFIRMATION);
        }
    },
}
