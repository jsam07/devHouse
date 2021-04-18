import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (true) {
        next();
    } else {
        res.redirect(`/auth/login`);
    }
};
