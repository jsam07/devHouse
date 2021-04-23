import { Router } from 'express';
import passport from 'passport';
import IRoute from '../interfaces/route.interface';
import SearchController from '../controllers/Search.controller';

export default class SearchRoute implements IRoute {
    public readonly path: string;

    public readonly router: Router;

    constructor() {
        this.path = '/search';
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            this.path,
            passport.authenticate('jwt', { session: false, failureRedirect: '/auth/login' }),
            SearchController.handleSearchForPostsAndUsers,
        );
    }
}
