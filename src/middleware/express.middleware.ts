import path from 'path';
import cors from 'cors';
import csurf from 'csurf';
import morgan from 'morgan';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import expressLayouts from 'express-ejs-layouts';

import { logger, stream } from '../utils/logger';
import { CSPDirectives, CSP } from '../config/Helment.config';

// const csrfProtection = csurf({ cookie: true });

const viewsDir = path.join(__dirname, '..', 'views');
const publicDir = path.join(__dirname, '..', 'public');
const faviconPath = path.join(publicDir, 'images', 'favicon', 'secure-icon.png');

const expressMiddleware = (app: Application): void => {
    // TODO: Configure differently if in prod or dev

    logger.info('🔨 Initializing Express Middleware ...');

    app.set('views', viewsDir);
    app.set('view engine', 'ejs');
    app.use(express.static(publicDir));

    app.use(cors());
    app.use(favicon(faviconPath));
    app.use(morgan('tiny', { stream }));

    // TODO: Uncomment
    // app.use(helmet({ ...CSP }));
    // app.use(helmet.contentSecurityPolicy({ ...CSPDirectives }));

    app.use(compression());
    app.use(express.json());
    // app.use(expressLayouts);
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    // app.use(bodyParser.json());
    // app.use('/', csrfProtection);

    logger.info('🚀 Finished Initializing Express Middleware.');
};

export default expressMiddleware;
