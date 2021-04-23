import { Response, NextFunction } from 'express';

import UserService from '../services/User.service';
import PostService from '../services/Post.service';
import RequestWithUser from '../interfaces/requestWithUser.interface';

export default class SearchController {
    public static handleSearchForPostsAndUsers = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
                const { email: emailOfCurrentUser } = req.user;
                const keyword = req.query.query as string;

                const users = await UserService.findAllUsersLike(keyword);
                const posts = await PostService.findAllPostsLike(keyword);
                const searchResults = { users, posts, emailOfCurrentUser };

                res.render('search', { searchResults });
            }
        } catch (error) {
            next(error);
        }
    };
}
