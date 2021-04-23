import HttpException from './HttpException';

export default class ValidationException extends HttpException {
    constructor(msg: string) {
        super(401, `Validation Error: ${msg}`);
    }
}
