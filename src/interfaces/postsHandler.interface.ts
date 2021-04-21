import { Request, Response, NextFunction } from 'express';

export default interface PostsHandler {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}
