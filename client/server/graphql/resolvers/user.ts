import User from '../../db/models/user';
import errorCodes from '../../const/errorCodes';
import jwt from 'jsonwebtoken';
import express from "express";

export const userMutations = {
    login: async (root, {input}, ctx) => {
        try {
            const user = await ctx.authenticate(input);

            // todo: move
            const accessToken = jwt.sign(
                {userId: user._id, userRole: user.role},
                process.env.JWT_ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
            );
            (ctx.res as express.Response).cookie('access-token', accessToken, {
                expires: new Date(Date.now() + (1000 * 60))
            });

            return user;
        } catch (e) {
            return e;
        }
    },
    register: async (root, {input}) => {
        if (input.password === input.passwordConfirmation) {
            return await User.create(input);
        } else {
            throw new Error(errorCodes.LOGIN_INCORRECT_PASSWORD_CONFIRMATION)
        }
    },
}
