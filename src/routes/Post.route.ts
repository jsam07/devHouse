import { Router } from 'express';
import IRoute from '../interfaces/route.interface';
import PostController from '../controllers/Post.controller';

export default class PostRoute implements IRoute {
    public readonly path: string;

    public router: Router;

    private postController: PostController;

    constructor() {
        this.path = '/post';
        this.router = Router();
        this.postController = new PostController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.postController.handleGetAllPosts);
        this.router.get(this.getPath(':id'), this.postController.handleGetPostByID);
        this.router.get(this.getPath(':id/delete'), this.postController.handleDeletePost);
        this.router.post(this.getPath(':id/comment'), this.postController.handleCreateComment);
        this.router.post(`${this.path}`, this.postController.handleCreatePost);
    }

    private getPath(s: string): string {
        return `${this.path}/${s}`;
    }
}
