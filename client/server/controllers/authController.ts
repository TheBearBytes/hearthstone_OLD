import passport from "passport";
import ErrorCodes from "../../consts/ErrorCodes";

const authController = {
    authenticateUser: (options) => {
        return new Promise((resolve, reject) => {
            passport.authenticate('custom', options, (err, user) => {
                if (err) return reject(new Error(err));
                if (user) return resolve(user);

                return reject(new Error(ErrorCodes.LOGIN_INCORRECT_CREDENTIALS))
            })(options);
        });
    }
}

export default authController;
