import PrismaDatabase from '../database/Prisma.database';
import { logger } from '../utils/logger';
import { Post, User } from '../interfaces/prisma.models';
import DatabaseException from '../exceptions/DatabaseException';

const { database } = PrismaDatabase;

export default class PostService {
    public static async getAllPostsForUser(email: string): Promise<Post[]> {
        try {
            const posts: Post[] | null = await database.post.findMany({
                where: { author: { email } },
                include: {
                    comments: true,
                    reposts: true,
                    postLikedFrom: true,
                },
            });
            logger.info(`Returning all posts for user: ${email}`);
            return posts;
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('getAllPostsForUser');
        }
    }

    public static async deleteUserPostById(id: number): Promise<void> {
        try {
            await database.post.delete({
                where: { id },
            });
            logger.info(`Post with id =${id} has been deleted.`);
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('deleteUserPostById');
        }
    }

    public static async getPostByID(id: number): Promise<Post> {
        try {
            const post: Post | null = await database.post.findUnique({
                where: { id },
                include: {
                    comments: true,
                    reposts: true,
                    postLikedFrom: true,
                },
            });
            logger.info(`Returning post with id =${id}.`);
            return post;
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('getPostByID');
        }
    }

    public static async createComment(postId: number, commentText: string, email: string): Promise<void> {
        try {
            const { id } = await database.user.findUnique({ where: { email } });
            await database.comment.create({
                data: {
                    postId,
                    authorId: id,
                    content: commentText,
                },
            });
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('createComment');
        }
    }

    public static async createPost(postText: string, email: string): Promise<void> {
        try {
            const { id } = await database.user.findUnique({ where: { email } });
            await database.post.create({
                data: {
                    content: postText,
                    authorId: id,
                },
            });
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('createPost');
        }
    }

    public static async findAllPostsLike(keyword: string): Promise<Post[]> {
        try {
            const posts: Post[] | null = await database.post.findMany({
                where: {
                    content: { contains: keyword },
                },
            });
            logger.info(`Returning all posts that match keyword: ${keyword}`);
            return posts;
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('findAllPostsLike');
        }
    }
}
