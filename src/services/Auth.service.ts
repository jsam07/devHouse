/* eslint-disable class-methods-use-this,@typescript-eslint/no-unused-vars */
import IUser from '../interfaces/user.interface';
import Database from '../interfaces/database.interface';
import database2 from '../database/db/database_1615571003434.json';
import IAuthService from '../interfaces/auth.service.interface';

import DoneFunction from '../interfaces/done.function.interface';
import { logger } from '../utils/logger';

import PrismaDatabase from '../database/Prisma.database';

const { database } = PrismaDatabase;

export default class AuthenticationService {}
