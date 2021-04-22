import { Router, Request, Response } from 'express';

import passport from 'passport';
import IRoute from '../interfaces/route.interface';
import AuthenticationController from '../controllers/Auth.controller';
import UserController from '../controllers/User.controller';
import { logger } from '../utils/logger';

export default class AuthenticationRoute implements IRoute {
    public readonly path: string;

    public router: Router;

    private authController: AuthenticationController;

    private userController: UserController;

    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.authController = new AuthenticationController();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // GETs
        this.router.get(this.getPath('github'), AuthenticationController.handleGetGitHubLogin);
        this.router.get(this.getPath('github/callback'), AuthenticationController.handleGetGitHubCallback);
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
