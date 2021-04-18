import { Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger';
import HttpException from '../exceptions/HttpException';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
    try {
        logger.error(error);
        const status: number = error.status || 500;
        const message: string = error.message || 'Internal Server Error';
        const errorLog = `Status: ${status}, Message: ${message}`;
        logger.error(errorLog);
        // TODO: Respond w/ appropriate ERROR page
        res.status(status).json({ message });
    } catch (e) {
        next(e);
    }
};

export default errorMiddleware;
