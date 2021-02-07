import User from "../db/models/user";
import OAuthUser from "../db/models/oauthUser";
import {IJwtUser} from "../types";
import jwt from "jsonwebtoken";
import authController from "../controllers/authController";

const apiRoutes = (server) => {
    server.get(
        "/api/loggedUser",
        async (req, res) => {
            // todo: any
            let user: any = await User.findById(req.userId);

            if (!user) user = await OAuthUser.findById(req.userId);

            res.send({loggedUser: user ? user.toJSON() : null});
        }
    );

    server.post(
        "/api/login",
        async (req, res) => {
            try {
                // todo: move auth fn to some controller instead of context
                // todo: set access-token to 15 min after test
                const user: any = await authController.authenticateUser({email: req.body.email, password: req.body.password});

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

                res.send({login: true});
            } catch (e) {
                return res.status(400).json({ error: e.toString() });
            }
        }
    );
}

export default apiRoutes;
