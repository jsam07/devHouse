import { Response, NextFunction } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import PostService from '../services/Post.service';
import User from '../interfaces/user.interface';
import { Post } from '../interfaces/prisma.models';
import { logger } from '../utils/logger';
import UserService from '../services/User.service';

export default class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public static handleGetAllPosts = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.user) {
                return res.redirect('/auth/login');
            }
            const { email }: User = req.user;

            const adminPosts: Post[] = await PostService.getAllPostsForUser(email);
            const friendsPosts: Post[] = await PostService.getAllPostsFromFriends(email);
            const posts = { adminPosts, friendsPosts };
            logger.debug(`Friends Posts: ${JSON.stringify(friendsPosts, null, 4)}`);

            return res.render('posts', { posts });
        } catch (error) {
            return next(error);
        }
    };

    public static handleGetPostByID = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.user) {
                return res.redirect('/auth/login');
            }
            const { id } = req.params;

            const post: Post = await PostService.getPostByID(parseInt(id, 10));
            return res.render('post', { post });
        } catch (error) {
            return next(error);
        }
    };

    public static handleDeletePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
                const { email }: User = req.user;
                const { postToDelete: postId } = req.body;

                await PostService.deleteUserPostById(parseInt(postId, 10));
                // const posts: Post[] = await PostService.getAllPostsForUser(email);

                // res.render('posts', { posts });
                res.redirect('/posts');
            }
        } catch (error) {
            next(error);
        }
    };

    public static handleCreateComment = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
                const { email }: User = req.user;
                const { commentText } = req.body;
                const { id: postId } = req.params;

                await PostService.createComment(parseInt(postId, 10), commentText, email);
                const post: Post = await PostService.getPostByID(parseInt(postId, 10));

                res.render('post', { post });
            }
        } catch (error) {
            next(error);
        }
    };

    public static handleCreatePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
                const { email }: User = req.user;
                const { postText } = req.body;

                await PostService.createPost(postText, email);
                // const posts: Post[] = await PostService.getAllPostsForUser(email);
                //
                // return res.render('posts', { posts });

                res.redirect('/posts');
            }
        } catch (error) {
            next(error);
        }
    };

    public static handleLikePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
            }
        } catch (error) {
            next(error);
        }
    };

    public static handleUnlikePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
            }
        } catch (error) {
            next(error);
        }
    };
}
