/* eslint-disable class-methods-use-this,@typescript-eslint/no-unused-vars */
import User from '../interfaces/user.interface';
import Database from '../interfaces/database.interface';
import databasemock from '../database/db/database_1615571003434.json';
import IUserService from '../interfaces/user.service.interface';
import DoneFunction from '../interfaces/done.function.interface';
import { logger } from '../utils/logger';

import PrismaDatabase from '../database/Prisma.database';

const { database } = PrismaDatabase;

export default class UserService {
    readonly _db: any;

    constructor() {
        this._db = databasemock;
    }

    // TODO: Move UserValidation to it's own middleware
    public async validateUser(user: User, password: string, done: DoneFunction): Promise<void> {
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
        return user.password === password;
    }

    public async addUser(userName: string, email: string, password: string): Promise<void> {
        const user: User = { email, userName, password };
        this._db.users.push(user);
        this._db.users.forEach(_user => {
            logger.debug(_user.email);
        });

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

    public async createUser(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async findUserByEmail(email: string): Promise<User> {
        // TODO: Connect to actual database
        // TODO: Doing this for testing (REMOVE)
        // return this._db.users.find(user => user.email === email);
        return { email };
    }

    public async findUserByID(id: string): Promise<User> {
        // TODO: Connect to actual database
        return this._db.users.find(user => user.id === id);
    }

    public async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
}
