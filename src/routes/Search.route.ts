import { Router } from 'express';
import passport from 'passport';
import IRoute from '../interfaces/route.interface';
import PostController from '../controllers/Post.controller';
import PostsHandler from '../interfaces/postsHandler.interface';
import SearchController from '../controllers/Search.controller';

export default class SearchRoute implements IRoute {
    public readonly path: string;

    public router: Router;

    constructor() {
        this.path = '/search';
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            this.getPath('query'),
            passport.authenticate('jwt', { session: false }),
            SearchController.searchForPostsAndUsers,
        );
    }

    private getPath(s: string): string {
        return `${this.path}/${s}`;
    }
}
