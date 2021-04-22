import { Router } from 'express';
import passport from 'passport';
import IRoute from '../interfaces/route.interface';
import PostController from '../controllers/Post.controller';
import PostsHandler from '../interfaces/postsHandler.interface';

export default class PostRoute implements IRoute {
    public readonly path: string;

    public readonly router: Router;

    constructor() {
        this.path = '/posts';
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.initializeGetRoute(`${this.path}`, PostController.handleGetAllPosts);
        this.initializeGetRoute(this.getPath(':id'), PostController.handleGetPostByID);
        this.initializePostRoute(this.getPath('delete'), PostController.handleDeletePost);
        this.initializePostRoute(this.getPath(':id/comment'), PostController.handleCreateComment);
        this.initializePostRoute(`${this.path}`, PostController.handleCreatePost);
    }

    private initializeGetRoute(path: string, handler: PostsHandler): void {
        this.router.get(
            path,
            passport.authenticate('jwt', { session: false, failureRedirect: '/auth/login' }),
            handler,
        );
    }

    private initializePostRoute(path: string, handler: PostsHandler): void {
        this.router.post(
            path,
            passport.authenticate('jwt', { session: false, failureRedirect: '/auth/login' }),
            handler,
        );
    }

    private getPath(s: string): string {
        return `${this.path}/${s}`;
    }
}
