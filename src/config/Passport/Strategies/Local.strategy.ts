import { Strategy as LocalStrategy } from 'passport-local';

import User from '../../../interfaces/user.interface';
import UserService from '../../../services/User.service';
import PassportStrategy from '../../../interfaces/passport.strategy.interface';
import { logger } from '../../../utils/logger';
import RequestWithUser from '../../../interfaces/requestWithUser.interface';

const userService = new UserService();
const localStrategy: LocalStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req: RequestWithUser, email, password, done) => {
        try {
            logger.debug('Got into local strategy try block');
            const user = await UserService.findUserByEmail(email);
            logger.debug('Got USER');

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            // const validate = await UserService.isValidPassword(user, password);
            //
            // if (!validate) {
            //     return done(null, false, { message: 'Wrong Password' });
            // }

            logger.debug('Returning USER');
            logger.debug('Attaching user to req object from local');

            req.user = {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                email: user.email,
            };
            logger.debug(`From local, checking req.user = ${JSON.stringify(req.user)}`);
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    },
);

const passportLocalStrategy: PassportStrategy = {
    name: 'local',
    strategy: localStrategy,
};

export default passportLocalStrategy;
