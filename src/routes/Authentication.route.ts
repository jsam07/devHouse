import { Router } from 'express';
import IRoute from '../interfaces/route.interface';
import AuthenticationController from '../controllers/Auth.controller';

export default class AuthenticationRoute implements IRoute {
    public readonly path: string;

    public router: Router;

    private authenticationController: AuthenticationController;

    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.authenticationController = new AuthenticationController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/signup', this.authenticationController.signUp);
        this.router.post('/login', this.authenticationController.login);
        this.router.post('/logout', this.authenticationController.logout);
    }
}
