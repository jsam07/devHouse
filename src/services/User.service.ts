import bcrypt from 'bcrypt';

import { logger } from '../utils/logger';
import { saltRounds } from '../utils/secrets';
import { User } from '../interfaces/prisma.models';
import PrismaDatabase from '../database/Prisma.database';
import DatabaseException from '../exceptions/DatabaseException';

const { database } = PrismaDatabase;

export default class UserService {
    public static async findAllUsersLike(keyword: string): Promise<User[]> {
        try {
            const searchCriteria = { contains: keyword };
            const users: User[] | null = await database.user.findMany({
                where: {
                    OR: [
                        { email: searchCriteria },
                        { firstName: searchCriteria },
                        { lastName: searchCriteria },
                        { userName: searchCriteria },
                    ],
                },
                include: {
                    followers: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            });
            logger.info(`Returning all users that match keyword: ${keyword}`);
            return users;
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('findAllUsersLike');
        }
    }

    public static async followUser(userToFollow: number, email: string): Promise<void> {
        try {
            await database.user.update({
                where: {
                    email,
                },
                data: {
                    friends: {
                        connect: [{ id: userToFollow }],
                    },
                },
            });
            logger.info(`User ${email} followed user: ${userToFollow}`);
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('followUser');
        }
    }

    public static async unFollowUser(userToUnfollow: number, email: string): Promise<void> {
        try {
            await database.user.update({
                where: {
                    email,
                },
                data: {
                    friends: {
                        disconnect: [{ id: userToUnfollow }],
                    },
                },
            });
            logger.info(`User ${email} unfollowed user: ${userToUnfollow}`);
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('followUser');
        }
    }

    public static async createUser(
        userName: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ): Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await database.user.create({
                data: {
                    email,
                    userName,
                    firstName,
                    lastName,
                    hashedPassword,
                },
            });
            logger.info(`Created user with email: ${email}`);
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('createUser');
        }
    }

    public static async findUserByEmail(email: string): Promise<User> {
        try {
            const user: User = await database.user.findUnique({
                where: { email },
            });
            logger.info(`Found user with email: ${email}`);
            return user;
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('findUserByEmail');
        }
    }
}
