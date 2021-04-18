/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import PostService from '../services/Post.service';

export default class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public handleGetAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).send('Got to getAllPosts GET route');
        } catch (error) {
            next(error);
        }
    };

    public handleGetPostByID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).send('Got to GetPostByID GET route');
        } catch (error) {
            next(error);
        }
    };

    public handleDeletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).send('Got to GetPostByID GET route');
        } catch (error) {
            next(error);
        }
    };

    public handleCreateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).send('Got createComment POST route');
        } catch (error) {
            next(error);
        }
    };

    public handleCreatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).send('Got createPost POST route');
        } catch (error) {
            next(error);
        }
    };
}
