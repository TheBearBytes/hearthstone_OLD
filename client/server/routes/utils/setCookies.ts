import {IJwtUser} from "../../types";
import jwt from "jsonwebtoken";

const setCookies = (user, res) => {
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
}

export default setCookies;
