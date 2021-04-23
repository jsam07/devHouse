import HttpException from './HttpException';

export default class IncorrectCredentialsException extends HttpException {
    constructor() {
        super(401, `Wrong credentials provided.`);
    }
}
