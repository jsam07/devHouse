import { Router } from 'express';
import IRoute from '../interfaces/route.interface';
import AuthenticationController from '../controllers/Auth.controller';

export default class AuthenticationRoute implements IRoute {
    public readonly path: string;

    public router: Router;

    private authController: AuthenticationController;

    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.authController = new AuthenticationController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // TODO: Add middleware
        this.router.get(this.getPath('register'), this.authController.handleGetRegister);
        this.router.get(this.getPath('login'), this.authController.handleGetLogin);
        this.router.get(this.getPath('logout'), this.authController.handleGetLogout);
        this.router.post(this.getPath('register'), this.authController.handlePostRegister);
        this.router.post(this.getPath('login'), this.authController.handlePostLogin);
        this.router.post(this.getPath('logout'), this.authController.handlePostLogout);
    }

    private getPath(s: string): string {
        return `${this.path}/${s}`;
    }
}
