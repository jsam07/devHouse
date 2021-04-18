/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import UserService from '../services/User.service';
import { logger } from '../utils/logger';

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // public registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         logger.debug(JSON.stringify(req.body));
    //         const { userName, email, password } = req.body;
    //         await this.userService.addUser(userName, email, password);
    //         logger.debug(`Cookies:${JSON.stringify(cookieParser.JSONCookies(req.cookies), null, 4)}`);
    //
    //         const token = jwt.sign({ email, scope: req.body.scope }, 'JWT_SECRET');
    //
    //         res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    //         res.status(200).send({ token });
    //     } catch (error) {
    //         logger.error(error);
    //     }
    // };

    // public authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    //     passport.authenticate('local', (err, user, info) => {
    //         if (err) return next(err);
    //         if (!user) {
    //             return res.status(401).json({ status: 'error', code: 'unauthorized' });
    //         }
    //         const token = jwt.sign({ email: user.email, scope: req.body.scope }, 'JWT_SECRET');
    //         res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    //         return res.status(200).send({ token });
    //     });
    // };
}
