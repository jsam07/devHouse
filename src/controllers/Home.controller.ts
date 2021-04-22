/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';

export default class HomeController {
    public static home = (req: Request, res: Response, next: NextFunction): void => {
        res.status(200).send('This is the home page');
    };
}
