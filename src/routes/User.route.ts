import { Router } from 'express';
import passport from 'passport';
import IRoute from '../interfaces/route.interface';
import UserController from '../controllers/User.controller';

export default class UserRoute implements IRoute {
    public readonly path: string;

    public readonly router: Router;

    constructor() {
        this.path = '/user';
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            this.getPath(':userId/follow'),
            passport.authenticate('jwt', { session: false, failureRedirect: '/auth/login' }),
            UserController.handleFollowUser,
        );

        this.router.get(
            this.getPath(':userId/unfollow'),
            passport.authenticate('jwt', { session: false, failureRedirect: '/auth/login' }),
            UserController.handleUnfollowUser,
        );
    }

    private getPath(s: string): string {
        return `${this.path}/${s}`;
    }
}
