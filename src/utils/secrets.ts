import dotenv from 'dotenv';
import { CookieOptions } from 'express';
import { SignOptions } from 'jsonwebtoken';
import { logger } from './logger';
import IOHandler from './IOhandler';

if (IOHandler.dirExists('.env')) {
    logger.info('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.info('Using .env.example file to supply config environment variables');
    dotenv.config({ path: '.env.example' });
}

export const SALT_ROUNDS = 10;
export const COOKIE_EXP = 0.5 * 60 * 60 * 1000; // 0.5 hr
export const JWT_EXP = 60 * 5; // 5 min
export const COOKIE_OPTS: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: COOKIE_EXP,
};
export const JWT_OPTS: SignOptions = { expiresIn: JWT_EXP };
export const { JWT_SECRET } = process.env;
export const PORT = process.env.PORT || 3000;
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
