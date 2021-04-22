import HttpException from './HttpException';

export default class DatabaseException extends HttpException {
    constructor(method: string) {
        super(500, `Internal Server Error: Database threw error trying to execute: ${method}`);
    }
}
