/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import AuthenticationService from '../services/Auth.service';

export default class AuthenticationController {
    private service: AuthenticationService;

    constructor() {
        this.service = new AuthenticationService();
    }

    public handleGetRegister(req: Request, res: Response, next: NextFunction): void {
        // TODO: Add relevant middleware
        res.render('register');
    }

    public handleGetLogin(req: Request, res: Response, next: NextFunction): void {
        // TODO: Add relevant middleware
        res.render('login');
    }

    public handleGetLogout(req: Request, res: Response, next: NextFunction): void {
        // TODO: Add relevant middleware
        res.render('login');
    }

    public async handlePostRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).send('Got to signup POST route');
        } catch (error) {
            next(error);
        }
    }

    public async handlePostLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).send('Got to login POST route');
        } catch (error) {
            next(error);
        }
    }

    public async handlePostLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).send('Got to logout POST route');
        } catch (error) {
            next(error);
        }
    }
}
