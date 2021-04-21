import { Router } from 'express';
import passport from 'passport';
import IRoute from '../interfaces/route.interface';
import PostController from '../controllers/Post.controller';
import PostsHandler from '../interfaces/postsHandler.interface';

export default class PostRoute implements IRoute {
    public readonly path: string;

    public router: Router;

    private postController: PostController;

    constructor() {
        this.path = '/posts';
        this.router = Router();
        this.postController = new PostController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.initializeGetRoute(`${this.path}`, this.postController.handleGetAllPosts);
        this.initializeGetRoute(this.getPath(':id'), this.postController.handleGetPostByID);
        this.initializePostRoute(this.getPath('delete'), this.postController.handleDeletePost);
        this.initializePostRoute(this.getPath(':id/comment'), this.postController.handleCreateComment);
        this.initializePostRoute(`${this.path}`, this.postController.handleCreatePost);
    }

    private initializeGetRoute(path: string, handler: PostsHandler): void {
        this.router.get(path, passport.authenticate('jwt', { session: false }), handler);
    }

    private initializePostRoute(path: string, handler: PostsHandler): void {
        this.router.post(path, passport.authenticate('jwt', { session: false }), handler);
    }

    private getPath(s: string): string {
        return `${this.path}/${s}`;
    }
}
