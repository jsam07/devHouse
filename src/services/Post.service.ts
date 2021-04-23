import { logger } from '../utils/logger';
import { Post } from '../interfaces/prisma.models';
import PrismaDatabase from '../database/Prisma.database';
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

    public static async getAllPostsFromFriends(email: string): Promise<Post[]> {
        try {
            // Find posts made by user's friends
            const posts: Post[] | null = await database.post.findMany({
                where: {
                    author: {
                        followers: {
                            some: {
                                email,
                            },
                        },
                    },
                },
                include: {
                    comments: true,
                    reposts: true,
                    postLikedFrom: true,
                },
            });
            logger.debug(posts);
            logger.info(`Returning all friend posts for email: ${email}`);
            return posts;
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('getAllPostsFromFriends');
        }
    }

    public static async deleteUserPostById(id: number): Promise<void> {
        try {
            // Delete comments first, then likes
            await database.comment.deleteMany({ where: { postId: id } });
            await database.post.delete({ where: { id } });
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
            logger.info(`User ${email} commented under post: ${postId}`);
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
            logger.info(`User ${email} created a new post`);
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('createPost');
        }
    }

    public static async createRepost(postId: number, email: string): Promise<void> {
        try {
            const { id } = await database.user.findUnique({ where: { email } });
            const { content, authorId } = await database.post.findUnique({ where: { id: postId } });

            // Restrict author from reposting their own post (db may enforce this too)
            if (authorId !== id) {
                await database.post.create({
                    data: {
                        content,
                        authorId: id,
                        parentPostId: postId,
                    },
                });
            }
            logger.info(`User ${email} reposted post: ${postId}`);
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('createRepost');
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

    public static async likeUserPost(postId: number, email: string): Promise<void> {
        try {
            await database.post.update({
                where: { id: postId },
                data: {
                    postLikedFrom: {
                        connect: [{ email }],
                    },
                },
            });
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('likeUserPost');
        }
    }

    public static async unlikeUserPost(postId: number, email: string): Promise<void> {
        try {
            await database.post.update({
                where: { id: postId },
                data: {
                    postLikedFrom: {
                        disconnect: [{ email }],
                    },
                },
            });
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('unlikeUserPost');
        }
    }
}
