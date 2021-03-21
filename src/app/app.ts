import morgan from 'morgan';
import express from 'express';
import { logger, stream } from '../utils/logger';
import IRoute from '../interfaces/route.interface';
import { PORT, ENVIRONMENT, SESSION_SECRET } from '../utils/secrets';

export default class App {
    private readonly _env: string;

    private _app: express.Application;

    private readonly _port: string | number;

    constructor(routes: IRoute[]) {
        this._port = PORT;
        this._env = ENVIRONMENT;
        this._app = express();

        // this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        // this.initializeErrorHandling();
    }

    public get env(): string {
        return this._env;
    }

    public get port(): string | number {
        return this._port;
    }

    public start(): void {
        this._app.listen(this.port, () => {
            logger.info(`Application Started. Listening on port: ${this._port}`);
        });
    }

    // private initializeDatabaseConnection() {
    //   // TODO
    // }

    private initializeMiddleware() {
        logger.info('Initializing Middleware ...');
        this._app.use(morgan('tiny', { stream }));
    }

    private initializeRoutes(routes: IRoute[]) {
        routes.forEach((route: IRoute) => {
            this._app.use('/', route.router);
        });
    }

    // private initializeErrorHandling() {}
}
