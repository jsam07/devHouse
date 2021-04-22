import { Post, User } from '../interfaces/prisma.models';
import DoneFunction from '../interfaces/done.function.interface';
import { logger } from '../utils/logger';

import PrismaDatabase from '../database/Prisma.database';

const { database } = PrismaDatabase;

export default class UserService {
    // TODO: Move UserValidation to it's own middleware
    public static async validateUser(user: User, password: string, done: DoneFunction): Promise<void> {
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        const validate = await UserService.isValidPassword(user, password);

        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
    }

    public static async isValidPassword(user: User, password: string): Promise<boolean> {
        // TODO: Use Bcrypt to validate salted password
        return true;
    }

    public static async findAllUsersLike(keyword: string): Promise<User[]> {
        throw new Error('not yet implemented');
    }

    public static async addUser(userName: string, email: string, password: string): Promise<void> {
        // const user: User = { email, userName, hashedPassword: password };

        async function main() {
            try {
                await database.user.create({
                    data: {
                        userName,
                        email,
                        hashedPassword: password,
                    },
                });

                // const allUsers = await database.user.findMany({
                //     include: {
                //         posts: true,
                //     },
                // });
                // logger.debug(JSON.stringify(allUsers));
            } catch (error) {
                logger.error(error);
            }
        }

        main().finally(async () => {
            await database.$disconnect();
        });
    }

    public static async createUser(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public static async findUserByEmail(email: string): Promise<unknown> {
        // TODO: Connect to actual database
        // TODO: Doing this for testing (REMOVE)
        // return this._db.users.find(user => user.email === email);
        return { email };
    }

    public static async findUserByID(id: string): Promise<unknown> {
        // TODO: Connect to actual database
        // return this._db.users.find(user => user.id === id);
        return { email: 'email' };
    }

    public static async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
}
