import passport from "passport";
import OAuthUrls from "../../consts/OAuthUrls";
import setCookies from "./utils/setCookies";

const passportAuthCallback = (req, res) => {
    const {user} = req;
    setCookies(user, res);
    res.redirect(OAuthUrls.SUCCESS_CALLBACK);
}

const passportAuthOptions = {
    failureRedirect: "/login",
    session: false,
};

const authRoutes = (server) => {
    server.get(
        OAuthUrls.GOOGLE_LOGIN,
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    server.get(
        OAuthUrls.GOOGLE_CALLBACK,
        passport.authenticate("google", passportAuthOptions),
        passportAuthCallback
    );

    server.get(
        OAuthUrls.FACEBOOK_LOGIN,
        passport.authenticate("facebook", {
            scope: ["email"],
        })
    );

    server.get(
        OAuthUrls.FACEBOOK_CALLBACK,
        passport.authenticate("facebook", passportAuthOptions),
        passportAuthCallback
    );
}

export default authRoutes;
