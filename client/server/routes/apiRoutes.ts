import User from "../db/models/user";
import OAuthUser from "../db/models/oauthUser";
import authController from "../controllers/authController";
import ErrorCodes from "../../consts/ErrorCodes";
import setCookies from "./utils/setCookies";

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

    // todo: check if user is not logged in
    server.post(
        "/api/login",
        async (req, res) => {
            try {
                const user: any = await authController.authenticateUser({email: req.body.email, password: req.body.password});
                setCookies(user, res);
                res.send({login: true});
            } catch (e) {
                return res.status(400).json({ error: e.toString() });
            }
        }
    );

    // todo: check if user is not logged in
    server.post("/api/register",
        async (req, res) => {
        const {password, passwordConfirmation} = req.body;
            if (password === passwordConfirmation) {
                try {
                    await User.create(req.body);
                    res.send({register: true});
                } catch (e) {
                    if (e.code === 11000) return res.status(400).json({ error: ErrorCodes.REGISTER_EMAIL_EXISTS_ERROR });
                    return res.status(400).json({ error: ErrorCodes.VALIDATION_ERROR });
                }
            } else {
                return res.status(400).json({ error: ErrorCodes.LOGIN_INCORRECT_PASSWORD_CONFIRMATION });
            }
        }
    );
}

export default apiRoutes;
