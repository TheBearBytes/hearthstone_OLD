import passport from 'passport';
import {initPassportStrategies} from './passport';

const initMiddleware = (server) => {
	initPassportStrategies(passport);
}

export default initMiddleware;
