import express, { Application } from 'express';
import { logger } from '../utils/logger';
import IRoute from '../interfaces/route.interface';
import { PORT, ENVIRONMENT } from '../utils/secrets';
import errorMiddleware from '../middleware/error.middleware';
import expressMiddleware from '../middleware/express.middleware';
import passportMiddleware from '../middleware/passport.middleware';

export default class App {
    private readonly _env: string;

    private readonly _app: Application;

    private readonly _port: string | number;

    constructor(routes: IRoute[]) {
        this._port = PORT;
        this._env = ENVIRONMENT;
        this._app = express();

        // this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public get env(): string {
        return this._env;
    }

    public get port(): string | number {
        return this._port;
    }

    public listen(): void {
        this._app.listen(this.port, () => {
            logger.info(`🚀 Application Started; Listening on port: ${this._port}`);
        });
    }

    // private initializeDatabaseConnection() {
    //   // TODO
    // }

    private initializeMiddleware(): void {
        logger.info('🔨 Initializing Middleware ...');
        expressMiddleware(this._app);
        passportMiddleware(this._app);
        logger.info('🚀 Finished Initializing All Middleware.');
    }

    private initializeErrorHandling(): void {
        logger.info('🔨 Initializing Error Handling Middleware ...');
        this._app.use(errorMiddleware);
        logger.info('🚀 Finished Initializing Error Handling Middleware.');
    }

    private initializeRoutes(routes: IRoute[]) {
        logger.info('🔨 Initializing Routes ...');
        routes.forEach((route: IRoute) => {
            this._app.use('/', route.router);
        });
        logger.info('🚀 Finished Initializing Routes.');
    }
}
