/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger';
import User from '../interfaces/user.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import UserService from '../services/User.service';

export default class AuthenticationController {
    public static handleJWTAuthentication = (req: Request, res: Response, next: NextFunction): void => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                logger.error(err);
                return res.status(401).json({
                    status: 'error',
                    code: 'unauthorized',
                });
            }
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    code: 'unauthorized',
                });
            }
            return next();
        })(req, res, next);
    };

    public static handleJWTAuthorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        passport.authenticate('jwt', { session: false }, (err, user, jwtToken) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    status: 'error',
                    code: 'unauthorized',
                });
            }
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    code: 'unauthorized',
                });
            }
            const scope = req.baseUrl.split('/').slice(-1)[0];
            const authScope = jwtToken.scope;
            if (authScope && authScope.indexOf(scope) > -1) {
                return next();
            }

            return res.status(401).json({ status: 'error', code: 'unauthorized' });
        })(req, res, next);
    };

    public static handleLocalAuthentication = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            logger.debug('Got into cb');
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    code: 'unauthorized',
                });
            }
            logger.debug('User must be defined');
            return res.status(200).send('Got to login POST route');
            // // TODO: Refactor to use user id instead; fix JWT_SECRET and save to util/secrets
            // const token = jwt.sign({ user: user.email, scope: req.body.scope }, 'JWT_SECRET', {
            //     expiresIn: 60 * 5,
            //     algorithm: 'RS256',
            // });
            // res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
            // return res.status(200).send({ token });
        })(req, res, next);
    };

    public static handleGetGitHubLogin = (req: Request, res: Response, next: NextFunction): void => {
        passport.authenticate('github', { session: false })(req, res, next);
    };

    public static handleGetGitHubCallback = (req: Request, res: Response, next: NextFunction): void => {
        logger.debug('Got into handleGetGitHubCallback');
        passport.authenticate(
            'github',
            {
                session: false,
                failureRedirect: '/auth/login',
            },
            async (err, user: User, info): Promise<void> => {
                // TODO: Refactor to use user id instead; fix JWT_SECRET and save to util/secrets
                const token = jwt.sign({ email: user.email, scope: req.body.scope }, 'JWT_SECRET', {
                    expiresIn: 60 * 5, // 5 min
                    // algorithm: 'RS256',
                });

                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 0.5 * 60 * 60 * 1000,
                });

                // TODO: Get Posts for specific user
                // res.render('posts', { posts: {adminPosts, friendsPosts} });
                res.redirect('/posts');
            },
        )(req, res, next);
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
            res.render('posts', { posts: [] });
        }
        res.render('login', { error: null });
    };

    public static handleGetLogout = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (req && req.user) {
                // res.clearCookie('token', { path: '/', domain: 'localhost' });
                // res.cookie('token', '', { maxAge: 0 });
                res.cookie('token', '', {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 0, // Now
                    domain: 'localhost',
                    path: '/',
                });
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
            /**
             * TODO:
             *      - Validate inputs
             *      - Sanitize email as redirect as needed
             *      - Create user / Check if user already exists
             *      - Check for any errors
             *      - Generate jwt and add to cookie
             */

            logger.debug(JSON.stringify(req.body));
            const { userName, email, password } = req.body;

            await UserService.addUser(userName, email, password);
            logger.debug(`Cookies:${JSON.stringify(cookieParser.JSONCookies(req.cookies), null, 4)}`);

            // TODO: Refactor to use user id instead; fix JWT_SECRET and save to util/secrets
            const token = jwt.sign({ email, scope: req.body.scope }, 'JWT_SECRET', {
                expiresIn: 60 * 5, // 5 min
                // algorithm: 'RS256',
            });

            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0.5 * 60 * 60 * 1000, // 0.5 hr
                domain: 'localhost',
                path: '/',
            });
            // const posts: unknown[] = await PostService.getAllPostsForUser(email);
            // res.render('posts', { posts });
            res.redirect('/posts');
        } catch (error) {
            logger.error(error);
        }
    };

    public static handlePostLogin = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        /**
         * TODO:
         *      - Validate inputs
         *      - Sanitize email as redirect as needed
         *      - Passport.authenticate('local')
         *      - Check for any errors
         *      - Generate jwt and add to cookie
         */

        passport.authenticate('local', { session: false }, async (err, user, info) => {
            try {
                logger.debug(`Inside handlePostLogin${JSON.stringify(req.body)}`);
                const { email, password } = req.body;

                logger.debug(`After local strategy, req.user: ${JSON.stringify(req.user)}`);

                // const isEmailValid = email.includes('4');
                // const error = {
                //     message: '🚨 Email is not a valid. Please try again',
                // };
                // if (!isEmailValid) return res.render('login', { error });

                // await this.userService.addUser(undefined, email, password);
                logger.debug(`Cookies:${JSON.stringify(cookieParser.JSONCookies(req.cookies), null, 4)}`);
                logger.debug('Got into handlePostLogin');
                if (err) return next(err);
                if (!user) {
                    return res.status(401).json({
                        status: 'error',
                        code: 'unauthorized',
                    });
                }
                logger.debug('User must be defined');
                // TODO: Create a class that generates a jwt TOKEN
                // TODO: Refactor to use user id instead; fix JWT_SECRET and save to util/secrets

                // TODO: Refactor to use user id instead; fix JWT_SECRET and save to util/secrets
                const token = jwt.sign({ email, scope: req.body.scope }, 'JWT_SECRET', {
                    expiresIn: 60 * 5, // 5 min
                    // algorithm: 'RS256',
                });

                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 0.5 * 60 * 60 * 1000, // 0.5 hr
                    domain: 'localhost',
                    path: '/',
                });
                logger.debug('Redirecting to /posts');
                // const posts: unknown[] = await PostService.getAllPostsForUser(email);
                // return res.render('posts', { posts });
                return res.redirect('/posts');
            } catch (error) {
                return logger.error(error);
            }
        })(req, res, next);
    };
}
