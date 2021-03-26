import { Router } from 'express';
import IRoute from '../interfaces/route.interface';
import HomeController from '../controllers/Home.controller';

export default class HomeRoute implements IRoute {
    public readonly path: string;

    public router: Router;

    private homeController: HomeController;

    constructor() {
        this.path = '/';
        this.router = Router();
        this.homeController = new HomeController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // TODO: Add middleware to re-route to signup/login if user is not authenticated
        this.router.get(`${this.path}`, this.homeController.home);
    }
}
