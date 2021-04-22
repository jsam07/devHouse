import { Response, NextFunction } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import UserService from '../services/User.service';
import PostService from '../services/Post.service';
import { Post, User } from '../interfaces/prisma.models';
import { logger } from '../utils/logger';

export default class SearchController {
    public static searchForPostsAndUsers = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.user) {
                res.redirect('/auth/login');
            } else {
                const keyword = req.query.query as string;

                logger.debug(`Keyword(s): ${keyword}`);
                const users = await UserService.findAllUsersLike(keyword);
                const posts = await PostService.findAllPostsLike(keyword);
                const searchResults = { users, posts };
                logger.debug(JSON.stringify(searchResults, null, 4));

                res.render('search', { searchResults });
            }
        } catch (error) {
            next(error);
        }
    };
}
