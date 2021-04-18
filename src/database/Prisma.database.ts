import { PrismaClient } from '@prisma/client';

export default class PrismaDatabase {
    static database: PrismaClient = new PrismaClient();
}
