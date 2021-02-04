import passport from 'passport';
import passportCustom from 'passport-custom';
import User from '../db/models/user';
import bcrypt from "bcryptjs";
import errorCodes from "../const/errorCodes";

const CustomStrategy = passportCustom.Strategy;

export const initPassportStrategies = () => {
    passport.use('custom', new CustomStrategy(
        (req, callback) => {
            // @ts-ignore
            const {email, password} = req;

            User.findOne({email}, (error, user) => {
                if (error) return callback(error);
                if (!user) return callback(null, false);

                bcrypt.compare(password, user.password, function (error, isSuccess) {
                    if (error) return callback(error);
                    if (!isSuccess) return callback(errorCodes.LOGIN_INCORRECT_CREDENTIALS);

                    return callback(null, user);
                })
            });
        }
    ));
}
