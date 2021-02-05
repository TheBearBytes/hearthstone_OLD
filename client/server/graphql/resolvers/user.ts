import jwt from 'jsonwebtoken';
import {Response} from "express";
import User from '../../db/models/user';
import errorCodes from '../../const/errorCodes';
import {IJwtUser} from "../../types";

export const userQueries = {
    loggedUser: async (root, {}, ctx) => {
        return await User.findById(ctx.req.userId);
    },
}

export const userMutations = {
    login: async (root, {input}, ctx) => {
        try {
            // todo: move auth fn to some controller instead of context
            // todo: set access-token to 15 min after test
            const user = await ctx.authenticate(input);
            const {res}: {res: Response} = ctx;

            const jwtUser: IJwtUser = {userId: user._id, userRole: user.role};

            const jwtOptions = {expiresIn: '1m'};
            const cookieExpiresDate = new Date(Date.now() + (1000 * 60));

            // access-token cookie is http-only and keeps user information
            // login-token is not http-only - user can destroy this cookie to logout
            // both cookies have to be valid to authenticate user
            const accessToken = jwt.sign(jwtUser, process.env.JWT_ACCESS_TOKEN_SECRET, jwtOptions);
            const loginToken = jwt.sign({}, process.env.JWT_LOGIN_TOKEN_SECRET, jwtOptions);

            res.cookie('access-token', accessToken, {
                expires: cookieExpiresDate,
                httpOnly: true,
            });

            res.cookie('login-token', loginToken, {
                expires: cookieExpiresDate,
            });

            return true;
        } catch (e) {
            return e;
        }
    },
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
