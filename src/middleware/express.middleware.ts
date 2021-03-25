import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import expressLayouts from 'express-ejs-layouts';

import { logger, stream } from '../utils/logger';
import { CSPDirectives, CSP } from '../config/helmetConfig';

const viewsDir = path.join(__dirname, '..', 'views');
const faviconPath = path.join(__dirname, '..', 'public', 'images', 'favicon', 'secure-icon.png');

const expressMiddleware = (app: Application): void => {
    // TODO: Configure differently if in prod or dev

    logger.info('🔨 Initializing Express Middleware ...');

    app.set('views', viewsDir);
    app.set('view engine', 'ejs');

    app.use(cors());
    app.use(favicon(faviconPath));
    app.use(morgan('tiny', { stream }));

    app.use(helmet({ ...CSP }));
    app.use(helmet.contentSecurityPolicy({ ...CSPDirectives }));

    app.use(compression());
    app.use(express.json());
    // app.use(expressLayouts);
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    logger.info('🚀 Finished Initializing Express Middleware.');
};

export default expressMiddleware;
