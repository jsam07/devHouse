import { Response, NextFunction } from 'express';
import UserService from '../services/User.service';
import RequestWithUser from '../interfaces/requestWithUser.interface';

export default class UserController {
    public static handleFollowUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
                const { email } = req.user;
                const { userId: userToFollow } = req.params;

                await UserService.followUser(parseInt(userToFollow, 10), email);

                res.redirect('back');
            }
        } catch (error) {
            next(error);
        }
    };

    public static handleUnfollowUser = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
                const { email } = req.user;
                const { userId: userToUnfollow } = req.params;

                await UserService.unFollowUser(parseInt(userToUnfollow, 10), email);
                res.redirect('back');
            }
        } catch (error) {
            next(error);
        }
    };
}
