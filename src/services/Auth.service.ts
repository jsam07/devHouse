/* eslint-disable class-methods-use-this,@typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';

import { logger } from '../utils/logger';
import { User } from '../interfaces/prisma.models';
import PrismaDatabase from '../database/Prisma.database';
import DatabaseException from '../exceptions/DatabaseException';

const { database } = PrismaDatabase;

export default class AuthenticationService {
    public static async isPasswordValid(userIn: User, password: string): Promise<boolean> {
        try {
            const { hashedPassword } = await database.user.findUnique({
                where: { email: userIn.email },
            });
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('isValidPassword');
        }
    }
}
