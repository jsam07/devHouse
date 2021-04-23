import { Request, Response, NextFunction } from 'express';

export default class HomeController {
    public static home = (req: Request, res: Response, next: NextFunction): void => {
        res.render('index');
    };

    public static demo = (req: Request, res: Response, next: NextFunction): void => {
        res.render('demo');
    };
}
