import User from "../db/models/user";
import OAuthUser from "../db/models/oauthUser";

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
}

export default apiRoutes;
