/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import AuthenticationService from '../services/Auth.service';

export default class AuthenticationController {
    private service: AuthenticationService;

    constructor() {
        this.service = new AuthenticationService();
    }

    public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).send('Got to signup POST route');
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).send('Got to login POST route');
        } catch (error) {
            next(error);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).send('Got to logout POST route');
        } catch (error) {
            next(error);
        }
    }
}
