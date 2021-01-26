import session, {SessionOptions} from 'express-session';
import passport from 'passport';
import {getMongoSessionStore} from '../db/mongo';
import {initPassportStrategies} from './passport';

const initMiddleware = (server) => {
	// todo: move secret to .env
	const sessionOptions: SessionOptions = {
		name: 'hs-session',
		secret: 'SOME_SECRET_!@#',
		cookie: {
			maxAge: 2 * 60 * 60 * 1000 // 2h
		},
		resave: false,
		saveUninitialized: true,
		store: getMongoSessionStore(),
	}

	initPassportStrategies(passport);
	server.use(session(sessionOptions));
}

export default initMiddleware;
