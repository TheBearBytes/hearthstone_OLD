import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import next from 'next';
import apolloServer from './graphql';
import {connectToMongo} from './db/connect';
import {initPassportStrategies} from "./middlewares/passport";
import authMiddleware from "./middlewares/authMiddleware";
import authRoutes from "./routes/authRoutes";
import apiRoutes from "./routes/apiRoutes";
import bodyParser from "body-parser";

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

connectToMongo();

app.prepare().then(() => {
    const server = express();

    // support parsing of application/json type post data
    server.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    server.use(bodyParser.urlencoded({ extended: true }));

    initPassportStrategies();

    authMiddleware(server);

    authRoutes(server);
    apiRoutes(server);

    apolloServer.applyMiddleware({app: server})

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    })
});
