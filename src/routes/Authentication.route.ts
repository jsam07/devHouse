import { Router } from 'express';

import IRoute from '../interfaces/route.interface';
import AuthenticationController from '../controllers/Auth.controller';

export default class AuthenticationRoute implements IRoute {
    public readonly path: string;

    public readonly router: Router;

    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // GETs
        // this.router.get(this.getPath('github'), AuthenticationController.handleGetGitHubLogin);
        // this.router.get(this.getPath('github/callback'), AuthenticationController.handleGetGitHubCallback);
        this.router.get(this.getPath('register'), AuthenticationController.handleGetRegister);
        this.router.get(this.getPath('login'), AuthenticationController.handleGetLogin);
        this.router.get(this.getPath('logout'), AuthenticationController.handleGetLogout);

        // POSTs
        this.router.post(this.getPath('register'), AuthenticationController.handlePostRegister);
        this.router.post(this.getPath('login'), AuthenticationController.handlePostLogin);
    }

    private getPath(p: string): string {
        return `${this.path}/${p}`;
    }
}
