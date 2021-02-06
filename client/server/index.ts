import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import next from 'next';
import apolloServer from './graphql';
import {connectToMongo} from './db/connect';
import {initPassportStrategies} from "./middlewares/passport";
import authMiddleware from "./middlewares/authMiddleware";
import passport from "passport";
import {IJwtUser} from "./types";
import jwt from "jsonwebtoken";

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

connectToMongo();

app.prepare().then(() => {
    const server = express();

    initPassportStrategies();

    // todo: move to route file
    server.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
		})
    );

    server.get(
        "/auth/google/callback",
        passport.authenticate(
            "google",
            {
                failureRedirect: "/login",
                session: false,
            }),
        (req, res) => {
            const {user} = req;
            // todo: duplicated token logic
            // @ts-ignore
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

            res.redirect("/auth/callback");
        }
    );
    // todo: EO move to route file

    authMiddleware(server);

    apolloServer.applyMiddleware({app: server})

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    })
});
