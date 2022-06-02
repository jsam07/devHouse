import { faker } from '@faker-js/faker';
import _ from 'lodash';

import { logger } from '../utils/logger';
import PrismaDatabase from './Prisma.database';

const { database } = PrismaDatabase;

async function createUsers() {
    try {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        await database.user.create({
            data: {
                firstName,
                lastName,
                userName: faker.internet.userName(firstName, lastName),
                email: faker.internet.email(firstName, lastName),
                hashedPassword: faker.internet.password(5, true),
            },
        });
    } catch (error) {
        logger.error(error);
    }
}
const createUsersPromises: Promise<any>[] = [];
_.times(10, () => createUsersPromises.push(createUsers()));

Promise.all(createUsersPromises).finally(async () => {
    await database.$disconnect();
});
