import { Router } from 'express';

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
        this.router.get(this.getPath('register'), this.authController.handleGetRegister);
        this.router.get(this.getPath('login'), this.authController.handleGetLogin);
        this.router.get(this.getPath('logout'), this.authController.handleGetLogout);

        // POSTs
        this.router.post(this.getPath('register'), this.authController.handlePostRegister);
        this.router.post(this.getPath('login'), this.authController.handlePostLogin);
    }

    private getPath(p: string): string {
        return `${this.path}/${p}`;
    }
}
