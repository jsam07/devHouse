import { logger } from '../utils/logger';
import PrismaDatabase from '../database/Prisma.database';
import ValidationException from '../exceptions/ValidationException';

const { database } = PrismaDatabase;

export default class ValidationService {
    public static async checkUserInputs(
        userName: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ): Promise<string[]> {
        try {
            const errors = [];

            const userWithEmail = await database.user.findUnique({ where: { email } });
            const userWithUserName = await database.user.findFirst({ where: { userName } });

            if (userWithEmail) errors.push(`User with email ${email} already exists.`);
            if (userWithUserName) errors.push(`User with username ${userName} already exists.`);

            logger.debug(errors);

            return errors;
        } catch (error) {
            logger.error(error);
            throw new ValidationException('Unable to validate user inputs');
        }
    }
}
