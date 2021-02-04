import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";

const authMiddleware = (app) => {
	app.use(cookieParser());

	app.use((req, res, next) => {
		const accessToken = req.cookies['access-token'];
		const loginToken = req.cookies['login-token'];

		try {
			// todo: refresh-token in the future
			// todo: same logic during login
			const verifyAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET) as any;
			jwt.verify(loginToken, process.env.JWT_LOGIN_TOKEN_SECRET) as any;

			req.userId = verifyAccessToken.userId;
			req.userRole = verifyAccessToken.userRole;
		} catch {}

		next();
	})
}

export default authMiddleware;
