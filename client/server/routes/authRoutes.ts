import passport from "passport";
import {IJwtUser} from "../types";
import jwt from "jsonwebtoken";
import OAuthUrls from "../../consts/OAuthUrls";

const authRoutes = (server) => {
    server.get(
        OAuthUrls.GOOGLE_LOGIN,
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    server.get(
        OAuthUrls.GOOGLE_CALLBACK,
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

            res.redirect(OAuthUrls.SUCCESS_CALLBACK);
        }
    );

    server.get(
        OAuthUrls.FACEBOOK_LOGIN,
        passport.authenticate("facebook", {
            scope: ["email"],
        })
    );

    server.get(
        OAuthUrls.FACEBOOK_CALLBACK,
        passport.authenticate(
            "facebook",
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

            res.redirect(OAuthUrls.SUCCESS_CALLBACK);
        }
    );
}

export default authRoutes;
