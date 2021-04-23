import { Router } from 'express';
import IRoute from '../interfaces/route.interface';
import HomeController from '../controllers/Home.controller';

export default class HomeRoute implements IRoute {
    public readonly path: string;

    public readonly router: Router;

    constructor() {
        this.path = '/';
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, HomeController.home);
        this.router.get(`${this.path}demo`, HomeController.demo);
    }
}
