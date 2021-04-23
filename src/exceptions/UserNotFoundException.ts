import HttpException from './HttpException';

export default class UserNotFoundException extends HttpException {
    constructor(email: string) {
        super(401, `User with email: ${email} does not exist.`);
    }
}
