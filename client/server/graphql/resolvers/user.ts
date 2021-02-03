import User from '../../db/models/user';
import errorCodes from '../../const/errorCodes';
import jwt from 'jsonwebtoken';
import express from "express";

export const userQueries = {
    loggedUser: async (root, {}, ctx) => {
        return await User.findById(ctx.req.userId);
    },
}

export const userMutations = {
    login: async (root, {input}, ctx) => {
        try {
            const user = await ctx.authenticate(input);

            const accessToken = jwt.sign(
                {userId: user._id, userRole: user.role},
                process.env.JWT_ACCESS_TOKEN_SECRET,
                {expiresIn: '1m'}
            );
            (ctx.res as express.Response).cookie('access-token', accessToken, {
                // expires: new Date(Date.now() + (1000 * 60))
                httpOnly: true,
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
