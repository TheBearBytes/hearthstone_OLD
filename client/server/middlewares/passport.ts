import passport from 'passport';
import passportCustom from 'passport-custom';
import googleStrategy from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';
import User from '../db/models/user';
import OAuthUser from '../db/models/oauthUser';
import bcrypt from "bcryptjs";
import ErrorCodes from "../../consts/ErrorCodes";
import OAuthUrls from "../../consts/OAuthUrls";
import {userProvider} from "../../consts/User";

const CustomStrategy = passportCustom.Strategy;
const GoogleStrategy = googleStrategy.Strategy;
const FacebookStrategy = facebookStrategy.Strategy;

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
                    if (!isSuccess) return callback(ErrorCodes.LOGIN_INCORRECT_CREDENTIALS);

                    return callback(null, user);
                })
            });
        }
    ));

    passport.use('google', new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: OAuthUrls.GOOGLE_CALLBACK,
        },
        function(accessToken, refreshToken, profile, callback) {
            OAuthUser.findOne({ provider: userProvider.GOOGLE, providerId: profile.id }, async function (error, user) {
                if (error) return callback(error);

                if (!user) {
                    const createdUser = await OAuthUser.create({
                        providerId: profile.id,
                        avatar: profile.photos[0] && profile.photos[0].value,
                        email: profile.emails[0] && profile.emails[0].value,
                        username: profile.displayName,
                        provider: userProvider.GOOGLE,
                    });

                    return callback(null, createdUser);
                }

                return callback(null, user);
            });
        }
    ));

    passport.use('facebook', new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: OAuthUrls.FACEBOOK_CALLBACK,
            profileFields: ['id', 'emails', 'name'],
        },
        function(accessToken, refreshToken, profile, callback) {
            OAuthUser.findOne({ provider: userProvider.FACEBOOK, providerId: profile.id }, async function (error, user) {
                if (error) return callback(error);

                if (!user) {
                    const createdUser = await OAuthUser.create({
                        providerId: profile.id,
                        // avatar: `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`,
                        email: profile.emails[0] && profile.emails[0].value,
                        username: profile.displayName,
                        provider: userProvider.FACEBOOK,
                    });

                    return callback(null, createdUser);
                }

                return callback(null, user);
            });
        }
    ));
}
