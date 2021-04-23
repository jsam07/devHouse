/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger';
import { JWT_SECRET } from '../utils/secrets';
import UserService from '../services/User.service';
import ValidationService from '../services/Validation.service';
import RequestWithUser from '../interfaces/requestWithUser.interface';

export default class AuthenticationController {
    public static handleGetGitHubLogin = (req: Request, res: Response, next: NextFunction): void => {
        passport.authenticate('github', { session: false })(req, res, next);
    };

    public static handleGetRegister = (req: Request, res: Response, next: NextFunction): void => {
        if (req.user) {
            logger.debug('User already registered and logged in, redirecting to home ...');
            res.redirect('/');
        }
        res.render('register', { error: null });
    };

    public static handleGetLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (req.user) {
            logger.debug('User already logged in, redirecting to home ...');
            res.redirect('/posts');
        }
        res.render('login', { error: null });
    };

    public static handleGetLogout = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (req && req.user) {
                res.clearCookie('token');
                delete req.user; // Should exist but check for it regardless
            }
            res.render('login', { error: null });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };

    public static handlePostRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userName, firstName, lastName, email, password } = req.body;
            const validateErrors = await ValidationService.checkUserInputs(
                userName,
                firstName,
                lastName,
                email,
                password,
            );

            if (validateErrors.length > 0) return res.render('register', { error: validateErrors[0] });

            await UserService.createUser(userName, firstName, lastName, email, password);
            const token = AuthenticationController.generateJwt(email);
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0.5 * 60 * 60 * 1000, // 0.5 hr
            });

            return res.redirect('/posts');
        } catch (error) {
            logger.error(error);
            return next(error);
        }
    };

    public static handlePostLogin = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        passport.authenticate(
            'local',
            { session: false },
            async (err, user, info): Promise<void> => {
                try {
                    if (err) return res.render('login', { error: err.message });

                    const { email } = req.body;
                    const token = AuthenticationController.generateJwt(email);
                    res.cookie('token', token, {
                        httpOnly: true,
                        sameSite: 'strict',
                        maxAge: 0.5 * 60 * 60 * 1000, // 0.5 hr
                    });

                    return res.redirect('/posts');
                } catch (error) {
                    logger.error(error);
                    return next(error);
                }
            },
        )(req, res, next);
    };

    private static generateJwt(email: string): string {
        return jwt.sign({ email }, JWT_SECRET, {
            expiresIn: 60 * 5, // 5 min
        });
    }
}
