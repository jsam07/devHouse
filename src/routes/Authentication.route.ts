import { Router } from 'express';
import IRoute from '../interfaces/route.interface';
import AuthenticationController from '../controllers/Auth.controller';

export default class AuthenticationRoute implements IRoute {
    public readonly path: string;

    public router: Router;

    private controller: AuthenticationController;

    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.controller = new AuthenticationController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.getPath('register'), this.controller.handleGetRegister);
        this.router.get(this.getPath('login'), this.controller.handleGetLogin);
        this.router.get(this.getPath('logout'), this.controller.handleGetLogout);
        this.router.post(this.getPath('register'), this.controller.handlePostRegister);
        this.router.post(this.getPath('login'), this.controller.handlePostLogin);
        this.router.post(this.getPath('logout'), this.controller.handlePostLogout);
    }

    private getPath(s: string): string {
        return `${this.path}/${s}`;
    }
}
