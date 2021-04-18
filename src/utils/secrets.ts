import dotenv from 'dotenv';
import { logger } from './logger';
import IOHandler from './IOhandler';

if (IOHandler.dirExists('.env')) {
    logger.info('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.info('Using .env.example file to supply config environment variables');
    dotenv.config({ path: '.env.example' });
}

export const PORT = process.env.PORT || 3000;
export const { SESSION_SECRET } = process.env;
export const ENVIRONMENT = process.env.NODE_ENV || 'development';